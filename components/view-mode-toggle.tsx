"use client"

import * as React from "react"
import { Terminal, Layout } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

type ViewMode = "terminal" | "professional"

interface ViewModeContextType {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
}

const ViewModeContext = React.createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Determine initial mode based on URL
  const getInitialMode = (): ViewMode => {
    if (pathname === "/pro") {
      return "professional"
    }
    return "terminal"
  }
  
  const [mode, setModeState] = React.useState<ViewMode>(getInitialMode())

  // Update mode when pathname changes
  React.useEffect(() => {
    const newMode = getInitialMode()
    if (newMode !== mode) {
      setModeState(newMode)
    }
  }, [pathname, mode])

  const setMode = React.useCallback((newMode: ViewMode) => {
    setModeState(newMode)
    
    // Navigate to appropriate route based on mode
    if (newMode === "professional" && pathname !== "/pro") {
      router.push("/pro")
    } else if (newMode === "terminal" && pathname !== "/") {
      router.push("/")
    }
  }, [router, pathname])

  return <ViewModeContext.Provider value={{ mode, setMode }}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  const context = React.useContext(ViewModeContext)
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider")
  }
  return context
}

export function ViewModeToggle() {
  const { mode, setMode } = useViewMode()

  const toggleMode = () => {
    setMode(mode === "terminal" ? "professional" : "terminal")
  }

  return (
    <button
      role="switch"
      aria-checked={mode === "terminal"}
      onClick={toggleMode}
      className={cn(
        "relative inline-flex items-center h-8 w-[180px] rounded-sm cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none",
        "border border-terminal-accent/50 bg-terminal-background font-mono text-xs select-none",
      )}
      title={`Switch to ${mode === "terminal" ? "Professional" : "Terminal"} View (← Terminal, → Professional)`}
    >
      <span className="sr-only">Switch View Mode</span>

      {/* Sliding Knob */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-[2px] inline-block h-[calc(100%-4px)] w-[calc(50%-4px)] transform rounded-[1px] bg-terminal-accent/70 shadow-lg ring-1 ring-terminal-accent/50 transition-transform duration-200 ease-in-out top-[2px]",
          mode === "terminal" ? "translate-x-0" : "translate-x-[calc(100%+4px)]",
        )}
      />

      {/* Text Layer */}
      <div className="relative z-10 w-full flex items-center justify-around px-1">
        <span
          className={cn(
            "flex items-center gap-1 transition-colors duration-200",
            mode === "terminal" ? "text-terminal-foreground" : "text-terminal-muted",
          )}
        >
          <Terminal size={14} /> TML
        </span>
        <span
          className={cn(
            "flex items-center gap-1 transition-colors duration-200",
            mode === "professional" ? "text-terminal-foreground" : "text-terminal-muted",
          )}
        >
          <Layout size={14} /> PRO
        </span>
      </div>
    </button>
  )
}
