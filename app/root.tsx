// root.tsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import UserContext from './util/userContext';
import { withEmotionCache } from '@emotion/react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react';
import { MetaFunction, LinksFunction, LoaderFunctionArgs } from '@vercel/remix'; // Depends on the runtime you choose

import { ServerStyleContext, ClientStyleContext } from './context';
import theme from './util/theme';
import ToasterAlert from './components/ToasterAlert';
import Navbar from './components/Navbar';
import { Product, User } from './util/types';
import Footer from './components/Footer';
import { authenticator } from './services/auth.server';

export const meta: MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: 'Fullerton Deal Depot' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // following line is following docs from chakra-ui
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // this is copied from the chakra-ui docs so I have to disable this check
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang='en'>
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
);

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return { user };
}

export default function App() {
  const { user } = useRouteLoaderData<typeof loader>('root') || {
    user: {} as User,
  };
  const [cart, setCart] = useState<{ Product: Product; quantity: number }[]>(
    []
  );
  type ToasterAlertHandle = {
    showToast: (
      message: string,
      status: 'success' | 'error' | 'info' | 'warning'
    ) => void;
  };
  const toasterRef = useRef<ToasterAlertHandle>(null);

  const addItemToCart = (item: Product) => {
    console.log('adding item to cart', item);
    console.log(cart);
    if (
      cart.some(({ Product: cartItem }) => {
        console.log(cartItem.id, item.id);
        return cartItem.id === item.id;
      })
    ) {
      console.log('item already in cart');
      if (
        item.stock_quantity <=
        // @ts-expect-error we already check for item existence, and quantity can not be undefined
        cart.find((cartItem) => cartItem.Product.id === item.id)?.quantity
      ) {
        toasterRef.current?.showToast(
          "You can't add more than the available stock!",
          'error'
        );
        return;
      }
      if (
        cart.find((cartItem) => cartItem.Product.id === item.id)?.quantity ===
        10
      ) {
        toasterRef.current?.showToast(
          "You can't add more than 10 items!",
          'error'
        );
        return;
      }
      setCart(
        cart.map((cartItem) => {
          if (cartItem.Product.id === item.id) {
            return {
              Product: cartItem.Product,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        })
      );
    } else {
      console.log('item not in cart');
      setCart([...cart, { Product: item, quantity: 1 }]);
    }
    toasterRef.current?.showToast(
      `${item.name} has been added to your cart!`,
      'success'
    );
  };

  const removeItemFromCart = (item: Product) => {
    setCart(cart.filter((cartItem) => cartItem.Product.id !== item.id));
    toasterRef.current?.showToast(
      `${item.name} has been removed from your cart!`,
      'info'
    );
  };

  const setQuantity = (item: Product, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(item);
      return;
    }
    if (quantity > 10 || quantity > item.stock_quantity) {
      toasterRef.current?.showToast(
        "You can't add more than 10 items or more than the available stock!",
        'error'
      );
      return;
    }
    setCart(
      cart.map((cartItem) => {
        if (cartItem.Product.id === item.id) {
          return { Product: cartItem.Product, quantity };
        }
        return cartItem;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    toasterRef.current?.showToast('Your cart has been cleared!', 'info');
  };

  // gets called on first render
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <UserContext.Provider
          value={{
            user,
            cart,
            addItemToCart,
            removeItemFromCart,
            clearCart,
            setQuantity,
          }}
        >
          <Navbar />
          <Box
            p={3}
            pb={300}
            as="main"
            minH={"100%"}
            maxW="1500px" // Set max width for consistent centering
            mx="auto"     // Center the Box horizontally
          >
            <Outlet />
          </Box>
          <ToasterAlert ref={toasterRef} />
          <Footer />
        </UserContext.Provider>
      </ChakraProvider>
    </Document>
  );
}
