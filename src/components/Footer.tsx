import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-muted/30 to-muted/60">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="group inline-flex items-center gap-3 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                Campusify
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Empowering educational institutions with data-driven insights and innovative solutions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline">
                  All Articles
                </Link>
              </li>
              <li>
                <a 
                  href="https://campusify.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                >
                  Main Website
                </a>
              </li>
              <li>
                <a 
                  href="https://campusify.io/about" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect With Us</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Campusify. Crafted with passion for education.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
