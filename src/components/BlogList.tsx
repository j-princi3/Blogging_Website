'use client';

import { useState, useMemo } from 'react';
import { WordPressPage } from '@/lib/types';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import { AlertCircle } from 'lucide-react';

interface BlogListProps {
    initialPosts: WordPressPage[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = useMemo(() => {
        if (!initialPosts) return [];
        if (!searchQuery.trim()) return initialPosts;

        const query = searchQuery.toLowerCase();
        return initialPosts.filter((post) =>
            post.title.rendered.toLowerCase().includes(query) ||
            post.excerpt.rendered.toLowerCase().includes(query) ||
            post.content.rendered.toLowerCase().includes(query)
        );
    }, [initialPosts, searchQuery]);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-32">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
                </div>

                <div className="container relative">
                    <div className="mx-auto max-w-4xl text-center animate-fade-in-up">

                        <h1 className="mb-6 font-heading text-5xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                            Discover{' '}
                            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient">
                                Data-Driven
                            </span>{' '}
                            <br className="hidden sm:block" />
                            Education Stories
                        </h1>
                        <p className="mb-10 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                            Explore insights, strategies, and innovations transforming campus management through intelligent analytics.
                        </p>

                        {/* Search Bar */}
                        <div className="flex justify-center">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search for articles, topics, or keywords..."
                            />
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex justify-center gap-8 text-sm">
                            <div className="text-center">
                                <div className="font-bold text-2xl text-foreground">{initialPosts?.length || 0}+</div>
                                <div className="text-muted-foreground">Articles</div>
                            </div>
                            <div className="h-12 w-px bg-border" />
                            <div className="text-center">
                                <div className="font-bold text-2xl text-foreground">Weekly</div>
                                <div className="text-muted-foreground">Updates</div>
                            </div>
                            <div className="h-12 w-px bg-border" />
                            <div className="text-center">
                                <div className="font-bold text-2xl text-foreground">Expert</div>
                                <div className="text-muted-foreground">Insights</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 md:py-16">
                <div className="container">
                    {/* Search Results Info */}
                    {searchQuery && (
                        <div className="mb-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Found <span className="font-semibold text-foreground">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'} matching "{searchQuery}"
                            </p>
                        </div>
                    )}

                    {!initialPosts || initialPosts.length === 0 ? (
                        <div className="text-center text-muted-foreground py-20">
                            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                            <p className="text-lg">No posts available at the moment.</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="mx-auto max-w-md text-center py-12">
                            <p className="text-lg font-medium text-foreground mb-2">No results found</p>
                            <p className="text-muted-foreground mb-4">
                                Try adjusting your search or browse all articles
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-primary hover:underline font-medium"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <BlogCard post={post} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
