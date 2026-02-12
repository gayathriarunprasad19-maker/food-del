import { createContext, useState } from "react";
import { food_list as foodData, menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

  // ✅ BACKEND BASE URL (REQUIRED FOR LOGIN/SIGNUP)
  const url = "https://food-del-backend-0w4i.onrender.com"

  // ✅ STATIC FOOD DATA
  const [food_list] = useState(foodData);

  // ✅ AUTH STATE
  const [token, setToken] = useState("");

  // ✅ CART STATE
  const [cartItems, setCartItems] = useState({});

  const currency = "₹";
  const deliveryCharge = 50;

  // ✅ ADD TO CART
  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      return updated;
    });
  };

  // ✅ TOTAL AMOUNT
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = food_list.find(item => item._id === itemId);
      if (product) {
        total += product.price * cartItems[itemId];
      }
    }
    return total;
  };

  // ✅ REQUIRED BY LoginPopup (even if empty for now)
  const loadCartData = () => {};

  const contextValue = {
    url,                 // ✅ FIXED
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,               // ✅ FIXED
    setToken,            // ✅ FIXED
    loadCartData,        // ✅ FIXED
    currency,
    deliveryCharge
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
