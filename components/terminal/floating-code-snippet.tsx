"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useViewMode } from "../view-mode-toggle"

interface FloatingCodeSnippetProps {
  code: string
  className?: string
  style?: React.CSSProperties // Keep existing style prop for other custom styles
  top?: string
  bottom?: string
  left?: string
  right?: string
  animationDelay?: string
}

export function FloatingCodeSnippet({
  code,
  className,
  style, // User-provided custom styles
  top,
  bottom,
  left,
  right,
  animationDelay = "0s",
}: FloatingCodeSnippetProps) {
  const { mode } = useViewMode()

  if (mode !== "terminal") {
    return null
  }

  // Prepare inline styles for positioning
  const positioningStyles: React.CSSProperties = {}
  if (top) positioningStyles.top = top
  if (bottom) positioningStyles.bottom = bottom
  if (left) positioningStyles.left = left
  if (right) positioningStyles.right = right

  return (
    <div
      className={cn(
        "absolute opacity-20 hidden lg:block animate-float text-terminal-accent text-xs pointer-events-none z-0",
        className, // Keep other utility classes
      )}
      style={{
        animationDelay,
        ...positioningStyles, // Apply dynamic positioning
        ...style, // Merge with other user-provided styles
      }}
      aria-hidden="true"
    >
      <pre>{code}</pre>
    </div>
  )
}
