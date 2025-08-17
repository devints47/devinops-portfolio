"use client"

import { useEffect, useCallback } from "react"
import { useViewMode } from "@/components/view-mode-toggle"

// Terminal section IDs
const terminalSectionIds = ["hero",
  "about",
  "skills",
  "projects",
  "resume",
  "github",
  "contact",
]
// Professional section IDs - ensure these match the actual IDs on your professional section components
const professionalSectionIds = [
  "hero-professional",
  "about-professional",
  "skills-professional",
  "projects-professional",
  "resume-professional",
  "github-professional",
  "contact-professional",
]

export function useKeyboardNavigation() {
  const { mode, setMode } = useViewMode()

  const getCurrentSectionIds = useCallback(() => {
    return mode === "professional" ? professionalSectionIds : terminalSectionIds
  }, [mode])

  const getCurrentSection = useCallback(() => {
    const currentIds = getCurrentSectionIds()
    // Check from top to bottom which section is currently in view or closest to top
    // Add a bit of offset to ensure the section is sufficiently in view
    const scrollY = window.scrollY + (document.querySelector("header")?.offsetHeight || 0) + 50

    for (let i = 0; i < currentIds.length; i++) {
      const element = document.getElementById(currentIds[i])
      if (element) {
        const elementTop = element.offsetTop
        const elementBottom = elementTop + element.offsetHeight
        // If the scroll position is within this section, or if it's the last section and we're past its top
        if (
          (scrollY >= elementTop && scrollY < elementBottom) ||
          (i === currentIds.length - 1 && scrollY >= elementTop)
        ) {
          return i
        }
      }
    }
    // If scrolled way past everything, or at the very top before hero is fully visible.
    // If scrollY is very low, it's likely the hero.
    if (window.scrollY < window.innerHeight / 2) return 0
    // If scrolled past all known sections, consider it the last section.
    if (
      currentIds.length > 0 &&
      window.scrollY >
        (document.getElementById(currentIds[currentIds.length - 1])?.offsetTop || Number.POSITIVE_INFINITY)
    ) {
      return currentIds.length - 1
    }

    return 0 // Default to the first section if no specific section is identified
  }, [getCurrentSectionIds])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const header = document.querySelector("header")
      const headerHeight = header ? header.offsetHeight : 0
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight - 20 // 20px buffer below header

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent navigation if user is typing in an input/textarea/select
      const targetElement = event.target as HTMLElement
      if (
        targetElement.tagName === "INPUT" ||
        targetElement.tagName === "TEXTAREA" ||
        targetElement.tagName === "SELECT" ||
        targetElement.isContentEditable
      ) {
        return
      }

      const currentIds = getCurrentSectionIds()
      if (currentIds.length === 0) return // No sections to navigate

      const currentSectionIndex = getCurrentSection()

      switch (event.key) {
        case "Enter":
          if (currentSectionIndex === 0 && currentIds.length > 1 && currentIds[1]) {
            event.preventDefault()
            scrollToSection(currentIds[1])
          }
          break

        case "ArrowDown":
          event.preventDefault()
          if (currentSectionIndex < currentIds.length - 1) {
            scrollToSection(currentIds[currentSectionIndex + 1])
          }
          break

        case "ArrowUp":
          event.preventDefault()
          if (currentSectionIndex > 0) {
            scrollToSection(currentIds[currentSectionIndex - 1])
          }
          break

        case "ArrowLeft":
          event.preventDefault()
          setMode("terminal")
          break

        case "ArrowRight":
          event.preventDefault()
          setMode("professional")
          break

        default:
          break
      }
    },
    [getCurrentSectionIds, getCurrentSection, scrollToSection, setMode],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}
