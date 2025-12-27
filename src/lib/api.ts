export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

const API_BASE = 'https://campusify.io/wp-json/wp/v2';

// Helper function with timeout - reduced to 8s for faster error feedback
async function fetchWithTimeout(url: string, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function fetchPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/pages?per_page=100&_embed`);

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
    throw error;
  }
}

export async function fetchPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/pages?slug=${encodeURIComponent(slug)}&_embed`);

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const pages = await response.json();
    
    if (pages.length === 0) {
      return null;
    }

    return pages[0];
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
}

export async function fetchPosts(): Promise<WordPressPage[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/posts?per_page=100&_embed`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetchWithTimeout(`${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const posts = await response.json();
    
    if (posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

// Combined fetch for both pages and posts
export async function fetchAllContent(): Promise<WordPressPage[]> {
  try {
    const [pages, posts] = await Promise.all([
      fetchPages(),
      fetchPosts(),
    ]);
    
    return [...pages, ...posts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching all content:', error);
    throw error;
  }
}

export async function fetchContentBySlug(slug: string): Promise<WordPressPage | null> {
  // Try pages first, then posts
  let content = await fetchPageBySlug(slug);
  
  if (!content) {
    content = await fetchPostBySlug(slug);
  }
  
  return content;
}
