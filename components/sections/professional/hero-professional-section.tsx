"use client"
import { Button } from "@/components/ui/button"
import { ArrowDown, Briefcase, Code } from "lucide-react"
import Image from "next/image"

export function HeroProfessionalSection() {
  return (
    <section
      id="hero-professional"
      className="professional-hero min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 relative overflow-hidden 
               bg-gradient-to-br from-professional-slate-900 via-white/15 to-professional-slate-900 text-professional-slate-200"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500"></div>

      <div className="w-full max-w-6xl mx-auto z-10">
        {/* Reordered grid for mobile view */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content - always shows first */}
          <div className="space-y-6 text-center md:text-left order-1 md:order-1">
            <h1 className="professional-title text-5xl lg:text-7xl font-bold" itemScope itemType="https://schema.org/Person">
              <span 
                itemProp="name"
                className="bg-gradient-to-r from-professional-indigo-500 via-professional-purple-400 to-professional-fuchsia-500 bg-clip-text text-transparent">
                Devin Singh
              </span>
            </h1>
            <p className="professional-subtitle text-xl md:text-2xl text-professional-slate-400" itemProp="jobTitle">
              Full-Stack Engineer & DevOps Specialist
            </p>
            
            {/* Image section for mobile only - positioned right after title */}
            <div className="flex justify-center items-center md:hidden order-2">
              <div className="relative w-48 h-48">
                {/* This div provides the circular gradient background */}
                <div
                  className="absolute inset-0 rounded-full shadow-2xl overflow-hidden 
                             bg-professional-gradient"
                >
                  <Image
                    src="/devin_profile.jpg"
                    alt="Devin Singh - Full-Stack Engineer and DevOps Specialist"
                    fill={true}
                    style={{objectFit: 'cover'}}
                    sizes="(max-width: 768px) 192px, 384px"
                    className="rounded-full"
                    itemProp="image"
                  />
                </div>
                {/* This div is the outer pulsing glow effect */}
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-professional-indigo-500/30 via-professional-purple-500/30 to-professional-fuchsia-500/30 blur-lg animate-pulse opacity-70"></div>
              </div>
            </div>
            
            <div itemProp="description">
              <p className="text-base md:text-lg text-professional-slate-300 leading-relaxed">
                10+ Years of Building, Deploying, and Scaling Digital Solutions. Passionate about creating efficient,
                scalable, and user-centric applications with expertise in <span className="text-professional-slate-200">software development</span>, 
                <span className="text-professional-slate-200"> cloud architecture</span>, and 
                <span className="text-professional-slate-200"> DevOps practices</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Button
                size="lg"
                className="professional-cta bg-slate-900/50 text-professional-slate-100 font-semibold shadow-lg 
                         border border-transparent hover:border-professional-purple-500/80
                         relative group overflow-hidden"
                asChild
              >
                <a href="#contact-professional" aria-label="Contact Devin Singh for software engineering opportunities">
                  <Briefcase className="mr-2 h-5 w-5" /> Get in Touch
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500 
                                 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  ></span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-professional-purple-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </Button>
              <Button
                size="lg"
                className="professional-cta bg-slate-900/50 text-professional-slate-100 font-semibold shadow-lg 
                         border border-transparent hover:border-professional-purple-500/80
                         relative group overflow-hidden"
                asChild
              >
                <a href="#projects-professional" aria-label="View Devin Singh's software engineering projects">
                  <Code className="mr-2 h-5 w-5" /> View Projects
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500 
                                 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  ></span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-professional-purple-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </Button>
            </div>
          </div>

          {/* Image section for desktop only */}
          <div className="hidden md:flex justify-center items-center order-2 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* This div provides the circular gradient background */}
              <div
                className="absolute inset-0 rounded-full shadow-2xl overflow-hidden 
                           bg-professional-gradient"
              >
                <Image
                  src="/devin_profile.jpg"
                  alt="Devin Singh - Full-Stack Engineer and DevOps Specialist"
                  fill={true}
                  style={{objectFit: 'cover'}}
                  sizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 384px"
                  className="rounded-full"
                  priority
                  itemProp="image"
                />
              </div>
              {/* This div is the outer pulsing glow effect */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-professional-indigo-500/30 via-professional-purple-500/30 to-professional-fuchsia-500/30 blur-lg animate-pulse opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <a href="#about-professional" aria-label="Scroll to About section">
          <ArrowDown className="h-8 w-8 text-professional-slate-500 animate-bounce hover:text-professional-purple-400 transition-colors" />
        </a>
      </div>
    </section>
  )
}
