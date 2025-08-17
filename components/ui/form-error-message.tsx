import { AlertCircle } from "lucide-react"

interface FormErrorMessageProps {
  error?: string
  variant?: 'terminal' | 'professional'
}

export function FormErrorMessage({ error, variant = 'terminal' }: FormErrorMessageProps) {
  if (!error) return null
  
  const baseClasses = "flex items-center gap-1 mt-1 text-xs"
  const variantClasses = {
    terminal: "text-red-400",
    professional: "text-red-400 mt-1.5"
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`} role="alert">
      <AlertCircle className="h-3 w-3" aria-hidden="true" />
      <span>{variant === 'terminal' ? `[ERROR] ${error}` : error}</span>
    </div>
  )
} 