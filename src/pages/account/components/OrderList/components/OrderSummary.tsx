import React, { useEffect, useState } from 'react'
import SelectedProduct from '../../../../checkout/components/PriceSummary/components/SelectedProducts'
import { currencyFormatter } from '../../../../../services'
import AppButton from '../../../../../global_components/AppButton'
import { useNavigate } from 'react-router-dom'
import { AddToCart } from '../../../../../globalFunctions'

const OrderSummary = (props: any) => {
    const navigate = useNavigate()
    
    const BuyAgain = () => {
        props.data.products.map((product:any) => {
            const productInfo = {
                ...product,
                quantity: 1
            }
            AddToCart(productInfo)
        }) 
    }

    return (
        <div className='bg-brown max-sm:mx-4 my-8 py-4 rounded-lg'>
            <div className='m-4 cursor-pointer' onClick={() => navigate(`/order/${props.data.id}`)}>
                {
                    Object.keys(props.data).length > 0 && props.data.products.map((product:any) => <SelectedProduct data={product} />)
                }
            </div>
            <hr className='border-2 border-dark-silver my-4' />
            <div className='flex items-center justify-end text-xl text-dark-silver font-bold capitalize'>
                <AppButton content='Buy Again' className='!text-base mx-1 sm:mx-6' onClick={BuyAgain} />
                subtotal:
                <p className='text-xl sm:text-2xl text-gold mx-4'>{currencyFormatter.format(props.data.total)}</p>
            </div>
        </div>
    )
}

export default OrderSummary
