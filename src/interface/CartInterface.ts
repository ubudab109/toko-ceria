import { ProductI } from "./ProductInterface";

export interface CartI extends ProductI {
  quantity: number;
  totalPrice: number;
}