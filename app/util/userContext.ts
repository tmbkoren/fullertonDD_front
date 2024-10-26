import { createContext } from "react";
import { Product } from "./types";

const UserContext = createContext({
    user: null,
    cart: [] as Product[],
    addItemToCart: (item: Product) => {},
    removeItemFromCart: (item: Product) => {},
    clearCart: () => {},
});

export default UserContext;