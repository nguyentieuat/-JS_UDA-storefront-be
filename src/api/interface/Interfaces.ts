export interface UserType {
  firstname: string;
  lastname: string;
  password: string;
}
export interface UserReturnType {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
}
export interface UserCreatedReturnType {
  auth: null | boolean;
  name: string;
  token: string;
}

export interface ProductType {
  name: string;
  price: string;
  category: string;
}
export interface ProductReturnType {
  id: number;
  name: string;
  price: string;
  category: string;
}
export interface OrderType {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
}
export interface OrderReturnType {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
}
