"use client"
import type React from "react"
import { TerminalWindow } from "../terminal/terminal-window"
import { TerminalPrompt } from "../terminal/terminal-prompt"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Mail, Github, Send } from "lucide-react"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"
import { FormErrorMessage } from "../ui/form-error-message"
import { useContactForm } from "@/hooks/use-contact-form"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleInputChange,
    handleBlur
  } = useContactForm()

  return (
    <section 
      id="contact" 
      className="py-20 px-4 bg-terminal-background/60 relative"
      itemScope
      itemType="https://schema.org/ContactPage"
      aria-label="Contact Devin Singh - Software Engineer & DevOps Specialist"
    >
      <meta itemProp="name" content="Contact Devin Singh - Software Engineer & DevOps Specialist" />
      <meta itemProp="description" content="Get in touch with Devin Singh for software engineering and DevOps consulting opportunities at DevinOps" />
      
      <FloatingCodeSnippet
        code={`// devin-singh-contact.go
func contactDevinSingh(message string) {
  email := "devin@devinops.com"
  sendMessage(email, message)
  return "Message sent to Devin Singh"
}`}
        top="25%"
        left="10%"
        animationDelay="1.2s"
      />
      <FloatingCodeSnippet
        code={`// devinops-social-links.rb
SOCIAL_MEDIA = {
  github: "github.com/devin",
  email: "devin@devinops.com"
}`}
        bottom="20%"
        right="12%"
        animationDelay="3.5s"
      />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center font-mono text-terminal-accent">
          <span className="text-terminal-accent">$</span>{" "}
          <span className="text-terminal-foreground">sudo connect --with devin</span>
          <span className="sr-only">Contact Devin Singh</span>
        </h2>
        <TerminalWindow title="connect.sh" className="mx-auto">
          <div className="space-y-6">
            <TerminalPrompt>./establish_connection --user devin</TerminalPrompt>
            <div className="terminal-output space-y-6 pl-2">
              <p className="text-terminal-accent">[INFO] Establishing secure connection...</p>
              <div itemScope itemType="https://schema.org/Person">
                <meta itemProp="name" content="Devin Singh" />
                <meta itemProp="jobTitle" content="Full-Stack Engineer & DevOps Specialist" />
                
                <p className="text-terminal-foreground mb-2">Contact Channels:</p>
                <div className="space-y-1 pl-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-terminal-accent" aria-hidden="true" />
                    <span className="text-terminal-accent">echo</span>{" "}
                    <a 
                      href="mailto:devin@devinops.com" 
                      className="text-green-400 hover:underline"
                      itemProp="email"
                    >
                      "devin@devinops.com"
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-terminal-accent" aria-hidden="true" />
                    <span className="text-terminal-accent">curl</span>{" "}
                    <a
                      href="https://github.com/devints47"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                      itemProp="sameAs"
                    >
                      github.com/devints47
                    </a>
                  </div>
                </div>
              </div>
              <div 
                className="border-t border-terminal-accent/30 pt-6"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <meta itemProp="contactType" content="Professional Inquiries" />
                <meta itemProp="name" content="Contact Form for Devin Singh" />
                
                <p className="text-terminal-foreground mb-2">Send direct message to Devin:</p>
                {submitStatus === 'success' && (
                  <div 
                    className="text-green-400 p-2 border border-green-500/30 rounded-md text-sm mb-3"
                    role="alert"
                    aria-live="polite"
                  >
                    [SUCCESS] Message transmitted to Devin. Standby for response.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div 
                    className="text-red-400 p-2 border border-red-500/30 rounded-md text-sm mb-3"
                    role="alert"
                    aria-live="polite"
                  >
                    [ERROR] Failed to transmit message. Please try again or contact directly.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1" htmlFor="name">Name:</label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="your_handle"
                      className={cn(
                        "bg-gray-800/50 border-terminal-accent/30 text-terminal-foreground placeholder:text-gray-500 focus:border-terminal-accent text-sm",
                        errors.name && "border-red-500 focus:border-red-500",
                      )}
                      required
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <FormErrorMessage error={errors.name} variant="terminal" />
                  </div>
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1" htmlFor="email">Email:</label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="your_secure_channel@domain.com"
                      className={cn(
                        "bg-gray-800/50 border-terminal-accent/30 text-terminal-foreground placeholder:text-gray-500 focus:border-terminal-accent text-sm",
                        errors.email && "border-red-500 focus:border-red-500",
                      )}
                      required
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <FormErrorMessage error={errors.email} variant="terminal" />
                  </div>
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1" htmlFor="subject">Subject (optional, max 100 chars):</label>
                    <Input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Briefly describe your inquiry"
                      className={cn(
                        "bg-gray-800/50 border-terminal-accent/30 text-terminal-foreground placeholder:text-gray-500 focus:border-terminal-accent text-sm",
                        errors.subject && "border-red-500 focus:border-red-500",
                      )}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    <FormErrorMessage error={errors.subject} variant="terminal" />
                  </div>
                  <div>
                    <label className="block text-xs text-terminal-muted mb-1" htmlFor="message">Message (max 1000 chars):</label>
                    <Textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Initiate communication protocol with Devin Singh..."
                      rows={3}
                      className={cn(
                        "bg-gray-800/50 border-terminal-accent/30 text-terminal-foreground placeholder:text-gray-500 focus:border-terminal-accent resize-none text-sm",
                        errors.message && "border-red-500 focus:border-red-500",
                      )}
                      required
                      maxLength={1000}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    <FormErrorMessage error={errors.message} variant="terminal" />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-terminal-accent hover:bg-terminal-accent/90 text-black font-mono font-semibold"
                    aria-label="Send message to Devin Singh"
                  >
                    <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                    {isSubmitting ? "Transmitting..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
