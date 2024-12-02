/* eslint-disable @typescript-eslint/no-unused-vars */
// addItemToCart and removeItemFromCart are just boilerplate functions for creating context
// they are not supposed to use item here, so I have to disable the eslint rule
import { createContext } from 'react';
import { Product, User } from './types';

const UserContext = createContext({
  user: {} as User | null,
  cart: [] as {Product : Product, quantity: number}[],
  addItemToCart: (item: Product) => {},
  removeItemFromCart: (item: Product) => {},
  setQuantity: (item: Product, quantity: number) => {},
  clearCart: () => {},
});

export default UserContext;
