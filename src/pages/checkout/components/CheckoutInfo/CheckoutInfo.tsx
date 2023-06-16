import React, { useEffect, useState } from 'react'
import DeliveryInfo from './components/DeliveryInfo'
import MethodList from './components/MethodList'
import paypal from '../../../../assets/images/checkout/paypal.png'
import visa from '../../../../assets/images/checkout/visa.png'
import { userOrder } from '../../../../contexts/TempOrderContext'
const CheckoutInfo = () => {
    const [deliveryMethod, setDeliveryMethod] = useState('Standard international')
    const [paymentMethod, setPaymentMethod] = useState('Pay with Paypal')
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') || '{}')
    const {setOrderInfo} = userOrder()

    const deliveryMethods: any = [
        {
            imgSrc: '',
            content: 'Standard international',
        },
    ]
    const paymentMethods: any = [
        {
            imgSrc: paypal,
            content: 'Pay with Paypal',
        },
        {
            imgSrc: visa,
            content: 'Pay with Visa/Master card',
        },
    ]

    useEffect(() => {
    }, [paymentMethod])

    return (
        <div className='lg:w-3/5 2xl:pr-[10%]'>
            <DeliveryInfo />
            <MethodList label='delivery method' data={deliveryMethods}
                valueChecked={deliveryMethod} onChange={(e: any) => {
                    setDeliveryMethod(e.target.value)
                    const newOrderInfo = {
                        ...orderInfo,
                        deliveryMethod:e.target.value

                    }
                    sessionStorage.setItem('orderInfo', JSON.stringify(newOrderInfo))
                    setOrderInfo(newOrderInfo)
                }} />
            <MethodList label='Payment method' data={paymentMethods}
                valueChecked={paymentMethod} onChange={(e: any) => {
                    setPaymentMethod(e.target.value)
                    const newOrderInfo = {
                        ...orderInfo,
                        paymentMethod:e.target.value
                    }
                    sessionStorage.setItem('orderInfo', JSON.stringify(newOrderInfo))
                    setOrderInfo(newOrderInfo)
                }} />
        </div>
    )
}

export default CheckoutInfo
