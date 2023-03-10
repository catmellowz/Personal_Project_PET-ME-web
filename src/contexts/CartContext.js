import { toast } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import * as cartApi from '../apis/cart-api';
import * as pyApi from '../apis/payment-api';

import useAuth from '../hooks/useAuth';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [countCart, setCountCart] = useState(0);
  const [order, setOrder] = useState([]);
  const [orderAdmin, setOrderAdmin] = useState([]);
  const { authenticatedUser } = useAuth();

  const addCart = async (serviceId) => {
    // setCountCart(countCart + 1);
    await cartApi.createCart({ serviceId });
    //get service from cart
    const res = await cartApi.amountCart();
    setCountCart(res.data.amount);
    toast.success('item added to cart');

    // console.log(res);
  };
  const fetchAmountCart = async () => {
    try {
      const res = await cartApi.amountCart();
      setCountCart(res.data.amount);
    } catch (err) {}
  };
  useEffect(() => {
    fetchAmountCart();
  }, [authenticatedUser]);

  const [amountCartItem, setAmountCartItem] = useState([]);
  const fetchCartItem = async () => {
    try {
      const res = await cartApi.cartItem();
      setAmountCartItem(res.data.serviceInCart);
      // console.log(res);
    } catch (err) {}
  };

  const sumAmount = () => {
    const sum = amountCartItem.reduce((sum, value) => {
      return +value.Service.price * +value.total_amount + sum;
    }, 0);
    return sum;
  };

  const deleteCart = async (cartId) => {
    try {
      const res = await cartApi.deleteItem(cartId);
      // console.log(res.data);
    } catch (err) {}
    await fetchCartItem();
    await fetchAmountCart();
    toast.error('item deleted');
  };

  const fetchOrder = async () => {
    try {
      const res = await pyApi.getOrderHistory();
      setOrder(res.data);
    } catch (err) {}
  };

  const fetchOrderAdmin = async () => {
    try {
      const res = await pyApi.orderAdmin();
      setOrderAdmin(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchOrderAdmin();
  }, []);

  //modified date get createdAt modified creadtedAt then locale
  const date = (createdAt) => {
    const modifiedDate = new Date(createdAt);
    // console.log(createdAt);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return modifiedDate.toLocaleDateString('en-US', options);
  };

  return (
    <CartContext.Provider
      value={{
        countCart,
        addCart,
        amountCartItem,
        fetchCartItem,
        sumAmount,
        deleteCart,
        order,
        fetchOrder,
        date,
        orderAdmin,
        fetchOrderAdmin,
        fetchAmountCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
