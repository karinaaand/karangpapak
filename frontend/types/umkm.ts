export type Umkm = {
  id: number;
  name: string;
  slug: string;
  owner_name: string | null;
  category: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  image: string | null;
  image_url?: string | null;
  maps_embed?: string | null;
  is_featured: boolean;
  is_published: boolean;
};
