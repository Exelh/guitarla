import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'


export const useCart = () => {


    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
      const [data, setData] = useState (db)
      const [cart, setCart] = useState (initialCart)
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
      },[cart])
    
      function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {// existe en el carrito
          const updateCart = [...cart]
          updateCart[itemExists].quantity++
          setCart(updateCart)
          
        } else{
          item.quantity = 1
          setCart([...cart, item])
        }
        saveLocalStorage
      }
      function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        
      }
      function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < 5) {
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
           
      }
    
      function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity ) {
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
           
      }
      
      const isEmpty = useMemo(()=> cart.length === 0, [cart])
      const cartTotal = useMemo(() => cart.reduce ((total, item)=> total + (item.quantity * item.price), 0), [cart])
  return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        setCart,
        isEmpty,
        cartTotal

    }
}


