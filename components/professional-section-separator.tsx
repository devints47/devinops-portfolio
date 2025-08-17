import { cn } from "@/lib/utils"

interface ProfessionalSectionSeparatorProps {
  className?: string
}

export function ProfessionalSectionSeparator({ className }: ProfessionalSectionSeparatorProps) {
  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500 opacity-60",
        className,
      )}
      aria-hidden="true"
    />
  )
}
