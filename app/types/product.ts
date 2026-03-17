export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description?: string | null; 
  category?: string;           
}