import React, { useState } from 'react'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'
import TextField from '../../../global_components/TextField'
import { useNavigate } from 'react-router-dom';
import SelectedProduct from './SelectedProducts';

const OrderInfo = () => {
    const [voucherCode, setVoucherCode] = useState('')
    const navigation = useNavigate()

    return (
        <div className='bg-brown py-3 max-lg:my-4 lg:ml-4 rounded-xl text-white '>
            <p className='text-4xl text-center bg-gold text-dark-grey capitalize font-bold p-2 my-4'>Order Information</p>
            <div className='p-4'>
                <SelectedProduct />
                <SelectedProduct />
                <SelectedProduct />
                <SelectedProduct />

                <hr className='border-2 border-white my-4' />
                <div className='text-dark-grey xl:flex items-center justify-between'>
                    <TextField placeholder='Voucher code' className='w-full xl:w-3/4 max-sm:!mb-0'
                        value={voucherCode} onChange={(event: any) => setVoucherCode(event.target.value)}
                    />
                    <AppButton content='Apply' className='xl:rounded-xl !bg-dark-grey text-white my-0 max-xl:!w-full' />
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Provisional: <p>{currencyFormatter.format(100)}</p>
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Shipping: <p>{currencyFormatter.format(30)}</p>
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Discount: <p>- {currencyFormatter.format(10)}</p>
                </div>
                <hr className='border-2 border-white my-4' />
                <div className='flex items-center justify-between text-xl font-bold capitalize'>subtotal:
                    <p className='text-4xl text-gold'>{currencyFormatter.format(120)}</p>
                </div>
                <AppButton content='place order' className='uppercase w-full' onClick={() => navigation('/checkout/1')} />
            </div>
        </div>
    )
}

export default OrderInfo
