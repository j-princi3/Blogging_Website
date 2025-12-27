import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function Loading() {
    return (
        <main className="min-h-screen">
            {/* Hero Section Skeleton */}
            <section className="border-b border-border bg-muted/30 py-12 md:py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ArrowLeft className="h-4 w-4" />
                            Back to all posts
                        </div>

                        <div className="animate-pulse">
                            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground py-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <div className="h-4 w-16 bg-muted-foreground/20 rounded"></div>
                                </div>
                            </div>

                            <div className="h-10 w-3/4 bg-muted-foreground/20 rounded mb-4"></div>
                            <div className="h-10 w-1/2 bg-muted-foreground/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image Skeleton */}
            <section className="border-b border-border">
                <div className="container py-8">
                    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-muted aspect-video animate-pulse">
                        <div className="h-full w-full bg-muted-foreground/10"></div>
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <article className="py-12 md:py-16">
                <div className="container">
                    <div className="mx-auto max-w-3xl animate-pulse space-y-6">
                        <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 w-5/6 bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 w-4/5 bg-muted-foreground/20 rounded"></div>
                        <br />
                        <div className="h-32 w-full bg-muted-foreground/10 rounded"></div>
                        <br />
                        <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 w-3/4 bg-muted-foreground/20 rounded"></div>
                    </div>
                </div>
            </article>
        </main>
    );
}
