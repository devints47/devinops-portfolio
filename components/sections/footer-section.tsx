"use client"
// This component is now TERMINAL MODE ONLY
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

export function FooterSection() {
  const year = new Date().getFullYear()
  return (
    <footer
      className={cn(
        "relative py-8 px-4", // Added relative for positioning the accent line
        "bg-terminal-background/80 backdrop-blur-md shadow-[0_4px_12px_rgba(139,92,246,0.3)]", // Header-like styles
      )}
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[#8B5CF6]" aria-hidden="true"></div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Terminal className="h-5 w-5 text-terminal-accent" aria-hidden="true" />
          <span 
            className="font-bold font-mono text-terminal-accent"
            itemProp="copyrightHolder"
          >
            DevinOps
          </span>
        </div>
        <div 
          className="font-mono text-terminal-muted"
          itemProp="copyrightNotice"
        >
          <span>
            © {year} | <span className="text-terminal-accent">echo $COPYRIGHT</span> | All systems operational.
          </span>
        </div>
      </div>
    </footer>
  )
}
