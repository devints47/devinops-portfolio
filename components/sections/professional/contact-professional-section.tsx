"use client"
import { motion } from "framer-motion"
import { Send, Github, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormErrorMessage } from "@/components/ui/form-error-message"
import { useContactForm } from "@/hooks/use-contact-form"

export function ContactProfessionalSection() {
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
      id="contact-professional"
      className="professional-contact py-20 px-4 
               bg-gradient-to-b from-professional-slate-900 via-white/15 to-professional-slate-900 
               text-professional-slate-200"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <meta itemProp="name" content="Contact Devin Singh - Software Engineer & DevOps Specialist" />
      <meta itemProp="description" content="Get in touch with Devin Singh for software engineering and DevOps consulting opportunities at DevinOps" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="professional-heading text-4xl font-bold mb-4 text-professional-slate-200">
            Get In Touch with <span className="sr-only">Devin Singh</span>
          </h2>
          <p className="text-lg text-professional-slate-400 max-w-2xl mx-auto">
            I'm always open to discussing new <span className="text-professional-slate-200">software engineering</span> projects, creative ideas, or opportunities to be part of something great at <span className="text-professional-slate-200">DevinOps</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="professional-contact-info space-y-6" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content="Devin Singh" />
            <meta itemProp="jobTitle" content="Full-Stack Engineer & DevOps Specialist" />
            
            <h3 className="text-2xl font-semibold text-professional-slate-100 mb-4">Contact Information</h3>
            <a 
              href="mailto:devin@devinops.com" 
              className="flex items-center gap-3 group"
              itemProp="email"
            >
              <Mail className="h-6 w-6 text-professional-purple-400 group-hover:text-professional-indigo-500 transition-colors" aria-hidden="true" />
              <span className="text-professional-slate-300 group-hover:text-professional-slate-100 transition-colors">
                devin@devinops.com
              </span>
            </a>
            <div className="flex items-center gap-3 group">
              <span className="text-professional-slate-300">Contact via Email or filling out the form!</span>
            </div>
            <div className="flex items-center gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <MapPin className="h-6 w-6 text-professional-purple-400" aria-hidden="true" />
              <span className="text-professional-slate-300">
                <span itemProp="addressLocality">Orlando</span>, <span itemProp="addressRegion">FL</span> (Remote Available)
              </span>
            </div>
            <div className="pt-4 border-t border-professional-slate-600/50">
              <h4 className="text-lg font-semibold text-professional-slate-200 mb-3">Connect Online:</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/devints47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-professional-slate-400 hover:text-professional-indigo-500 transition-colors p-2 rounded-full hover:bg-professional-slate-700/50"
                  aria-label="GitHub Profile"
                  itemProp="sameAs"
                >
                  <Github className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Devin Singh on GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="professional-card professional-form bg-professional-slate-800/90 backdrop-blur-sm border-professional-slate-600 p-8">
            <div className="card-header mb-6">
              <h3 className="text-2xl text-professional-slate-100">Send a Message</h3>
              <p className="text-professional-slate-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>
            <div className="card-content">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-300/80 text-sm mt-1">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    <div>
                      <p className="text-red-400 font-medium">Failed to send message</p>
                      <p className="text-red-300/80 text-sm mt-1">
                        Please try again or contact me directly via email.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-professional-slate-300 mb-1.5">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={`professional-input bg-professional-slate-700 border-professional-slate-600 text-professional-slate-200 focus:ring-professional-indigo-500 focus:border-professional-indigo-500 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  <FormErrorMessage error={errors.name} variant="professional" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-professional-slate-300 mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Your email"
                    className={`professional-input bg-professional-slate-700 border-professional-slate-600 text-professional-slate-200 focus:ring-professional-indigo-500 focus:border-professional-indigo-500 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  <FormErrorMessage error={errors.email} variant="professional" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-professional-slate-300 mb-1.5">
                    Subject (optional)
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Brief description of your inquiry"
                    className={`professional-input bg-professional-slate-700 border-professional-slate-600 text-professional-slate-200 focus:ring-professional-indigo-500 focus:border-professional-indigo-500 ${errors.subject ? "border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  <FormErrorMessage error={errors.subject} variant="professional" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-professional-slate-300 mb-1.5">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Your message..."
                    rows={4}
                    className={`professional-input bg-professional-slate-700 border-professional-slate-600 text-professional-slate-200 focus:ring-professional-indigo-500 focus:border-professional-indigo-500 ${errors.message ? "border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  <FormErrorMessage error={errors.message} variant="professional" />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="professional-submit-btn w-full bg-gradient-to-r from-professional-indigo-500 to-professional-purple-500 hover:from-professional-indigo-500/90 hover:to-professional-purple-500/90 text-white font-semibold shadow-lg disabled:opacity-70"
                  aria-label="Send message to Devin Singh"
                >
                  <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
