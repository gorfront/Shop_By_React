export interface ProductItem {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  newPrice: number;
  image: string;
  rating: { rate: number; count: number };
  discount: number;
  cart: CartItem;
}

export interface CurrentProduct
  extends Pick<
    ProductItem,
    "id" | "image" | "newPrice" | "price" | "rating" | "title" | "description"
  > {}

export interface Category {
  id: string;
  name: string;
  active?: boolean;
}

export interface User {
  id: string;
  city: string;
  zipcode: string;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  cart: CartItem[];
}

export interface CartItem {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  newPrice: number;
  image: string;
  rating: { rate: number; count: number };
  count: number;
}
