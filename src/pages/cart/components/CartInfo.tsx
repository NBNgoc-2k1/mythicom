import React, { useState } from 'react'
import CustomCheckbox from '../../../global_components/CustomCheckbox'
import IconButton from '../../../global_components/IconButton'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ItemInfo from './ItemInfo'
import { useCart } from '../../../contexts/CartContext'
import { errorSnackbar, successSnackbar } from '../../../services'
import { UpdateData } from '../../../api/CRUD_API'

const CartInfo = (props: any) => {
    const { cartInfo, setCartInfo } = useCart()

    const SelectAllItem = () => {
        const tempSelect = props.cartInfo.map((item: any) => item.id)
        const tempTotalValue = props.cartInfo.reduce((partialSum: any, a: any) => partialSum + a.price * a.quantity, 0);
        setCartInfo({ totalValue: tempTotalValue, selectedItem: tempSelect })
    }

    const EmptyCart = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

        try {
            if (Object.keys(currentUser).length > 0) {
                const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')
                const newUserData = {
                    ...currentUserInfo, "cart": [],
                }
                UpdateData(currentUserInfo.uid, 'users', newUserData, () => { })
                localStorage.setItem('currentUser', JSON.stringify(newUserData))
                window.location.reload()
            }
        } catch (error: any) {
            errorSnackbar('Something went wrong')
        }
    }

    return (
        <div className='bg-light-silver rounded-xl w-full h-fit border border-dark-grey
                lg:w-[70%] xl:w-2/3
                '>
            <div className='flex bg-teal text-white capitalize rounded-t-xl text-2xl p-4 justify-between
                        md:grid grid-cols-2 md:grid-cols-12 
                    '>
                <div className='col-span-1 md:col-span-5'>
                    <CustomCheckbox isChecked={cartInfo.selectedItem.length === props.cartInfo.length} value={`All (${props.cartInfo.length} items)`} onChange={() => {
                        if (cartInfo.selectedItem.length === props.cartInfo.length)
                            setCartInfo({
                                selectedItem: [],
                                totalValue: 0
                            })
                        else SelectAllItem()
                    }} />
                </div>
                <p className='max-md:hidden col-span-2'>price</p>
                <p className='max-md:hidden col-span-2 text-center'>quantity</p>
                <p className='max-md:hidden col-span-2 text-center'>Total</p>
                <IconButton icon={faTrashCan} iconClass='text-white ' className='col-span-1 text-end md:text-center' onClick={EmptyCart} />
            </div>
            <div className='bg-dark-silver rounded-b-xl'>
                {
                    props.cartInfo.map((value: any) => <ItemInfo isChecked={cartInfo.selectedItem.includes(value.id)} data={value} />)
                }
            </div>
        </div>
    )
}

export default CartInfo
