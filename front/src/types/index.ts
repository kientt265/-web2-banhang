  export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    address?: string;
    role: 'user' | 'admin';
  }
  
  export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category_id?: number;
    image_url?: string;
    status: 'active' | 'inactive' | 'out_of_stock';
    created_at: string;
    updated_at: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    description?: string;
    parent_id?: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
  }
  
  export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    image_url?: string;
  }
  
  export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    name: string;
    image_url?: string;
  }
  
  export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment?: string;
    created_at: string;
    updated_at: string;
    username: string;
  }
  
  export interface WishlistItem {
    id: number;
    user_id: number;
    product_id: number;
    name: string;
    price: number;
    image_url?: string;
    status: 'active' | 'inactive' | 'out_of_stock';
  }