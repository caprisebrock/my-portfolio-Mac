# Caprise Brock Portfolio

A modern, professional portfolio built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Features a fully monochrome design, a custom AI chatbot, and a clean, responsive layout.

## Project Overview

- Sleek, accessible monochrome palette (black, white, dark gray)
- AI-powered chat widget (OpenAI API)
- Responsive design for all devices
- Modular, component-based architecture
- Easy to extend and maintain

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

## File Structure

```
app/
  components/      # Reusable React components (NavBar, ChatWidget, ChatWindow, etc.)
  globals.css      # Tailwind and global styles (monochrome palette)
  layout.tsx       # Root layout with NavBar
  page.tsx         # Main homepage
  api/             # API routes (e.g., chat)
next.config.js     # Next.js config
package.json       # Project dependencies and scripts
tsconfig.json      # TypeScript config
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the dev server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Customization
- Update your content in `app/page.tsx` and components in `app/components/`.
- All colors and styles are managed via Tailwind CSS and `app/globals.css`.

---

© Caprise Brock. Built with Next.js, TypeScript, and Tailwind CSS. 