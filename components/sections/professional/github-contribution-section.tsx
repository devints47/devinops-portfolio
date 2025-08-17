"use client"

import { Github, Flame } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import GitHubCalendar from "react-github-calendar"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useGitHubStats } from "@/hooks/use-github-stats"

// GitHub API types
interface GitHubUser {
  created_at: string
  public_repos: number
}

export function GitHubContributionSection() {
  const [githubData, setGithubData] = useState<GitHubUser | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { stats, loading, error } = useGitHubStats('devints47')

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch basic user info
        const userResponse = await fetch('https://api.github.com/users/devints47')
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        
        const userData: GitHubUser = await userResponse.json()
        setGithubData(userData)
      } catch (err) {
        console.error('GitHub API Error:', err)
      }
    }

    fetchGitHubData()
    
    // Force refresh of calendar component
    setRefreshKey(Date.now())
  }, [])

  const formatDateRange = () => {
    if (!githubData) return "Oct 24, 2014 - Present"
    
    const createdDate = new Date(githubData.created_at)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }
    const formatted = createdDate.toLocaleDateString('en-US', options)
    return `${formatted} - Present`
  }



  // Loading state
  if (loading) {
    return (
      <section id="github-professional" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-professional-slate-900 via-white/15 to-professional-slate-900">
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-professional-slate-200">
              Development Activity
            </h2>
            <p className="text-professional-slate-400 text-lg max-w-2xl mx-auto">
              Loading GitHub statistics...
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error || !stats) {
    return (
      <section id="github-professional" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-professional-slate-900 via-white/15 to-professional-slate-900">
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-professional-slate-200">
              Development Activity
            </h2>
            <p className="text-professional-slate-400 text-lg max-w-2xl mx-auto">
              {error ? `Error loading GitHub data: ${error}` : 'Unable to load GitHub statistics'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github-professional" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-professional-slate-900 via-white/15 to-professional-slate-900">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-professional-slate-200">
            Development Activity
          </h2>
          <p className="text-professional-slate-400 text-lg max-w-2xl mx-auto">
            A visual representation of my coding consistency and contribution patterns throughout the year.
          </p>
        </div>

        <div className="border border-professional-slate-600/50 rounded-xl bg-professional-slate-800/60 backdrop-blur-sm shadow-2xl shadow-professional-purple-500/20 relative overflow-hidden p-6">
          {/* Card Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-professional-slate-700/30 via-professional-slate-800/50 to-professional-slate-900/70"></div>
          
          <div className="pb-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-professional-indigo-400" />
                <a 
                  href="https://github.com/devints47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-professional-indigo-300 transition-colors duration-300"
                >
                  <h3 className="text-professional-slate-200 hover:text-professional-indigo-300 transition-colors duration-300">GitHub Activity</h3>
                </a>
              </div>
              <div className="flex items-center gap-4">
                {/* Dynamic contributions count */}
                <div className="text-emerald-400 text-lg font-medium">
                  {loading ? 'Loading...' : 
                   error || !stats ? 'Unable to load' :
                   `${stats.currentYearContributions} contributions in 2025`}
                </div>

              </div>
            </div>
          </div>
          
          <div className="space-y-8 relative">
            {/* GitHub Contribution Calendar */}
            <div className="flex justify-center items-center p-6 bg-professional-slate-800/40 rounded-lg border border-professional-slate-700/50">
              <div className="w-full max-w-4xl flex justify-center">
                <GitHubCalendar 
                  username="devints47"
                  year="last"
                  key={`github-calendar-professional-${Math.floor(Date.now() / (1000 * 60 * 60 * 24))}-${refreshKey}`}
                  blockSize={11}
                  blockMargin={2}
                  fontSize={14}
                  theme={{
                    dark: ['#1e293b', '#0f766e', '#059669', '#10b981', '#34d399']
                  }}
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      'data-tooltip-id': 'github-professional-tooltip',
                      'data-tooltip-html': `${activity.count} contributions on ${activity.date}`,
                    })
                  }
                  transformData={(data) => {
                    console.log('GitHub Calendar data loaded at:', new Date().toISOString());
                    return data;
                  }}
                />
              </div>
            </div>

            {/* Dynamic Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-professional-slate-600/50">
              {/* Total Contributions */}
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-professional-slate-700/70 via-professional-slate-800/60 to-professional-purple-900/40 border border-professional-slate-600/50 hover:border-professional-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-professional-purple-400/20 hover:-translate-y-1 flex flex-col justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-professional-slate-100 mb-4 group-hover:text-professional-purple-300 transition-colors duration-300">
                  {stats?.totalContributions?.toLocaleString() || '0'}
                </div>
                <div className="text-professional-slate-300 text-lg font-medium mb-2 group-hover:text-professional-purple-200 transition-colors duration-300">
                  Total Contributions
                </div>
                <div className="text-sm text-professional-slate-400 group-hover:text-professional-slate-300 transition-colors duration-300">
                  {formatDateRange()}
                </div>
              </div>
              
              {/* Current Streak with Dynamic Data */}
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-professional-slate-700/70 via-professional-slate-800/60 to-professional-purple-900/40 border border-professional-slate-600/50 hover:border-professional-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-professional-purple-400/20 hover:-translate-y-1 flex flex-col justify-center min-h-[200px]">
                {/* Hollow Green Circle with Gap for Flame */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {/* Hollow Green Circle using SVG with gap at 12 o'clock */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke={stats?.isStreakActive ? "#10b981" : "#6b7280"}
                      strokeWidth="6"
                      strokeDasharray="230 35"
                      strokeDashoffset="50"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  
                  {/* Green Flame positioned in the gap at 12 o'clock */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <Flame 
                      className="h-7 w-7 transition-colors duration-500" 
                      style={{color: stats?.isStreakActive ? '#10b981' : '#6b7280'}} 
                    />
                  </div>
                  
                  {/* Dynamic number centered in the hollow circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-professional-slate-100">
                      {stats?.currentStreak || 0}
                    </span>
                  </div>
                </div>
                <div className="text-professional-slate-300 text-lg font-medium mb-2 group-hover:text-professional-purple-200 transition-colors duration-300">
                  Current Streak
                </div>
                <div className="text-sm text-professional-slate-400 group-hover:text-professional-slate-300 transition-colors duration-300">
                  {stats?.currentStreak ? `${stats.currentStreakStart} - ${stats.currentStreakEnd}` : 'No active streak'}
                </div>
              </div>
              
              {/* Longest Streak */}
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-professional-slate-700/70 via-professional-slate-800/60 to-professional-purple-900/40 border border-professional-slate-600/50 hover:border-professional-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-professional-purple-400/20 hover:-translate-y-1 flex flex-col justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-professional-slate-100 mb-4 group-hover:text-professional-purple-300 transition-colors duration-300">
                  {stats?.longestStreak || 0}
                </div>
                <div className="text-professional-slate-300 text-lg font-medium mb-2 group-hover:text-professional-purple-200 transition-colors duration-300">
                  Longest Streak
                </div>
                <div className="text-sm text-professional-slate-400 group-hover:text-professional-slate-300 transition-colors duration-300">
                  {stats?.longestStreak ? `${stats.longestStreakStart} - ${stats.longestStreakEnd}` : 'No data'}
                </div>
              </div>
            </div>

            {/* Enhanced GitHub Profile Link */}
            <div className="flex justify-center pt-6">
              <a
                href="https://github.com/devints47"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-professional-indigo-600 via-professional-purple-600 to-professional-fuchsia-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-professional-purple-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Github className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">View Full GitHub Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-300"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip id="github-professional-tooltip" />
    </section>
  )
} 