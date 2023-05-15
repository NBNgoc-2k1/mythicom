import React from 'react'
import SelectedProduct from '../../../../checkout/components/SelectedProducts'
import { currencyFormatter } from '../../../../../services'
import AppButton from '../../../../../global_components/AppButton'
import { useNavigate } from 'react-router-dom'

const OrderSummary = (props: any) => {
    const navigate = useNavigate()
    return (
        <div className='bg-brown max-sm:mx-4 my-8 py-4 rounded-lg'>
            <div className='m-4 cursor-pointer' onClick={() => navigate(`/order/1`)}>
                <SelectedProduct />
                <SelectedProduct />
            </div>
            <hr className='border-2 border-dark-silver my-4' />
            <div className='flex items-center justify-end text-xl text-dark-silver font-bold capitalize'>
                <AppButton content='Buy again' className='!text-base mx-1 sm:mx-6' />
                subtotal:
                <p className='text-xl sm:text-2xl text-gold mx-4'>{currencyFormatter.format(120)}</p>
            </div>
        </div>
    )
}

export default OrderSummary
