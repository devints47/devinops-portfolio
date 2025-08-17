# DevinOps Portfolio

A personal portfolio website showcasing my development work and skills.


## Features

- **Dual View Modes**: Switch between terminal and professional interfaces
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **SEO Optimized**: Structured data, semantic HTML, and comprehensive meta tags
- **Keyboard Navigation**: Full accessibility with Tab/Shift+Tab navigation
- **Performance Optimized**: Fast loading with optimized images and efficient code
- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4

## Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Next-generation utility-first CSS framework
- **pnpm** - Fast, efficient package manager

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **Custom Terminal Components** - Interactive terminal experience

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing with Tailwind v4
- **Vercel Analytics & Speed Insights** - Performance monitoring

## Requirements

- **Node.js**: v20.0.0 or higher
- **pnpm**: v8.0.0 or higher

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/devinops-portfolio.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Tailwind CSS v4

This project uses Tailwind CSS v4, which includes several important changes from v3:

### Key Changes

- Uses PostCSS plugin architecture with `@tailwindcss/postcss`
- Single import syntax: `@import "tailwindcss";`
- Slash syntax for opacity: `bg-blue-500/75` instead of `bg-opacity-75`
- Updated shadow naming: `shadow-sm` → `shadow-xs`, etc.
- No implicit border colors (explicit colors required)
- Container behavior changes requiring custom configuration
- Removed support for preprocessors (SCSS, LESS)

For more details, see the [Tailwind CSS v4 documentation](https://tailwindcss.com/docs).

## License

MIT License - see [LICENSE](LICENSE) file for details.

<!-- Test comment to trigger GitHub Actions workflows -->
