
export interface Room {
  image_url: any;
  id: number;
  title: string;
  image: string;
  price: number;
  capacity: number;
  size: number;
  bedType: string;
  amenities: string[];
  description?: string;
  images?: string[];
  features?: string;
  policies?: string;
}
