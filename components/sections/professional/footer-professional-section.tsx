"use client"
import { Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"

export function FooterProfessionalSection() {
  const year = new Date().getFullYear()
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/devin", label: "GitHub", name: "GitHub Profile" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/devin", label: "LinkedIn", name: "LinkedIn Profile" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:hello@devinops.com", label: "Email", name: "Email Contact" },
  ]

  return (
    <footer
      id="footer-professional"
      className="professional-footer relative py-12 px-4 
           bg-professional-slate-800/80 backdrop-blur-md shadow-lg"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-professional-indigo-500 via-professional-purple-500 to-professional-fuchsia-500"
        aria-hidden="true"
      ></div>
      <div className="max-w-6xl mx-auto">
        {/* 
          Mobile: flex-col, items centered, gap for spacing.
          Desktop (md+): 3-column grid. 
            - Middle column (copyright) width is auto (based on its content).
            - Outer columns (title, social links) take 1fr each (equal share of remaining space).
            - This configuration centers the middle 'auto' column.
            - items-center for vertical alignment in both flex and grid.
            - gap-8 for spacing.
        */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 text-sm">
          {/* Left Column: DevinOps Title/Subtitle */}
          <div className="text-center md:text-left md:justify-self-start">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 group mb-2" aria-label="DevinOps homepage">
              <span 
                className="text-xl font-bold text-professional-slate-200 group-hover:professional-text-gradient transition-colors duration-300"
                itemProp="name"
              >
                DevinOps
              </span>
            </Link>
            <p className="text-professional-slate-400">
              <span itemProp="description">Full-Stack Engineer & DevOps Specialist</span>
            </p>
            <p className="text-professional-slate-400 mt-2 hidden md:block">
              <Link href="#about-professional" className="hover:text-professional-purple-400 transition-colors">
                More about Devin Singh
              </Link>
            </p>
          </div>

          {/* Center Column: Copyright and tagline section */}
          <div className="text-center md:justify-self-center">
            <p className="text-professional-slate-500">&copy; {year} <span itemProp="copyrightHolder">Devin Singh</span>. All rights reserved.</p>
            <p className="mt-1 text-professional-slate-500">Building, Deploying, and Scaling Digital Solutions.</p>
            <p className="mt-3 text-professional-slate-500 text-xs">
              <Link href="/sitemap.xml" className="hover:text-professional-purple-400 transition-colors">
                Sitemap
              </Link>
              {" • "}
              <Link href="/privacy" className="hover:text-professional-purple-400 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Right Column: Social Links */}
          <div className="flex flex-col items-center md:items-end md:justify-self-end">
            <h2 className="text-professional-slate-400 mb-3 text-sm font-medium">Connect with Devin Singh</h2>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.name}
                  className="text-professional-slate-400 hover:text-professional-indigo-500 transition-colors"
                  itemProp="sameAs"
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
            <p className="text-professional-slate-500 mt-3 text-xs md:text-right">
              DevinOps.com - Software Engineering Portfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
