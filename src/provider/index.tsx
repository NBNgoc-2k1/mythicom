import React, { useState } from 'react'
import { AuthContext, AuthState } from '../contexts/AuthContext'
import { FilterContext } from '../contexts/FilterContext'
import { CartContext } from '../contexts/CartContext'
import { OrderContext } from '../contexts/TempOrderContext'

const index = (props: any) => {
    const [authPopup, setAuthPopup] = useState({ open: false, authState: AuthState.login })
    const [filterValue, setFilterValue] = useState({
        selectedValue: {
            category: [],
            material: [],
            origin: [],
            author: [],
            language: []
        },
        rangePrice: {
            minPrice: 0,
            maxPrice: 0
        }
    })
    const [cartInfo, setCartInfo] = useState({
        selectedItem: [],
        totalValue: 0
    })
    const [orderInfo, setOrderInfo] = useState({
        customerInfo: {
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
    })

    return (
        <AuthContext.Provider value={{ authPopup, setAuthPopup }} >
            <FilterContext.Provider value={{ filterValue, setFilterValue }} >
                <CartContext.Provider value={{ cartInfo, setCartInfo }}>
                    <OrderContext.Provider value={{orderInfo, setOrderInfo}}>
                        {props.children}
                    </OrderContext.Provider>
                </CartContext.Provider>
            </FilterContext.Provider>
        </AuthContext.Provider>
    )
}

export default index
