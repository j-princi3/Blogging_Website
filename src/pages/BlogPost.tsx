import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useBlogPost } from '@/hooks/useBlogData';
import { sanitizeContent, extractPlainText, extractFirstImage } from '@/lib/sanitizeHtml';
import LoadingSpinner from '@/components/LoadingSpinner';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';

// Estimate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error, refetch, isFetching } = useBlogPost(slug);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <main className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="mb-2 font-heading text-xl font-semibold text-foreground">
            Failed to Load Post
          </h2>
          <p className="mb-6 text-muted-foreground">
            There was an issue loading this post. Please try again.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button 
              onClick={() => refetch()} 
              disabled={isFetching}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link to="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
            Post not found
          </h1>
          <p className="mb-8 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </main>
    );
  }

  const title = post.title.rendered.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'");
  const cleanContent = sanitizeContent(post.content.rendered);
  const description = post.yoast_head_json?.description 
    || extractPlainText(post.excerpt.rendered || post.content.rendered, 160);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url 
    || post.yoast_head_json?.og_image?.[0]?.url
    || extractFirstImage(post.content.rendered);
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const readingTime = calculateReadingTime(post.content.rendered);
  const canonicalUrl = `${window.location.origin}/${post.slug}`;

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={featuredImage || undefined}
        ogType="article"
        publishedTime={post.date_gmt}
        modifiedTime={post.modified_gmt}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animate-fade-in"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
              
              <div className="animate-fade-in-up">
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{formattedDate}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
                
                <h1 
                  className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                  dangerouslySetInnerHTML={{ __html: title }}
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
                  alt={title}
                  loading="eager"
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
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>
        </article>

        {/* Back to posts */}
        <section className="border-t border-border py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ArrowLeft className="h-4 w-4" />
                View all posts
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPost;
