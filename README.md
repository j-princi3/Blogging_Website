# 📝 Next.js Blogging Website

A sleek, performant blogging platform built with Next.js 15, TypeScript, and Tailwind CSS. Fully responsive, SEO-optimized, and designed for an exceptional reading experience using a headless WordPress backend.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 🎨 **User Experience**
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Server Side Rendering (SSR)** - Fast initial load and SEO friendly
- **Clean Typography** - Optimized for long-form reading
- **404 Page** - Custom not found page with helpful navigation

### 📰 **Blog Functionality**
- **Headless WordPress** - Fetches content dynamically from a WordPress REST API
- **Dynamic Routing** - SEO-friendly URLs (`/[slug]`)
- **Content Cleaning** - Automatic removal of inline styles and junk HTML from CMS content
- **Smart Caching** - Incremental Static Regeneration (ISR) strategies for performance

### 🔧 **Technical Features**
- **Next.js App Router** - Leveraging React Server Components
- **TypeScript** - Full type safety across the entire codebase
- **Metadata API** - Dynamic SEO tags (Open Graph, Title, Description) based on post content
- **Cheerio** - Robust server-side HTML processing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation & Running Locally

```bash
# 1️⃣ Clone the repository
git clone <YOUR_GIT_URL>
cd blogging-website

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the development server
npm run dev

# 🎉 Open http://localhost:3000
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run Linting
npm run lint
```

---

## 📁 Project Structure

```
blogging-website/
├── src/
│   ├── app/                    # App Router
│   │   ├── [slug]/             # Dynamic Post Routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (Blog list)
│   │   └── not-found.tsx       # 404 page
│   ├── components/             # Reusable components
│   └── lib/                    # Utilities
│       ├── api.ts              # WP API Fetching
│       ├── cleaner.ts          # HTML Sanitization
│       ├── types.ts            # TS Interfaces
│       └── utils.ts            # Helper functions
├── public/                     # Static assets
├── next.config.ts              # Next.js Config
├── tailwind.config.ts          # Tailwind Config
└── tsconfig.json               # TypeScript Config

---

**Made using Next.js + TypeScript**
