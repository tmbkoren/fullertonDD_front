export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_name: string;
  stock_quantity: number;
  image_url: string[];
  available: boolean;
  created_at: string;
  updated_at: string;
};

export type User = {
  user?: {
    email: string;
    id: string;
  } | null;
};
