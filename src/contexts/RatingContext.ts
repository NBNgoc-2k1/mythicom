import { createContext, useContext } from 'react'
import { CartInfo } from '../interface'

export type CartContextType = {
    cartInfo: CartInfo
    setCartInfo: (cartInfo: any) => void
}

export const CartContext = createContext<CartContextType>({
    cartInfo: {
        selectedItem: [],
        totalValue: 0
    },
    setCartInfo: cartInfo => { }
})
export const useCart = () => useContext(CartContext);