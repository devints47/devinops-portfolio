"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ViewModeToggle, useViewMode } from "./view-mode-toggle"
import { cn } from "@/lib/utils"
import { Terminal, Menu, X, Briefcase, UserCircle, MessageSquare, FileText, Settings, Github } from "lucide-react" // Added Github icon
import { Button } from "./ui/button"

const navItems = [
  {
    name: "About",
    href: "#about",
    terminalHref: "#about",
    professionalHref: "#about-professional",
    icon: <UserCircle />,
    label: "About Devin Singh",
  },
  {
    name: "Skills",
    href: "#skills",
    terminalHref: "#skills",
    professionalHref: "#skills-professional",
    icon: <Settings />,
    label: "Devin Singh's Skills",
  },
  {
    name: "Projects",
    href: "#projects",
    terminalHref: "#projects",
    professionalHref: "#projects-professional",
    icon: <Briefcase />,
    label: "Software Engineering Projects",
  },
  {
    name: "Resume",
    href: "#resume",
    terminalHref: "#resume",
    professionalHref: "#resume-professional",
    icon: <FileText />,
    label: "Devin Singh's Resume",
  },
  {
    name: "GitHub",
    href: "#github",
    terminalHref: "#github",
    professionalHref: "#github-professional",
    icon: <Github />,
    label: "GitHub Activity & Contributions",
  },
  {
    name: "Contact",
    href: "#contact",
    terminalHref: "#contact",
    professionalHref: "#contact-professional",
    icon: <MessageSquare />,
    label: "Contact Devin Singh",
  },
]

export function Header() {
  const { mode } = useViewMode()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle click outside to close the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen &&
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Added h-[68px] to enforce consistent height
  const headerBaseClass =
    "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 h-[68px] flex flex-col justify-center"
  const terminalHeaderClass =
    "bg-terminal-background/80 backdrop-blur-md shadow-[0_4px_12px_rgba(139,92,246,0.3)] border-b-0"
  const professionalHeaderClass =
    "bg-professional-slate-800/80 backdrop-blur-md shadow-lg border-b border-professional-slate-700"
  const topAccentLineTerminal = "absolute top-0 left-0 right-0 h-px bg-[#8B5CF6]"
  const topAccentLineProfessional =
    "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500"

  return (
    <header className={cn(headerBaseClass, mode === "terminal" ? terminalHeaderClass : professionalHeaderClass)} role="banner">
      <div className={mode === "terminal" ? topAccentLineTerminal : topAccentLineProfessional}></div>

      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center group" aria-label="DevinOps - Devin Singh's Software Engineering Portfolio">
          <Image
            src="/DevinOps-logo.png"
            alt="DevinOps Logo"
            width={120}
            height={40}
            className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-3" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={mode === "terminal" ? item.terminalHref : item.professionalHref}
              className={cn(
                "px-3 py-2 rounded-md text-sm transition-all duration-300 flex items-center gap-2",
                mode === "terminal"
                  ? "font-mono text-terminal-foreground hover:text-terminal-accent hover:bg-terminal-accent/10"
                  : "font-sans text-professional-slate-300 hover:text-professional-slate-100 hover:bg-professional-slate-700",
              )}
              aria-label={item.label}
            >
              {mode === "professional" && React.cloneElement(item.icon, { className: "h-4 w-4", "aria-hidden": "true" })}
              {mode === "terminal" ? `~/${item.name.toLowerCase()}` : item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className={cn("hidden sm:block")}>
            {" "}
            {/* Hide toggle on mobile for both terminal and professional mode */}
            <ViewModeToggle />
          </div>
          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              mode === "professional"
                ? "text-professional-slate-300 hover:bg-professional-slate-700"
                : "text-terminal-foreground hover:bg-terminal-accent/10",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn(
            "md:hidden absolute top-full right-0 w-[60%] shadow-xl", // Right-aligned menu
            mode === "terminal"
              ? "bg-terminal-background/95 backdrop-blur-md border border-[#8B5CF6] shadow-[0_8px_24px_rgba(139,92,246,0.4),_0_4px_12px_rgba(139,92,246,0.3)]"
              : "bg-professional-slate-800/95 backdrop-blur-md border border-professional-slate-700",
          )}
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <div className="py-4">
            <nav className="flex flex-col gap-2 px-4" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={mode === "terminal" ? item.terminalHref : item.professionalHref}
                  className={cn(
                    "px-3 py-3 rounded-md transition-all duration-300 flex items-center gap-3 justify-end", // Right-aligned content
                    mode === "terminal"
                      ? "font-mono text-terminal-foreground hover:text-terminal-accent hover:bg-terminal-accent/10"
                      : "font-sans text-professional-slate-300 hover:text-professional-slate-100 hover:bg-professional-slate-700",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item.label}
                  role="menuitem"
                >
                  {mode === "professional" && React.cloneElement(item.icon, { className: "h-5 w-5", "aria-hidden": "true" })}
                  <span>{mode === "terminal" ? `~/${item.name.toLowerCase()}` : item.name}</span>
                </Link>
              ))}
            </nav>
            <div
              className={cn(
                "pt-4 mt-2 flex flex-col items-center",
                mode === "terminal" ? "border-t border-[#8B5CF6]" : "border-t border-professional-slate-700",
              )}
            >
              <span
                className={cn(
                  "text-sm mb-2",
                  mode === "terminal" ? "font-mono text-terminal-muted" : "font-sans text-professional-slate-400",
                )}
              >
                View Mode:
              </span>
              <ViewModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
