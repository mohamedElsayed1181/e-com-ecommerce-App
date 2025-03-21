import { TProduct } from "./product";
export type TOrederItem = {
  id: number;
  // userId?: number;
  items: TProduct[];
  subtotal: number;
};
