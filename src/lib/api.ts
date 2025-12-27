import { WordPressPage } from './types';

const API_BASE = 'https://campusify.io/wp-json/wp/v2';

export async function fetchPages(): Promise<WordPressPage[]> {
    try {
        const fields = 'id,date,slug,title,excerpt,content,yoast_head_json,_links,_embedded';
        const response = await fetch(`${API_BASE}/pages?per_page=100&_embed&_fields=${fields}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch pages: ${response.status}`);
        }

        const pages = await response.json();

        // Filter out pages without meaningful content
        return pages.filter((page: WordPressPage) =>
            page.content.rendered &&
            page.content.rendered.length > 100 &&
            page.status === 'publish'
        );
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}

export async function fetchPosts(): Promise<WordPressPage[]> {
    try {
        const fields = 'id,date,slug,title,excerpt,content,yoast_head_json,_links,_embedded';
        const response = await fetch(`${API_BASE}/posts?per_page=100&_embed&_fields=${fields}`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function fetchContentBySlug(slug: string): Promise<WordPressPage | null> {
    try {
        // Parallel fetch attempts (optimization could be done if we knew type)
        const [pageRes, postRes] = await Promise.all([
            fetch(`${API_BASE}/pages?slug=${encodeURIComponent(slug)}&_embed`, { next: { revalidate: 3600 } }),
            fetch(`${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`, { next: { revalidate: 3600 } }),
        ]);

        const pages = await pageRes.json();
        if (pages.length > 0) return pages[0];

        const posts = await postRes.json();
        if (posts.length > 0) return posts[0];

        return null;
    } catch (error) {
        console.error('Error fetching content by slug:', error);
        return null;
    }
}

export async function fetchAllContent(): Promise<WordPressPage[]> {
    const [pages, posts] = await Promise.all([fetchPages(), fetchPosts()]);
    return [...pages, ...posts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
