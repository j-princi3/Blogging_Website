import DOMPurify from 'dompurify';

/**
 * Content Cleaning Logic:
 * 
 * 1. Remove all <style> tags and their contents
 * 2. Remove all inline style attributes
 * 3. Remove unnecessary CSS classes (WordPress-specific junk classes)
 * 4. Preserve semantic HTML elements (headings, paragraphs, lists, images, links)
 * 5. Clean up empty elements and excessive whitespace
 * 
 * This approach ensures the content is safe (via DOMPurify) and visually clean
 * while maintaining the meaningful structure of the original content.
 */

// WordPress-specific junk classes to remove
const JUNK_CLASS_PATTERNS = [
  /^wp-/,           // WordPress prefixed classes
  /^elementor-/,    // Elementor builder classes
  /^et_/,           // Divi theme classes
  /^fl-/,           // Beaver Builder classes
  /^vc_/,           // Visual Composer classes
  /^fusion-/,       // Avada theme classes
  /^ast-/,          // Astra theme classes
  /^has-/,          // Gutenberg utility classes (some)
  /^is-/,           // State classes
  /^alignwide$/,
  /^alignfull$/,
  /^size-/,
  /^attachment-/,
  /block-/,
];

// Classes to preserve (semantic/meaningful)
const PRESERVED_CLASSES = [
  'blog-content',
];

function removeJunkClasses(element: Element): void {
  const classList = element.classList;
  const classesToRemove: string[] = [];

  classList.forEach((className) => {
    const isJunk = JUNK_CLASS_PATTERNS.some((pattern) => pattern.test(className));
    const isPreserved = PRESERVED_CLASSES.includes(className);
    
    if (isJunk && !isPreserved) {
      classesToRemove.push(className);
    }
  });

  classesToRemove.forEach((className) => classList.remove(className));

  // If no classes remain, remove the class attribute entirely
  if (classList.length === 0) {
    element.removeAttribute('class');
  }
}

function cleanElement(element: Element): void {
  // Remove inline styles
  element.removeAttribute('style');
  
  // Remove data attributes (often contain junk)
  const dataAttrs = Array.from(element.attributes).filter(
    (attr) => attr.name.startsWith('data-')
  );
  dataAttrs.forEach((attr) => element.removeAttribute(attr.name));
  
  // Remove junk classes
  removeJunkClasses(element);
  
  // Recursively clean child elements
  Array.from(element.children).forEach(cleanElement);
}

function removeEmptyElements(container: Element): void {
  const elements = container.querySelectorAll('p, span, div');
  elements.forEach((el) => {
    const text = el.textContent?.trim() || '';
    const hasChildren = el.children.length > 0;
    const hasImages = el.querySelector('img') !== null;
    
    if (!text && !hasChildren && !hasImages) {
      el.remove();
    }
  });
}

export function sanitizeContent(html: string): string {
  if (!html) return '';

  // First pass: DOMPurify for security
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
      'iframe', // For embedded videos
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'title', 'width', 'height',
      'loading', // For lazy loading
      'class', // We'll clean this ourselves
      'id',
      'colspan', 'rowspan',
      'frameborder', 'allowfullscreen', // For iframes
    ],
    FORBID_TAGS: ['style', 'script'],
    FORBID_ATTR: ['style', 'onclick', 'onerror', 'onload'],
  });

  // Second pass: Clean junk classes and attributes
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitized, 'text/html');
  
  // Clean all elements
  Array.from(doc.body.children).forEach(cleanElement);
  
  // Remove empty elements
  removeEmptyElements(doc.body);
  
  // Add lazy loading to images
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    img.setAttribute('loading', 'lazy');
    if (!img.getAttribute('alt')) {
      img.setAttribute('alt', 'Blog image');
    }
  });
  
  // Make external links open in new tab
  const links = doc.querySelectorAll('a[href^="http"]');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  return doc.body.innerHTML;
}

/**
 * Extract plain text from HTML for meta descriptions
 */
export function extractPlainText(html: string, maxLength: number = 160): string {
  if (!html) return '';
  
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || '';
  
  // Clean up whitespace
  const cleaned = text.replace(/\s+/g, ' ').trim();
  
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // Truncate at word boundary
  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Extract the first image URL from HTML content
 */
export function extractFirstImage(html: string): string | null {
  if (!html) return null;
  
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  
  return img?.getAttribute('src') || null;
}
