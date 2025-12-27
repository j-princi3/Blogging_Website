import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-between">
                <Link
                    href="/"
                    className="group flex items-center gap-3 transition-all hover:scale-105"
                >
                    <div className="flex flex-col">
                        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                            Campusify
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                            Insights & Stories
                        </span>
                    </div>
                </Link>

                <nav className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="relative text-sm font-semibold text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Articles
                    </Link>
                    <a
                        href="https://campusify.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
                    >
                        Visit Main Site
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
