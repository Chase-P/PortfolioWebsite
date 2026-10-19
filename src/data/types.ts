export type VizKind = 'agents' | 'cli' | 'pid' | 'fusion' | 'pursuit' | 'combat' | 'chess';

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'img'; src: string; caption?: string }
  | { t: 'gallery'; items: { src: string; caption?: string }[] }
  | { t: 'code'; lang?: string; text: string; caption?: string }
  | { t: 'formula'; text: string; caption?: string }
  | { t: 'stats'; items: { v: string; l: string }[] }
  | { t: 'viz'; kind: VizKind; caption?: string }
  | { t: 'flow'; steps: { title: string; sub?: string }[]; caption?: string }
  | { t: 'steps'; items: { title: string; body: string }[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'note'; text: string }
  | { t: 'terminal'; title?: string; lines: { k?: 'cmd' | 'out' | 'add' | 'del' | 'ok' | 'warn' | 'dim'; text: string }[]; caption?: string }
  | { t: 'pipeline'; stages: { name: string; status: 'ok' | 'fail' | 'fixed'; note?: string }[]; caption?: string }
  | { t: 'cards'; items: { title: string; body: string; tag?: string }[] }
  | { t: 'quote'; text: string };

export type SubPage = {
  slug: string;
  title: string;
  summary: string;
  blocks: Block[];
};

export type Entry = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role?: string;
  status?: string;
  stack: string[];
  cover?: string; // image path under public/
  viz?: VizKind; // generated illustration when there is no screenshot
  featured?: boolean;
  metrics?: { v: string; l: string }[];
  links?: { label: string; href: string }[];
  intro: string[];
  overview?: Block[];
  pages: SubPage[];
};
