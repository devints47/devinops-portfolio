"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface IsolatedTypingEffectProps {
  text: string
  className?: string
  typingSpeed?: number
  showCursor?: boolean
  onComplete?: () => void
  startDelay?: number
  shouldStart: boolean
  debugName?: string
  hideCursorOnComplete?: boolean
}

export function IsolatedTypingEffect({
  text,
  className,
  typingSpeed = 50,
  showCursor = false,
  onComplete,
  startDelay = 0,
  shouldStart,
  debugName = "unknown",
  hideCursorOnComplete = false,
}: IsolatedTypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const hasStartedRef = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Stable callback to avoid dependency issues
  const handleComplete = useCallback(() => {
    setIsTyping(false)
    setIsComplete(true)
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    // Only start if shouldStart is true and we haven't started yet
    if (!shouldStart || hasStartedRef.current) {
      return
    }

    const startTyping = () => {
      hasStartedRef.current = true
      setIsTyping(true)
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          const newText = text.substring(0, currentIndex + 1)
          setDisplayedText(newText)
          currentIndex++
        } else {
          clearInterval(typingInterval)
          handleComplete()
        }
      }, typingSpeed)

      intervalRef.current = typingInterval
    }

    if (startDelay > 0) {
      timeoutRef.current = setTimeout(startTyping, startDelay)
    } else {
      startTyping()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [shouldStart, text, typingSpeed, startDelay, handleComplete])

  // Determine if cursor should be shown
  const shouldShowCursor = () => {
    if (!showCursor) return false
    if (isTyping) return true
    if (isComplete && hideCursorOnComplete) return false
    return showCursor
  }

  return (
    <span 
      className={cn("inline-flex items-baseline", className)}
      role="text"
      aria-label={text}
      aria-live={isTyping ? "polite" : "off"}
      aria-atomic="true"
      data-typing-status={isComplete ? "complete" : isTyping ? "typing" : "waiting"}
    >
      <span>{displayedText}</span>
      {shouldShowCursor() && <span className="cursor" aria-hidden="true" style={{ display: 'inline-flex' }}></span>}
    </span>
  )
}
