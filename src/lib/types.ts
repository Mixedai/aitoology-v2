// Database types
export interface Tool {
  id: string;
  name: string;
  description?: string;
  category?: string;
  image_url?: string;
  website_url?: string;
  pricing?: string;
  features?: string[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  tool_id: string;
  created_at?: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  tools?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}