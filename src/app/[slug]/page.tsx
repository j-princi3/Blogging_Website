import { fetchContentBySlug } from "@/lib/api";
import { cleanContent } from "@/lib/cleaner";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { WordPressPage } from "@/lib/types";

// Helper for reading time
function calculateReadingTime(content: string): number {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const content = await fetchContentBySlug(slug);

    if (!content) {
        return {
            title: 'Page Not Found',
        };
    }

    return {
        title: content.yoast_head_json?.title || content.title.rendered,
        description: content.yoast_head_json?.description || content.excerpt.rendered.replace(/<[^>]*>?/gm, '').slice(0, 160),
        openGraph: {
            title: content.yoast_head_json?.og_title || content.title.rendered,
            description: content.yoast_head_json?.og_description,
            images: content.yoast_head_json?.og_image || [],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content: WordPressPage | null = await fetchContentBySlug(slug);

    if (!content) {
        notFound();
    }

    const cleanedHtml = cleanContent(content.content.rendered);
    const readingTime = calculateReadingTime(content.content.rendered);
    const formattedDate = new Date(content.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const featuredImage = content._embedded?.['wp:featuredmedia']?.[0]?.source_url
        || content.yoast_head_json?.og_image?.[0]?.url;

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="border-b border-border bg-muted/30 py-12 md:py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animate-fade-in"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to all posts
                        </Link>

                        <div className="animate-fade-in-up">
                            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={content.date}>{formattedDate}</time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>

                            <h1
                                className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                                dangerouslySetInnerHTML={{ __html: content.title.rendered }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {featuredImage && (
                <section className="border-b border-border">
                    <div className="container py-8">
                        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl">
                            <img
                                src={featuredImage}
                                alt={content.title.rendered}
                                className="h-auto w-full object-cover animate-fade-in"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <article className="py-12 md:py-16">
                <div className="container">
                    <div
                        className="mx-auto max-w-3xl blog-content animate-fade-in-up"
                        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                    />
                </div>
            </article>

            {/* Back to posts */}
            <section className="border-t border-border py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            View all posts
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
