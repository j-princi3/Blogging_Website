import * as cheerio from 'cheerio';

export function cleanContent(html: string): string {
    if (!html) return '';

    const $ = cheerio.load(html);

    // 1. Remove <style> tags
    $('style').remove();
    $('script').remove();

    // 2. Remove inline style attributes
    $('*').removeAttr('style');

    // 3. Remove junk classes, but keep semantic alignment if needed
    // Original stripped almost everything except 'blog-content'.
    // We can just strip 'class' entirely to be safe and let globals.css handle it
    // or use a blocklist. Stripping all is often cleaner for WP migrations.
    $('*').removeAttr('class');

    // 4. Clean up empty elements
    $('p, span, div').each((_, el) => {
        const $el = $(el);
        if (!$el.text().trim() && $el.children().length === 0 && $el.find('img').length === 0) {
            $el.remove();
        }
    });

    // 5. Enhance Images (Lazy loading)
    $('img').each((_, el) => {
        $(el).attr('loading', 'lazy');
        // Ensure images are responsive within the container
        // The original CSS handles: .blog-content img { @apply rounded-lg my-6 w-full h-auto; }
    });

    // 6. External links
    $('a[href^="http"]').each((_, el) => {
        $(el).attr('target', '_blank');
        $(el).attr('rel', 'noopener noreferrer');
    });

    // Return the body content
    return $('body').html() || '';
}
