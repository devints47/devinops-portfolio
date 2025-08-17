import { useState } from "react"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export type SubmitStatus = 'idle' | 'success' | 'error'

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required"
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters"
        }
        if (value.trim().length > 50) {
          return "Name must be less than 50 characters"
        }
        break

      case "email":
        if (!value.trim()) {
          return "Email is required"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address"
        }
        break

      case "subject":
        // Subject is optional, but if provided, validate length
        if (value.trim() && value.trim().length < 3) {
          return "Subject must be at least 3 characters if provided"
        }
        if (value.trim().length > 100) {
          return "Subject must be less than 100 characters"
        }
        break

      case "message":
        if (!value.trim()) {
          return "Message is required"
        }
        if (value.trim().length < 10) {
          return "Message must be at least 10 characters"
        }
        if (value.trim().length > 1000) {
          return "Message must be less than 1000 characters"
        }
        break

      default:
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {}

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof ContactFormData])
      if (error) {
        newErrors[key as keyof ContactFormErrors] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setErrors({})
        setSubmitStatus('success')
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as keyof ContactFormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      })
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleInputChange,
    handleBlur,
    validateField
  }
} 