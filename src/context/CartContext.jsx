import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity: quantity }];
        });
    };


    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== productId));
    };

    const updateQuantity = (id, qty) => {
        setCartItems(cartItems.map((item) => item.id === id ? { ...item, quantity: qty } : item));
    }
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);
