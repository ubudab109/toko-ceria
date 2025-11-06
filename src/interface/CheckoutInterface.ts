import { OrderStatus } from "../types/order";
import { CustomerI } from "./CustomerInterface";
import { ProductOrderI } from "./OrderInterface";

export interface CheckoutDataI {
  order_number: string;
  total: number;
  products: ProductOrderI[];
  customer: CustomerI;
  status: OrderStatus;
}