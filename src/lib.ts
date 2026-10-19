import fs from 'node:fs';
import path from 'node:path';
import credits from '../public/img/photos/credits.json';

// Prefix a path with the site base so links work on GitHub Pages subpaths.
export const url = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

// Tiny inline formatter for content strings: **bold**, `code`, [text](href).
export function md(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, t, h) => {
      const ext = /^https?:/.test(h);
      return `<a href="${ext ? h : url(h)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
    });
}

// Attribution for third-party photos (public/img/photos/credits.json).
export const creditFor = (src: string) => (credits as Record<string, string>)[path.basename(src)];

// Photos dropped into public/img/photo-library/. A file named "<slug>-anything.jpg"
// attaches to that project or experience page; everything shows on the home page.
const LIB = 'public/img/photo-library';
export function libraryPhotos(prefix?: string): { src: string; caption: string }[] {
  if (!fs.existsSync(LIB)) return [];
  return fs
    .readdirSync(LIB)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .filter((f) => !prefix || f.toLowerCase().startsWith(prefix.toLowerCase() + '-'))
    .sort()
    .map((f) => ({
      src: `img/photo-library/${f}`,
      caption: f
        .replace(/\.[^.]+$/, '')
        .replace(prefix ? new RegExp(`^${prefix}-`, 'i') : /^$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
}

export const hasFile = (p: string) => fs.existsSync(path.join('public', p));
