import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);
// This creates a context object that will be used to share state across your component tree.


//This StoreContextProvider component uses the Context API to share state and functions related to cart management, food list fetching, and token handling across the application. The props.children property allows any nested components to access and use this shared state and functions.This is a functional component that will wrap the application (or parts of it) where the context values (state and functions) will be shared. Any components nested inside this provider (through props.children) will have access to the context values.

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };
  //Local State Update: It first updates the cartItems state on the client side, so the changes are immediately reflected in the user interface.
// Server Update: It then sends the updated cart information to the backend via a POST request, provided the user is authenticated with a token. This keeps the server in sync with the client’s cart.

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 1) - 1;
      if (newCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };
    loadData();
  }, []);


 //This object contains all the state variables and functions that will be shared via the context.
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken
  };

 //This wraps props.children (nested components) with the StoreContext.Provider, making the context value available to any components within this provider.
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
      {/* props.children is a special property in React that represents the child elements passed to a component. It allows you to nest components or elements within another component. */}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
