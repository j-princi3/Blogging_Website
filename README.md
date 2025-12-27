# 📝 Modern Blogging Website

A sleek, performant blogging platform built with cutting-edge web technologies. Fully responsive, SEO-optimized, and designed for an exceptional reading experience.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## ✨ Features

### 🎨 **User Experience**
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Fast Navigation** - Client-side routing with React Router for instant page transitions
- **Loading States** - Elegant loading spinners and skeleton screens
- **404 Page** - Custom not found page with helpful navigation

### 📰 **Blog Functionality**
- **Blog List View** - Browse all blog posts with attractive card layouts
- **Individual Post View** - Read full articles with clean typography
- **Dynamic Routing** - SEO-friendly URLs for each blog post (`/post-slug`)
- **HTML Sanitization** - Safe rendering of blog content using DOMPurify

### 🔧 **Technical Features**
- **TypeScript** - Full type safety across the entire codebase
- **React Query** - Efficient data fetching and caching with TanStack Query
- **SEO Optimized** - Dynamic meta tags using React Helmet Async
- **Component Library** - Built with shadcn/ui components
- **Toast Notifications** - User feedback with Sonner toast notifications
- **Modern Build** - Lightning-fast builds with Vite

### 🎯 **Developer Experience**
- **Hot Module Replacement** - Instant updates during development
- **ESLint** - Automated code quality checks
- **TypeScript Strict Mode** - Maximum type safety
- **Path Aliases** - Clean imports using `@/` prefix
- **Well Organized** - Clear folder structure for scalability

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

> 💡 **Tip**: Use [nvm](https://github.com/nvm-sh/nvm) for easy Node.js version management

### Installation & Running Locally

```bash
# 1️⃣ Clone the repository
git clone <YOUR_GIT_URL>
cd blogging-website

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the development server
npm run dev

# 🎉 Open your browser to http://localhost:8080
```

The dev server will automatically reload when you make changes!

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks and modern features |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **Vite** | Next-generation frontend build tool |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | High-quality, accessible component library |
| **React Router** | Client-side routing |
| **TanStack Query** | Server state management |
| **React Helmet Async** | Dynamic document head management |
| **DOMPurify** | XSS protection for HTML content |
| **Sonner** | Beautiful toast notifications |

---

## 📁 Project Structure

```
blogging-website/
├── public/              # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BlogCard.tsx
│   ├── pages/          # Page components
│   │   ├── BlogList.tsx
│   │   ├── BlogPost.tsx
│   │   └── NotFound.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   │   ├── api.ts
│   │   ├── utils.ts
│   │   └── sanitizeHtml.ts
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🌐 Deployment

Deploy your blog to the web in minutes:

### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

### **Custom Hosting**
```bash
# Build for production
npm run build

# Upload the dist/ folder to your hosting provider
```

---

## 🔧 Configuration

### Adding New Routes
Edit `src/App.tsx` to add new routes:
```tsx
<Route path="/about" element={<About />} />
```

### Customizing Styles
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind utility classes

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=https://your-api.com
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Vite](https://vitejs.dev/) - For the blazing-fast build tool

---

**Made with ❤️ using React + TypeScript**
