import type React from "react"
import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
}

export function TerminalWindow({ title = "terminal", className, children, fullWidth = false }: TerminalWindowProps) {
  return (
    <div 
      className={cn("terminal-window", fullWidth ? "w-full" : "max-w-3xl", className)}
      role="region" 
      aria-label={`Terminal window: ${title}`}
    >
      <div 
        className="terminal-header"
        role="heading"
        aria-level={3}
      >
        <div className="flex space-x-2" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        {title && <div className="ml-4 text-sm text-gray-400">{title}</div>}
      </div>
      <div 
        className="terminal-body overflow-visible"
        role="presentation"
      >
        {children}
      </div>
    </div>
  )
}
