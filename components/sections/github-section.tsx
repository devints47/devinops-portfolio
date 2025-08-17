"use client"

import { Github } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import GitHubCalendar from "react-github-calendar"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"
import { useGitHubStats } from "@/hooks/use-github-stats"

// GitHub API types
interface GitHubUser {
  created_at: string
  public_repos: number
  followers: number
  following: number
}

export function GitHubSection() {
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



  return (
    <section 
      id="github" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/WebPage"
      aria-label="GitHub Activity and Contributions by Devin Singh"
    >
      <meta itemProp="name" content="Devin Singh's GitHub Activity" />
      <meta itemProp="description" content="GitHub contribution history and coding activity for Devin Singh (devints47)" />
      
      <FloatingCodeSnippet
        code={`# github-stats.sh
#!/bin/bash
gh api user/devints47 --jq '.public_repos'
echo "Public repositories: $(gh repo list --public --limit 100 | wc -l)"
gh api users/devints47/events --jq 'length'`}
        top="5%"
        right="3%"
        animationDelay="1s"
      />
      <FloatingCodeSnippet
        code={`// git-workflow.js
const workflow = {
  daily: ["git add .", "git commit -m 'feat: progress'", "git push origin main"],
  streak: "${stats?.currentStreak || 0} day streak ${stats?.isStreakActive ? 'active' : 'paused'}",
  status: "${stats?.isStreakActive ? 'actively coding' : 'streak paused'}"
};`}
        bottom="5%"
        left="3%"
        animationDelay="3s"
      />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">gh api user/devints47 | jq '.contributions'</span>
          <span className="sr-only">Devin Singh's GitHub Activity</span>
        </h2>

        {/* GitHub Contribution Dashboard */}
        <TerminalWindow title="github-dashboard.terminal" fullWidth>
          <div className="mb-2">
            <TerminalPrompt>gh dashboard --user devints47 --year 2025 --include-stats</TerminalPrompt>
            <div className="terminal-output pl-2">
              <p className="text-terminal-accent mb-4">
                {loading ? '[INFO] Loading GitHub dashboard and contribution data...' : 
                 error || !stats ? '[ERROR] Failed to load GitHub data' : 
                 '[INFO] GitHub dashboard loaded successfully'}
              </p>
              
              {/* Integrated Stats Header */}
              <div className="mb-6 p-4 bg-terminal-background/30 rounded-lg border border-terminal-accent/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-terminal-accent" />
                    <span className="text-terminal-accent font-mono">devints47</span>
                    <span className="text-terminal-muted">•</span>
                    <span className="text-terminal-muted text-sm">{formatDateRange()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/devints47"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline flex items-center gap-1 text-sm border border-terminal-accent/30 rounded px-2 py-1 hover:bg-terminal-accent/10 transition-colors"
                      aria-label="View GitHub profile for devints47"
                    >
                      <Github className="h-3 w-3" />
                      <span>Profile</span>
                    </a>

                  </div>
                </div>

                {/* Dynamic Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-terminal-accent font-mono">
                      {loading ? '...' : (stats?.currentYearContributions || 0)}
                    </div>
                    <div className="text-xs text-terminal-muted">2025 Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-terminal-accent font-mono">
                      {loading ? '...' : (stats?.currentStreak || 0)}
                    </div>
                    <div className="text-xs text-terminal-muted">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-terminal-accent font-mono">
                      {loading ? '...' : (stats?.longestStreak || 0)}
                    </div>
                    <div className="text-xs text-terminal-muted">Longest Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-terminal-accent font-mono">
                      {loading ? '...' : (stats?.totalContributions?.toLocaleString() || 0)}
                    </div>
                    <div className="text-xs text-terminal-muted">Total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-terminal-accent">
                    [STATUS] {loading ? 'Loading...' : 
                             error || !stats ? 'Error loading data' :
                             (stats.isStreakActive ? 'Daily commit streak active ✓' : 'Streak paused ⏸️')}
                  </span>
                  <span className="text-terminal-muted">
                    Last commit: {loading ? '...' : (stats?.lastCommitDate || 'Unknown')}
                  </span>
                </div>
              </div>

              <p className="text-terminal-accent mb-4">[INFO] Rendering contribution heatmap...</p>
              
              <div className="flex justify-center p-4 bg-terminal-background/30 rounded-lg border border-terminal-accent/30 mb-4">
                <div className="w-full max-w-4xl flex justify-center">
                  <GitHubCalendar 
                    username="devints47" 
                    year="last"
                    key={`github-calendar-terminal-${Math.floor(Date.now() / (1000 * 60 * 60 * 24))}-${refreshKey}`}
                    blockSize={11}
                    blockMargin={2}
                    fontSize={14}
                    theme={{
                      dark: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353']
                    }}
                    renderBlock={(block, activity) =>
                      React.cloneElement(block, {
                        'data-tooltip-id': 'github-tooltip',
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
              
              <div className="text-center">
                <p className="text-terminal-muted text-sm">
                  {loading ? 'Loading statistics...' : 
                   error || !stats ? 'Unable to load statistics' :
                   'Consistency Score: 89% | Peak Activity: Weekdays | Average: 3.6 commits/day'}
                </p>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
      <ReactTooltip id="github-tooltip" />
    </section>
  )
} 