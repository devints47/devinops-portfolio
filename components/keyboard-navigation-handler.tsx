"use client"

import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"

export function KeyboardNavigationHandler() {
  useKeyboardNavigation()
  return null // This component doesn't render anything, just handles keyboard events
}
