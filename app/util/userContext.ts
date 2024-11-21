/* eslint-disable @typescript-eslint/no-unused-vars */
// addItemToCart and removeItemFromCart are just boilerplate functions for creating context
// they are not supposed to use item here, so I have to disable the eslint rule
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