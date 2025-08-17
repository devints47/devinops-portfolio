"use client"

import { useEffect, useRef, useState } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Enhanced canvas sizing for mobile
    const updateCanvasSize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight
      
      // Set actual canvas size
      canvas.width = displayWidth * devicePixelRatio
      canvas.height = displayHeight * devicePixelRatio
      
      // Set display size
      canvas.style.width = displayWidth + 'px'
      canvas.style.height = displayHeight + 'px'
      
      // Scale the context to match device pixel ratio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      
      return { width: displayWidth, height: displayHeight }
    }

    const { width, height } = updateCanvasSize()

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    resizeObserver.observe(canvas)

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"
    
    // Adjust font size and columns for mobile
    const fontSize = isMobile ? 12 : 14
    const columns = Math.floor(width / fontSize)

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    const purpleGradient = ctx.createLinearGradient(0, 0, 0, height)
    // Enhanced opacity for mobile visibility
    const opacity = isMobile ? 0.5 : 0.4
    purpleGradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`)
    purpleGradient.addColorStop(1, `rgba(168, 85, 247, ${opacity})`)

    const draw = () => {
      // Enhanced background clear for mobile
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = purpleGradient
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    // Adjust animation frame rate for mobile performance
    const frameRate = isMobile ? 50 : 33 // Slower on mobile for better performance
    const interval = setInterval(draw, frameRate)

    return () => {
      clearInterval(interval)
      resizeObserver.disconnect()
    }
  }, [isMobile])

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-background" 
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, // Enhanced z-index for mobile
      }}
    />
  )
}
