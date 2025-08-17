import type React from "react"
import { cn } from "@/lib/utils"

interface TerminalPromptProps {
  user?: string
  host?: string
  path?: string
  className?: string
  children?: React.ReactNode
  showPromptSymbol?: boolean
  size?: "default" | "sm"
}

export function TerminalPrompt({
  user = "devin",
  host = "devinops",
  path = "~",
  className,
  children,
  showPromptSymbol = true,
  size = "default",
}: TerminalPromptProps) {
  const textSizeClass = size === "sm" ? "text-sm" : "text-base"

  return (
    <p 
      className={cn("font-mono", textSizeClass, className)}
      role="text"
      aria-label={showPromptSymbol ? `Terminal prompt: ${user}@${host}:${path}$ ${children}` : `${children}`}
    >
      {showPromptSymbol && (
        <span className="terminal-prompt-prefix" aria-hidden="true">
          <span className="text-green-500">
            {user}@{host}
          </span>
          <span className="text-terminal-foreground mx-1">:</span>
          <span className="text-terminal-accent">{path}</span>
          <span className="text-terminal-foreground mx-1">$</span>{" "}
        </span>
      )}
      <span className="terminal-prompt-command">
        {children}
      </span>
    </p>
  )
}
