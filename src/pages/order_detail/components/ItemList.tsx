import React from 'react'
import Item from './Item'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'
import { AddToCart } from '../../../globalFunctions'

const ItemList = (props: any) => {
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
        <div className='rounded-xl w-full border-collapse lg:table overflow-hidden table-auto'>
            <div className='hidden lg:table-header-group'>
                <div className='table-row bg-teal text-white capitalize rounded-t-xl text-2xl'>
                    <p className='table-cell p-4'>
                        Product
                    </p>
                    <p className='table-cell p-4'>
                        price</p>
                    <p className='table-cell p-4'>
                        quantity</p>
                    <p className='table-cell p-4'>
                        Discount</p>
                    <p className='table-cell p-4'>
                        Provisional</p>
                </div>
            </div>
            <div className='w-full lg:hidden bg-teal text-white capitalize rounded-t-xl text-2xl p-4'>
                Order Information
            </div>
            <div className='lg:table-row-group'>
                {
                    props.data.products.map((product: any) => <Item data={product} />)
                }
            </div>
            <div className='lg:table-row-group bg-brown p-4'>
                <div className='md:max-lg:flex justify-between lg:hidden'>
                    <div className='md:max-lg:w-2/5 text-base lg:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                        <p className='uppercase text-xl'>delivery method</p>
                        {props.data.deliverMethod}

                    </div>
                    <div className='md:max-lg:w-2/5 text-base lg:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                        <p className='uppercase text-xl'>payment method</p>
                        {props.data.paymentMethod}
                    </div>
                </div>
                <div className='flex items-center justify-between lg:table-row text-white font-bold capitalize'>
                    <td colSpan={4} className='text-right text-xl lg:pt-2 lg:px-4'>
                        Provisional:</td>
                    <p className='mx-4 table-cell text-right lg:px-4' >{currencyFormatter.format(props.data.total)}</p>
                </div>
                <div className='flex items-center justify-between lg:table-row text-white font-bold capitalize'>
                    <td colSpan={4} className='text-right text-xl lg:pt-2 lg:px-4'>
                        Shipping:</td>
                    <p className='mx-4 table-cell text-right lg:px-4' >{currencyFormatter.format(props.data.shipping)}</p>
                </div>
                <div className='flex items-center justify-between lg:table-row text-white font-bold capitalize'>
                    <td colSpan={4} className='text-right text-xl lg:pt-2 lg:px-4'>
                        Discount:</td>
                    <p className='mx-4 table-cell text-right lg:px-4' >{currencyFormatter.format(props.data.discount)}</p>
                </div>
                <div className='flex items-center justify-between lg:table-row text-xl text-white font-bold capitalize '>
                    <td colSpan={4} className='text-right lg:px-4 py-2'>
                        subtotal:</td>
                    <p className='text-2xl text-gold mx-4 table-cell text-right lg:px-4'>{currencyFormatter.format(
                        parseFloat(props.data.total) + parseFloat(props.data.shipping) - parseFloat(props.data.discount)
                    )}</p>
                </div>
                <AppButton content='Buy again' className='lg:hidden w-full text-white' onClick={BuyAgain}  />
            </div>
        </div>
    )
}

export default ItemList
