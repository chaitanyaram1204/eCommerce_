import React, { createContext, useEffect, useState } from 'react';
// import p34_img from "../Components/Assets/product_34.png";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItem, setCartItem] = useState(getDefaultCart());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/allproducts")
            .then((res) => res.json())
            .then((data) => {
                setAllProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
                setError(error);
                setLoading(false);
            });
    }, []); // Empty dependency array to run only once after initial render

    const addToCart = (id) => {
        setCartItem((prev) => ({
            ...prev, [id]: prev[id] + 1
        }));
        if (localStorage.getItem('token')) {
            fetch('http://localhost:5000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ id: id })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log("Error adding to cart:", error);
                });
        }
    };

    const removeFromCart = (id) => {
        setCartItem((prev) => {
            return { ...prev, [id]: prev[id] - 1 };
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const product = all_product.find((e) => e.id === parseInt(item));
                if (product) {
                    totalAmount += product.new_price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0)
                totalItem += cartItem[item];
        }
        return totalItem;
    };

    const contextValue = { all_product, getTotalCartItems, getTotalCartAmount, cartItem, addToCart, removeFromCart };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
