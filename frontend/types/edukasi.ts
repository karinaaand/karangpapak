export type Edukasi = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string;
  thumbnail: File | string | null;
  thumbnail_url?: string | null;
  is_published: boolean;
};