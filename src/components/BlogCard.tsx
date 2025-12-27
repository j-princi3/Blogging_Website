import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { WordPressPage } from '@/lib/types';

interface BlogCardProps {
    post: WordPressPage;
}

const BlogCard = ({ post }: BlogCardProps) => {
    const title = post.title.rendered.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'");
    const excerpt = (post.excerpt.rendered || post.content.rendered).replace(/<[^>]*>?/gm, '').slice(0, 120) + '...';

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        post.yoast_head_json?.og_image?.[0]?.url ||
        null;

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="group h-full">
            <Link
                href={`/${post.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-md transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
            >
                {featuredImage && (
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Calendar className="h-3.5 w-3.5" />
                            <time dateTime={post.date}>{formattedDate}</time>
                        </div>
                    </div>

                    <h2
                        className="mb-3 font-heading text-2xl font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    <p className="mb-5 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-3">
                        {excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all group-hover:after:w-full">
                            Continue Reading
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default BlogCard;
