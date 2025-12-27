# 📝 Next.js Blogging Website

A sleek, performant blogging platform built with Next.js 15, TypeScript, and Tailwind CSS. Fully responsive, SEO-optimized, and designed for an exceptional reading experience using a headless WordPress backend.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

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

---

## 🧹 Content Cleaning & Logic

The application uses a robust content cleaning pipeline to ensure WordPress data renders beautifully and matches the site's design system.

### How it works
The `src/lib/cleaner.ts` utility processes the raw HTML from the WordPress API before it reaches the client.

1.  **Tag Removal**:
    -   Removes `<style>` and `<script>` tags to prevent inline CSS/JS pollution.
    -   Strips `style="..."` attributes from all elements.
2.  **Class Sanitization**:
    -   Removes all WordPress-specific junk classes (e.g., `wp-block-group`, `elementor-widget`).
    -   Ensures clean HTML that inherits the site's global typography from `globals.css` (scoped under `.blog-content`).
3.  **Optimization**:
    -   Enhances `<img>` tags with `loading="lazy"` for performance.
    -   Ensures external links open in new tabs with secure `rel="noopener"`.

---

## ⚡ Performance & SEO

The project is engineered for speed and search engine visibility.

### Performance Strategy
-   **Static Site Generation (SSG)**: I used `generateStaticParams` to pre-build blog posts at build time, serving them instantly as static HTML.
-   **Incremental Static Regeneration (ISR)**: Pages are cached for 1 hour (`revalidate: 3600`), balancing freshness with performance.
-   **Optimized Payloads**: API requests use the `_fields` parameter to fetch only necessary data (title, slug, content), reducing JSON payload size by ~90% and avoiding Vercel cache limits.
-   **Image Optimization**: Next.js `next/image` handles automatic resizing and format conversion (WebP/AVIF).

### SEO Implementation
-   **Dynamic Metadata**: Each page generates unique `<title>`, `<meta description>`, and Open Graph tags based on the WordPress content.
-   **Semantic HTML**: Proper use of `<header>`, `<main>`, `<article>`, and heading hierarchy (`h1` -> `h2`).
-   **Sitemap & Robots**: Standard SEO files are generated to guide crawlers.

---

## 📁 Project Structure

```
blogging-website/
├── src/
│   ├── app/                    # App Router
│   │   ├── [slug]/             # Dynamic Post Routes
│   │   ├── globals.css         # Global styles & Typography
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (Blog list)
│   │   └── not-found.tsx       # 404 page
│   ├── components/             # Reusable components
│   └── lib/                    # Utilities
│       ├── api.ts              # WP API Fetching with Caching
│       ├── cleaner.ts          # HTML Sanitization
│       ├── types.ts            # TS Interfaces
│       └── utils.ts            # Helper functions
├── public/                     # Static assets
├── next.config.ts              # Next.js Config
└── tsconfig.json               # TypeScript Config
```

---

## ✨ Key Features

### 🎨 **User Experience**
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Clean Typography** - Optimized for long-form reading
- **404 Page** - Custom not found page with helpful navigation

### 📰 **Blog Functionality**
- **Headless WordPress** - Fetches content dynamically from a WordPress REST API
- **Dynamic Routing** - SEO-friendly URLs (`/[slug]`)
- **Content Cleaning** - Automatic removal of inline styles and junk HTML from CMS content

### 🔧 **Technical Features**
- **Next.js App Router** - Leveraging React Server Components
- **TypeScript** - Full type safety across the entire codebase
