import React, { useEffect, useState } from 'react'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'
import TextField from '../../../global_components/TextField'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';

const CartPriceSummary = (props: any) => {
    const [voucherCode, setVoucherCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const navigation = useNavigate()
    const { cartInfo } = useCart()
    const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')

    return (
        <div className='lg:w-[30%] xl:w-1/3 bg-brown py-3 max-lg:my-4 lg:ml-4 rounded-xl text-white'>
            <p className='text-2xl xl:text-4xl text-center bg-gold text-dark-grey capitalize font-bold py-2 my-4'>Order Information</p>
            <div className='p-8 lg:p-4'>
                <div className='text-dark-grey 2xl:flex items-center justify-between'>
                    <TextField placeholder='Voucher code' className='w-full 2xl:w-3/4 max-sm:mb-0'
                        value={voucherCode} onChange={(event: any) => setVoucherCode(event.target.value)}
                    />
                    <AppButton content='Apply' className='2xl:rounded-xl !bg-dark-grey text-white my-0 max-2xl:!w-full' />
                </div>
                <div className='flex justify-between lg:max-xl:text-normal text-xl first-letter:uppercase'>
                    Provisional: <p>{currencyFormatter.format(cartInfo.totalValue)}</p>
                </div>
                <div className='flex justify-between lg:max-xl:text-normal text-xl first-letter:uppercase'>
                    Discount: <p>- {currencyFormatter.format(discount)}</p>
                </div>
                <hr className='border border-white my-4' />
                <div className='flex items-center justify-between text-xl font-bold capitalize'>subtotal:
                    <p className='lg:max-xl:text-xl text-4xl text-gold'>{currencyFormatter.format(cartInfo.totalValue - discount)}</p>
                </div>
                <ul className='list-disc p-4'>
                    <li >
                        Shipping fee will be calculated at check out page.
                    </li>
                    <li>
                        You can also add other vouchers at check out page.
                    </li>
                </ul>
                <AppButton content='check out' disabled={cartInfo.selectedItem.length <= 0}
                    title='Select product'
                    className='uppercase w-full' onClick={() => {
                        navigation('/checkout')
                        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') || '{}')
                        const selectedItems = currentUserInfo.cart.filter((item: any) => cartInfo.selectedItem.includes(item.id))
                        const newOrderInfo = {
                            ...orderInfo,
                            products: selectedItems,
                            total: cartInfo.totalValue
                        }
                        sessionStorage.setItem('orderInfo', JSON.stringify(newOrderInfo))
                    }} />
                <p className={` ${cartInfo.selectedItem.length > 0 && 'hidden'} 
            lg:hidden text-sm text-green text-center`}>
                    Select product to enable this button</p>

            </div>

        </div>
    )
}

export default CartPriceSummary
