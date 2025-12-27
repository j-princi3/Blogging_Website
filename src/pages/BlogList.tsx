import { useState, useMemo } from 'react';
import { useBlogPosts } from '@/hooks/useBlogData';
import BlogCard from '@/components/BlogCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import SEOHead from '@/components/SEOHead';
import SearchBar from '@/components/SearchBar';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogList = () => {
  const { data: posts, isLoading, error, refetch, isFetching } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter((post) =>
      post.title.rendered.toLowerCase().includes(query) ||
      post.excerpt.rendered.toLowerCase().includes(query) ||
      post.content.rendered.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="mb-2 font-heading text-xl font-semibold text-foreground">
            Failed to Load Posts
          </h2>
          <p className="mb-6 text-muted-foreground">
            There was an issue connecting to the blog. This may be due to network issues.
          </p>
          <Button 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Campusify Blog"
        description="Discover insights, tips, and strategies for data-driven decision making in education. Explore our latest articles on campus management and analytics."
        canonicalUrl={window.location.origin}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-32">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
          
          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Latest Educational Insights
              </div>
              
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
                  <div className="font-bold text-2xl text-foreground">{posts?.length || 0}+</div>
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

            {!posts || posts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No posts found.
              </p>
            ) : filteredPosts.length === 0 ? (
              <div className="mx-auto max-w-md text-center py-12">
                <p className="text-lg font-medium text-foreground mb-2">No results found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or browse all articles
                </p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
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
    </>
  );
};

export default BlogList;
