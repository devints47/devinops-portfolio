"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypingEffectProps {
  text: string
  className?: string
  typingSpeed?: number
  showCursor?: boolean
  onComplete?: () => void
  startDelay?: number
}

export function TypingEffect({
  text,
  className,
  typingSpeed = 50,
  showCursor = true,
  onComplete,
  startDelay = 0,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [startTyping, setStartTyping] = useState(startDelay === 0)

  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => {
        setStartTyping(true)
      }, startDelay)
      return () => clearTimeout(timer)
    }
  }, [startDelay])

  useEffect(() => {
    if (!startTyping) return

    setIsTyping(true)
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        if (onComplete) onComplete()
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [text, typingSpeed, onComplete, startTyping])

  return (
    <div className={cn("inline-flex", className)}>
      <span>{displayedText}</span>
      {(isTyping || showCursor) && <span className="cursor"></span>}
    </div>
  )
}
