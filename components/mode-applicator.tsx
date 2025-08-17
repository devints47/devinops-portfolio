"use client"

import { useEffect, type ReactNode } from "react"
import { useViewMode } from "./view-mode-toggle"

interface ModeApplicatorProps {
  children: ReactNode;
}

export function ModeApplicator({ children }: ModeApplicatorProps) {
  const { mode } = useViewMode()

  useEffect(() => {
    const body = document.body
    if (mode === "professional") {
      body.classList.add("professional-theme")
      body.classList.remove("terminal-theme") // Explicitly remove if you had one
      body.setAttribute("data-theme", "professional")
    } else {
      body.classList.remove("professional-theme")
      body.classList.add("terminal-theme") // Explicitly add if you want one
      body.setAttribute("data-theme", "terminal")
    }

    // Update the page title to reflect the current view mode
    const baseTitle = "DevinOps - Devin Singh | Full-Stack Engineer & DevOps Specialist";
    document.title = mode === "professional" ? 
      `${baseTitle} - Professional View` : 
      `${baseTitle} - Terminal View`;
      
    // Announce view mode change for screen readers
    const modeAnnouncement = document.createElement('div');
    modeAnnouncement.setAttribute('aria-live', 'polite');
    modeAnnouncement.setAttribute('role', 'status');
    modeAnnouncement.classList.add('sr-only');
    modeAnnouncement.textContent = `Switched to ${mode} view mode`;
    document.body.appendChild(modeAnnouncement);
    
    // Remove the announcement element after it's been read
    setTimeout(() => {
      document.body.removeChild(modeAnnouncement);
    }, 1000);
    
  }, [mode])

  return <>{children}</>
}
