"use client"
// Typewriter animation version of the hero section

import { useState, useEffect, useCallback } from "react"
import { TerminalWindow } from "../terminal/terminal-window"
import { IsolatedTypingEffect } from "../terminal/isolated-typing-effect"
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from "lucide-react"
import { FloatingCodeSnippet } from "../terminal/floating-code-snippet"
import { useIsMobile } from "@/hooks/use-mobile"

// ASCII art for DevinOps branding
const asciiArtLines = [
  " ____             _        _____            ",
  "|  _ \\  _____    (_)_ __  / __  \\ _ __  ___ ",
  "| | | |/ _ \\ \\ / / | '_ \\| |  | || '_ \\/ __|",
  "| |_| |  __/\\ V /| | | | | |__| || |_) \\__ \\",
  "|____/ \\___| \\_/ |_|_| |_|\\_____/| .__/|___|",
  "                                 |_|        "
]

function checkShouldRunAnimation(): boolean {
  if (typeof window === 'undefined') return false // SSR safe
  
  const SESSION_KEY = 'devinops-hero-animations-session'
  const COOLDOWN_MINUTES = 20
  
  try {
    const now = Date.now()
    const sessionData = localStorage.getItem(SESSION_KEY)
    
    // First time visitor - run animation
    if (!sessionData) {
      return true
    }
    
    const parsed = JSON.parse(sessionData)
    const { lastAnimationTime, sessionExpiry, animationStarted } = parsed
    
    // Session expired - clear and run animation
    if (now > sessionExpiry) {
      localStorage.removeItem(SESSION_KEY)
      return true
    }
    
    // If animation was started or completed, don't run again
    if (animationStarted || lastAnimationTime) {
      if (lastAnimationTime) {
        const cooldownMs = COOLDOWN_MINUTES * 60 * 1000
        return now - lastAnimationTime > cooldownMs
      }
      return false
    }
    
    return true
  } catch (error) {
    return true // Default to animation on error
  }
}

export function HeroSection() {
  // Animation sequence state management
  const [startFirstLine, setStartFirstLine] = useState(false)
  const [line1Complete, setLine1Complete] = useState(false)
  const [nameComplete, setNameComplete] = useState(false)
  const [titleComplete, setTitleComplete] = useState(false)
  const [line3Complete, setLine3Complete] = useState(false)
  
  // ASCII art animation states
  const [asciiLine1Complete, setAsciiLine1Complete] = useState(false)
  const [asciiLine2Complete, setAsciiLine2Complete] = useState(false)
  const [asciiLine3Complete, setAsciiLine3Complete] = useState(false)
  const [asciiLine4Complete, setAsciiLine4Complete] = useState(false)
  const [asciiLine5Complete, setAsciiLine5Complete] = useState(false)
  const [asciiLine6Complete, setAsciiLine6Complete] = useState(false)
  
  // Navigation instructions animation states
  const [instructionPart1Complete, setInstructionPart1Complete] = useState(false)
  const [instructionPart2Complete, setInstructionPart2Complete] = useState(false)
  const [instructionLineComplete, setInstructionLineComplete] = useState(false)
  
  // Global animation control
  const [allLinesComplete, setAllLinesComplete] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [skipAnimation, setSkipAnimation] = useState(false) // New flag to skip typing effects
  
  const isMobile = useIsMobile()

  // Handle mobile-specific behavior (skip navigation instructions)
  const handleAsciiComplete = useCallback(() => {
    if (isMobile) {
      setTimeout(() => {
        setInstructionLineComplete(true);
      }, 300);
    }
  }, [isMobile]);

  // Initialize animation sequence
  useEffect(() => {
    const shouldRunAnimation = checkShouldRunAnimation()
    
    if (!shouldRunAnimation) {
      // Skip animation - set everything to completed immediately and skip typing effects
      setSkipAnimation(true)
      setStartFirstLine(true)
      setLine1Complete(true)
      setNameComplete(true)
      setTitleComplete(true)
      setLine3Complete(true)
      setAsciiLine1Complete(true)
      setAsciiLine2Complete(true)
      setAsciiLine3Complete(true)
      setAsciiLine4Complete(true)
      setAsciiLine5Complete(true)
      setAsciiLine6Complete(true)
      setInstructionPart1Complete(true)
      setInstructionPart2Complete(true)
      setInstructionLineComplete(true)
      setAllLinesComplete(true)
      return
    }
    
    // Run animation normally
    const timer = setTimeout(() => {
      setStartFirstLine(true)
      // Mark animation as started
      try {
        const SESSION_KEY = 'devinops-hero-animations-session'
        const now = Date.now()
        const sessionData = {
          animationStarted: true,
          sessionExpiry: now + (24 * 60 * 60 * 1000) // 24 hours
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
      } catch (error) {
        console.warn('Failed to save animation started flag:', error)
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Cursor visibility for command line
  const showLine1Cursor = () => {
    if (!line1Complete) return true
    if (line1Complete && !allLinesComplete) return false
    if (allLinesComplete) return true
    return false
  }

  // Handle ASCII art completion (mobile behavior)
  useEffect(() => {
    if (asciiLine6Complete) {
      handleAsciiComplete();
    }
  }, [asciiLine6Complete, handleAsciiComplete]);

  // Save session data when animation completes
  useEffect(() => {
    if (instructionLineComplete && !allLinesComplete) {
      setTimeout(() => {
        setAllLinesComplete(true);
        
        // Save session data to localStorage
        const SESSION_KEY = 'devinops-hero-animations-session'
        const now = Date.now()
        const sessionData = {
          lastAnimationTime: now,
          sessionExpiry: now + (24 * 60 * 60 * 1000), // 24 hours
          animationStarted: true
        }
        
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
        } catch (error) {
          console.warn('Failed to save session data:', error)
        }
      }, 300);
    }
  }, [instructionLineComplete, allLinesComplete]);

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-16 bg-terminal-background/60" 
      aria-label="Devin Singh - DevinOps Terminal Portfolio"
      id="hero"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Primary schema.org data for Devin Singh */}
      <meta itemProp="name" content="Devin Singh" />
      <meta itemProp="alternateName" content="DevinOps" />
      <meta itemProp="url" content="https://devinops.me" />
      <meta itemProp="jobTitle" content="Full-Stack Engineer & DevOps Specialist" />
      <meta itemProp="description" content="Software engineer with 10+ years of experience in full-stack development and DevOps, specializing in cloud architecture and scalable solutions." />
      <meta itemProp="knowsAbout" content="Full-Stack Development, DevOps Engineering, Cloud Architecture, Kubernetes, React, Node.js" />
      <meta itemProp="email" content="hello@devinops.com" />
      
      {/* Work experience data */}
      <div itemProp="hasOccupation" itemScope itemType="https://schema.org/Occupation">
        <meta itemProp="name" content="Software Engineer" />
        <meta itemProp="occupationalCategory" content="15-1252" />
        <meta itemProp="skills" content="Full-Stack Development, DevOps, Cloud Architecture" />
        <div itemProp="occupationLocation" itemScope itemType="https://schema.org/City">
          <meta itemProp="name" content="San Francisco" />
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        <TerminalWindow title="devin@devinops:~" fullWidth>
          <div className="space-y-4">
            <div className="font-mono">
              <span className="text-green-500">devin@devinops</span>
              <span className="text-terminal-foreground mx-1">:</span>
              <span className="text-terminal-accent">~</span>
              <span className="text-terminal-foreground mx-1">$</span>{" "}
              {skipAnimation ? (
                <span className="terminal-command-line">whoami</span>
              ) : (
                <IsolatedTypingEffect
                  key={`line1-${resetKey}`}
                  text="whoami"
                  typingSpeed={80}
                  showCursor={showLine1Cursor()}
                  onComplete={() => setLine1Complete(true)}
                  shouldStart={startFirstLine}
                  className="terminal-command-line"
                />
              )}
            </div>

            {/* Name line */}
            {(line1Complete || skipAnimation) && (
              <div className="pl-6">
                {skipAnimation ? (
                  <span className="text-xl md:text-2xl font-bold text-terminal-accent">Devin Singh</span>
                ) : (
                  <IsolatedTypingEffect
                    key={`name-${resetKey}`}
                    text="Devin Singh"
                    typingSpeed={30}
                    startDelay={300}
                    showCursor={true}
                    hideCursorOnComplete={true}
                    onComplete={() => setNameComplete(true)}
                    shouldStart={line1Complete}
                    className="text-xl md:text-2xl font-bold text-terminal-accent"
                  />
                )}
              </div>
            )}

            {/* Title line */}
            {(nameComplete || skipAnimation) && (
              <div className="pl-6">
                {skipAnimation ? (
                  <span className="text-xl md:text-2xl font-bold text-terminal-accent">Full-Stack Software Engineer & DevOps Specialist</span>
                ) : (
                  <IsolatedTypingEffect
                    key={`title-${resetKey}`}
                    text="Full-Stack Software Engineer & DevOps Specialist"
                    typingSpeed={30}
                    startDelay={300}
                    showCursor={true}
                    hideCursorOnComplete={true}
                    onComplete={() => setTitleComplete(true)}
                    shouldStart={nameComplete}
                    className="text-xl md:text-2xl font-bold text-terminal-accent"
                  />
                )}
              </div>
            )}

            {/* Experience line */}
            {(titleComplete || skipAnimation) && (
              <div className="pl-6">
                {skipAnimation ? (
                  <span className="text-gray-400">10+ Years of Building, Deploying, and Scaling Digital Solutions</span>
                ) : (
                  <IsolatedTypingEffect
                    key={`line3-${resetKey}`}
                    text="10+ Years of Building, Deploying, and Scaling Digital Solutions"
                    typingSpeed={20}
                    startDelay={300}
                    showCursor={true}
                    hideCursorOnComplete={true}
                    onComplete={() => setLine3Complete(true)}
                    shouldStart={titleComplete}
                    className="text-gray-400"
                  />
                )}
              </div>
            )}
            
            <div className="mt-5 flex justify-center">
              {/* ASCII Art Container with mobile-specific tight spacing */}
              <div 
                className="inline-block" 
                style={{ 
                  lineHeight: isMobile ? '0.6' : '1.1',
                  letterSpacing: isMobile ? '-0.05em' : 'normal'
                }}
              >
                {skipAnimation ? (
                  // Show all ASCII art immediately for returning users
                  <>
                    {asciiArtLines.map((line, index) => (
                      <div key={index} className="block">
                        <span className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre">
                          {line}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  // Show typing animation for new users
                  <>
                    {/* ASCII Art Line 1 */}
                    {line3Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line1-${resetKey}`}
                          text={asciiArtLines[0]}
                          typingSpeed={5}
                          startDelay={300}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine1Complete(true)}
                          shouldStart={line3Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                    
                    {/* ASCII Art Line 2 */}
                    {asciiLine1Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line2-${resetKey}`}
                          text={asciiArtLines[1]}
                          typingSpeed={5}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine2Complete(true)}
                          shouldStart={asciiLine1Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                    
                    {/* ASCII Art Line 3 */}
                    {asciiLine2Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line3-${resetKey}`}
                          text={asciiArtLines[2]}
                          typingSpeed={5}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine3Complete(true)}
                          shouldStart={asciiLine2Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                    
                    {/* ASCII Art Line 4 */}
                    {asciiLine3Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line4-${resetKey}`}
                          text={asciiArtLines[3]}
                          typingSpeed={5}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine4Complete(true)}
                          shouldStart={asciiLine3Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                    
                    {/* ASCII Art Line 5 */}
                    {asciiLine4Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line5-${resetKey}`}
                          text={asciiArtLines[4]}
                          typingSpeed={5}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine5Complete(true)}
                          shouldStart={asciiLine4Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                    
                    {/* ASCII Art Line 6 */}
                    {asciiLine5Complete && (
                      <div className="block">
                        <IsolatedTypingEffect
                          key={`ascii-line6-${resetKey}`}
                          text={asciiArtLines[5]}
                          typingSpeed={5}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setAsciiLine6Complete(true)}
                          shouldStart={asciiLine5Complete}
                          className="text-terminal-accent text-[3vw] xs:text-[2.8vw] sm:text-[2.4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[1vw] font-mono whitespace-pre"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Navigation instructions line - hidden on mobile */}
            {(asciiLine6Complete || skipAnimation) && !isMobile && (
              <div className="mt-5 pl-6">
                {skipAnimation ? (
                  // Show complete instructions immediately for returning users
                  <div className="text-terminal-foreground font-mono inline-flex items-center">
                    <span>Use the arrow keys</span>
                    <ArrowUp className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                    <ArrowDown className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                    <span> to navigate, or </span>
                    <ArrowLeft className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                    <ArrowRight className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                    <span> to change views</span>
                  </div>
                ) : (
                  // Show typing animation for new users
                  <>
                    <IsolatedTypingEffect
                      key={`instructions-${resetKey}`}
                      text="Use the arrow keys"
                      typingSpeed={20}
                      startDelay={500}
                      showCursor={false}
                      hideCursorOnComplete={true}
                      onComplete={() => setInstructionPart1Complete(true)}
                      shouldStart={asciiLine6Complete}
                      className="text-terminal-foreground font-mono inline-flex items-center"
                    />
                    
                    {instructionPart1Complete && (
                      <>
                        <ArrowUp className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                        <ArrowDown className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                        <IsolatedTypingEffect
                          key={`instructions-part2-${resetKey}`}
                          text=" to navigate, or "
                          typingSpeed={20}
                          startDelay={100}
                          showCursor={false}
                          hideCursorOnComplete={true}
                          onComplete={() => setInstructionPart2Complete(true)}
                          shouldStart={instructionPart1Complete}
                          className="text-terminal-foreground font-mono inline-flex items-center"
                        />
                      </>
                    )}
                    
                    {instructionPart2Complete && (
                      <>
                        <ArrowLeft className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                        <ArrowRight className="h-4 w-4 mx-1 text-terminal-foreground inline-block" />
                        <IsolatedTypingEffect
                          key={`instructions-part3-${resetKey}`}
                          text=" to change views"
                          typingSpeed={20}
                          startDelay={100}
                          showCursor={true}
                          hideCursorOnComplete={true}
                          onComplete={() => setInstructionLineComplete(true)}
                          shouldStart={instructionPart2Complete}
                          className="text-terminal-foreground font-mono inline-flex items-center"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Move the bounce arrow to appear after the instruction is complete */}
          {(instructionLineComplete || (isMobile && asciiLine6Complete) || skipAnimation) && (
            <div className="mt-8 flex justify-center">
              <a href="#about" className="animate-bounce" aria-label="Scroll to About section">
                <ArrowDown className="h-8 w-8 text-terminal-accent" aria-hidden="true" />
              </a>
            </div>
          )}
        </TerminalWindow>
      </div>

      <FloatingCodeSnippet
        code={`// Welcome to DevinOps - Devin Singh
const user = "Devin Singh";
const role = "Full-Stack Software Engineer";
console.log(\`Hello, I'm \${user}, a \${role} engineer.\`);`}
        top="20%"
        left="5%"
      />
      <FloatingCodeSnippet
        code={`// Devin Singh's software engineering skills
function getSoftwareEngineeringSkills() {
  return [
    "Full-Stack Development",
    "Web Development",
    "DevOps Engineering", 
    "Cloud Architecture",
    "Web Development",
    "Automation"
  ];
}
console.log(getSoftwareEngineeringSkills());`}
        bottom="20%"
        right="5%"
        animationDelay="2s"
      />
      
      {/* Social profiles data */}
      <link itemProp="sameAs" href="https://github.com/devin" />
      <link itemProp="sameAs" href="https://linkedin.com/in/devin" />
    </section>
  )
}
