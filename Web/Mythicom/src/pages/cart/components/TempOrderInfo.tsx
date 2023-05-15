import React, { useState } from 'react'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'
import TextField from '../../../global_components/TextField'
import { useNavigate } from 'react-router-dom';

const TempOrderInfo = () => {
    const [voucherCode, setVoucherCode] = useState('')
    const navigation = useNavigate()

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
                    Provisional: <p>{currencyFormatter.format(100)}</p>
                </div>
                <div className='flex justify-between lg:max-xl:text-normal text-xl first-letter:uppercase'>
                    Discount: <p>- {currencyFormatter.format(10)}</p>
                </div>
                <hr className='border border-white my-4' />
                <div className='flex items-center justify-between text-xl font-bold capitalize'>subtotal:
                    <p className='lg:max-xl:text-xl text-4xl text-gold'>{currencyFormatter.format(90)}</p>
                </div>
                <ul className='list-disc p-4'>
                    <li >
                        Shipping fee will be calculated at check out page.
                    </li>
                    <li>
                        You can also add other vouchers at check out page.
                    </li>
                </ul>
                <AppButton content='check out' className='uppercase w-full' onClick={() => navigation('/checkout')} />
            </div>
            
        </div>
    )
}

export default TempOrderInfo
