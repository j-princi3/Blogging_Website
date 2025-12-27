import { useQuery } from '@tanstack/react-query';
import { fetchAllContent, fetchContentBySlug, WordPressPage } from '@/lib/api';

export function useBlogPosts() {
  return useQuery<WordPressPage[], Error>({
    queryKey: ['blogPosts'],
    queryFn: fetchAllContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 500,
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery<WordPressPage | null, Error>({
    queryKey: ['blogPost', slug],
    queryFn: () => slug ? fetchContentBySlug(slug) : Promise.resolve(null),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 500,
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });
}
