import { useState, useEffect } from 'react'

export interface GitHubStats {
  currentStreak: number
  currentStreakStart: string
  currentStreakEnd: string
  longestStreak: number
  longestStreakStart: string
  longestStreakEnd: string
  totalContributions: number
  currentYearContributions: number
  lastCommitDate: string
  isStreakActive: boolean
}

interface ContributionDay {
  date: string
  count: number
}

export function useGitHubStats(username: string = 'devints47') {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refreshStats = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)
        setError(null)

        // Generate cache-busting timestamp (use refreshTrigger to force new requests)
        const cacheBuster = Date.now() + refreshTrigger

        // Fetch contribution data for the last year (for streaks and GitHub chart)
        const contributionsResponse = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last&cb=${cacheBuster}`,
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        if (!contributionsResponse.ok) throw new Error('Failed to fetch contribution data')
        
        const contributionsData = await contributionsResponse.json()
        const contributions: ContributionDay[] = contributionsData.contributions

        // Fetch current year contributions using specific year API
        const currentYear = new Date().getFullYear()
        const currentYearContributions = await fetchYearContributions(username, currentYear, cacheBuster)

        // Get total contributions by fetching all years since account creation
        const totalContributions = await fetchTotalContributions(username, cacheBuster, currentYearContributions)

        // Calculate statistics
        const calculatedStats = calculateStats(contributions, totalContributions, currentYearContributions)
        setStats(calculatedStats)
      } catch (err) {
        console.error('GitHub Stats Error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username, refreshTrigger])

  return { stats, loading, error, refreshStats }
}

async function fetchYearContributions(username: string, year: number, cacheBuster: number): Promise<number> {
  try {
    const yearResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}&cb=${cacheBuster}`,
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
    if (yearResponse.ok) {
      const yearData = await yearResponse.json()
      if (yearData.contributions && Array.isArray(yearData.contributions)) {
        return yearData.contributions.reduce(
          (sum: number, day: ContributionDay) => sum + day.count, 
          0
        )
      }
    }
  } catch (yearError) {
    console.warn(`Failed to fetch data for year ${year}:`, yearError)
  }
  return 0
}

async function fetchTotalContributions(username: string, cacheBuster: number, currentYearContributions: number): Promise<number> {
  const startYear = 2014 // Account creation year
  const currentYear = new Date().getFullYear()
  let totalContributions = 0
  
  // Fetch data for each year from account creation to current year - 1
  for (let year = startYear; year < currentYear; year++) {
    try {
      const yearResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}&cb=${cacheBuster}`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      )
      if (yearResponse.ok) {
        const yearData = await yearResponse.json()
        if (yearData.contributions && Array.isArray(yearData.contributions)) {
          const yearContributions = yearData.contributions.reduce(
            (sum: number, day: ContributionDay) => sum + day.count, 
            0
          )
          totalContributions += yearContributions
        }
      }
    } catch (yearError) {
      console.warn(`Failed to fetch data for year ${year}:`, yearError)
    }
  }
  
  // Add current year contributions (already fetched separately)
  totalContributions += currentYearContributions
  
  return totalContributions
}

function calculateStats(contributions: ContributionDay[], totalContributions: number, currentYearContributions: number): GitHubStats {
  const today = new Date()
  
  // Sort contributions by date (newest first)
  const sortedContributions = contributions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Calculate streaks
  const { currentStreak, longestStreak } = calculateStreaks(sortedContributions)
  
  // Find last commit date
  const lastCommitDay = sortedContributions.find(day => day.count > 0)
  const lastCommitDate = lastCommitDay 
    ? formatTimeAgo(new Date(lastCommitDay.date))
    : 'No recent commits'

  // Check if streak is active (contributed today or yesterday)
  const isStreakActive = currentStreak.days > 0 && 
    (isToday(currentStreak.endDate) || isYesterday(currentStreak.endDate))

  return {
    currentStreak: currentStreak.days,
    currentStreakStart: formatDate(currentStreak.startDate),
    currentStreakEnd: formatDate(currentStreak.endDate),
    longestStreak: longestStreak.days,
    longestStreakStart: formatDate(longestStreak.startDate),
    longestStreakEnd: formatDate(longestStreak.endDate),
    totalContributions,
    currentYearContributions,
    lastCommitDate,
    isStreakActive
  }
}

function calculateStreaks(contributions: ContributionDay[]) {
  let currentStreak = { days: 0, startDate: new Date(), endDate: new Date() }
  let longestStreak = { days: 0, startDate: new Date(), endDate: new Date() }
  let tempStreak = { days: 0, startDate: new Date(), endDate: new Date() }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Start from today and work backwards
  let currentDate = new Date(today)
  let streakActive = false
  let streakStarted = false

  for (let i = 0; i < 365; i++) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayData = contributions.find(day => day.date === dateStr)
    const hasContributions = dayData && dayData.count > 0

    if (hasContributions) {
      if (!streakStarted) {
        // Start new streak
        tempStreak = {
          days: 1,
          startDate: new Date(currentDate),
          endDate: new Date(currentDate)
        }
        streakStarted = true
        
        // If this is today or yesterday, it's our current streak
        if (i <= 1) {
          streakActive = true
        }
      } else {
        // Continue existing streak
        tempStreak.days++
        tempStreak.startDate = new Date(currentDate)
      }
    } else {
      if (streakStarted) {
        // End of streak
        if (streakActive && currentStreak.days === 0) {
          currentStreak = { ...tempStreak }
        }
        
        if (tempStreak.days > longestStreak.days) {
          longestStreak = { ...tempStreak }
        }
        
        streakStarted = false
        streakActive = false
        tempStreak = { days: 0, startDate: new Date(), endDate: new Date() }
      }
    }

    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1)
  }

  // Handle case where streak continues to the beginning of our data
  if (streakStarted) {
    if (streakActive && currentStreak.days === 0) {
      currentStreak = { ...tempStreak }
    }
    
    if (tempStreak.days > longestStreak.days) {
      longestStreak = { ...tempStreak }
    }
  }

  return { currentStreak, longestStreak }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) {
    return 'Less than an hour ago'
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }
}

function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
} 