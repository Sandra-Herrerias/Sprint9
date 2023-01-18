
import { ProductCounter } from "./product-counter";
import { User } from "./user";

export interface Order {
    id: number
    cart: Array<ProductCounter>;
    user: User;
}
