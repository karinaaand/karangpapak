export type Berita = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail: string | null;
  thumbnail_url?: string | null;
  published_at: string | null;
  is_published: boolean;
};