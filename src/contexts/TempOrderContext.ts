import { createContext, useContext } from 'react'
import { OrderInfo } from '../interface'

export type OrderContextType = {
    orderInfo: OrderInfo,
    setOrderInfo: (orderInfo: any) => void
}

export const OrderContext = createContext<OrderContextType>({
    orderInfo: {
        userInfo: {
            fullName: '',
            phoneNumber: '',
            address: '',
            country: 'Vietnam',
            postal: '',
        },
        deliverMethod: 'Standard international',
        paymentMethod: 'Pay with Paypal',
        products: [],
        total: 0,
        shipping: 0,
        discount: 0
    },
    setOrderInfo: orderInfo => { }
})
export const userOrder = () => useContext(OrderContext);
