import React, { useState } from 'react'
import DeliveryInfo from './DeliveryInfo'
import MethodList from './MethodList'
import paypal from '../../../assets/images/checkout/paypal.png'
import visa from '../../../assets/images/checkout/visa.png'
const CheckoutInfo = () => {
    const [deliveryMethod, setDeliveryMethod] = useState('Standard international')
    const [paymentMethod,setPaymentMethod] = useState('Pay with Paypal')

    const deliveryMethods:any = [
        {
            imgSrc: '',
            content: 'Standard international',
        },
    ]
    const paymentMethods:any = [
        {
            imgSrc: paypal,
            content: 'Pay with Paypal',
        },
        {
            imgSrc: visa,
            content: 'Pay with Visa/Master card',
        },
    ]

    return (
        <div className='lg:w-3/5 2xl:pr-[10%]'>
            <DeliveryInfo />
            <MethodList label='delivery method' data={deliveryMethods}
                valueChecked={deliveryMethod} onChange={(e: any) => setDeliveryMethod(e.target.value)} />
            <MethodList label='Payment method' data={paymentMethods}
                valueChecked={paymentMethod} onChange={(e: any) => setPaymentMethod(e.target.value)} />
        </div>
    )
}

export default CheckoutInfo
