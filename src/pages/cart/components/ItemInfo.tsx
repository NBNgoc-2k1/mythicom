import React, { useEffect, useState } from 'react'
import IconButton from '../../../global_components/IconButton'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CustomCheckbox from '../../../global_components/CustomCheckbox'
import QuantityAdjust from '../../../global_components/QuantityAdjust'
import { currencyFormatter, successSnackbar } from '../../../services'
import { UpdateQuantity } from '../../../globalFunctions'
import { GetSingleData, UpdateData } from '../../../api/CRUD_API'
import { useCart } from '../../../contexts/CartContext'

const ItemInfo = (props: any) => {
    const [quantity, setQuantity] = useState(props.data.quantity);
    const [inventory, setInventory] = useState(0);
    const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')
    const { cartInfo, setCartInfo } = useCart()

    const ToggleItem = () => {
        const isExist = cartInfo.selectedItem.includes(props.data.id)

        if (!isExist)
            setCartInfo({
                selectedItem: [...cartInfo.selectedItem, props.data.id],
                totalValue: cartInfo.totalValue + props.data.price * quantity
            })
        else setCartInfo({
            selectedItem: cartInfo.selectedItem.filter((item: any) => item !== props.data.id),
            totalValue: cartInfo.totalValue - props.data.price * quantity
        });
    }

    const RemoveFromCart = () => {
        const newCart = currentUserInfo.cart.filter((item: any) => item.id !== props.data.id)
        const newUserData = {
            ...currentUserInfo, "cart": newCart,
        }
        UpdateData(currentUserInfo.uid, 'users', newUserData, () => { })
        localStorage.setItem('currentUser', JSON.stringify(newUserData))
        successSnackbar('Remove item from cart')
        window.location.reload()
    }

    useEffect(() => {
        GetSingleData('products', props.data.id).then((value: any) => setInventory(value.inventory))
    }, [])

    const AdjustQuantity = (value: number) => {
        const adjustedQuantity = value - quantity
        setQuantity(value)
        const newData = {
            ...props.data,
            quantity: value
        }
        UpdateQuantity(newData)
        if (cartInfo.selectedItem.includes(props.data.id))
            setCartInfo({ ...cartInfo, totalValue: cartInfo.totalValue + adjustedQuantity * props.data.price })
    }

    return (
        <>
            <div className='max-md:hidden grid text-lg xl:text-2xl grid-cols-12 justify-between
            border-t border-dark-grey first:border-none py-6 mx-4'>
                <div className='flex items-center col-span-5'>
                    <CustomCheckbox isChecked={cartInfo.selectedItem.includes(props.data.id)} onChange={ToggleItem} />
                    <div className='flex items-start'>
                        <img src={props.data.img}
                            className='w-20 h-20'
                        />
                        <a href={`/product/${props.data.id}`}
                            className='mx-4 text-base line-clamp-2 hover:text-brown'>{props.data.name}</a>
                    </div>
                </div>
                <p className='lg:max-xl:text-base col-span-2'>{currencyFormatter.format(props.data.price)}</p>
                <div className='col-span-2 text-center'>
                    <QuantityAdjust initValue={quantity} inventory={inventory} onChange={AdjustQuantity}
                    />
                    <p className={`${(inventory >= 10 || inventory <= 0) && 'hidden'} text-base text-red`}>Only {inventory} items</p>
                </div>
                <p className='text-brown font-semibold max-md:hidden lg:max-xl:text-base col-span-2 text-center truncate'>
                    {currencyFormatter.format(props.data.price * quantity)}</p>
                <IconButton icon={faTrashCan} iconClass='text-dark-grey' className='col-span-1 text-center' onClick={RemoveFromCart} />
            </div>
            <div className='flex md:hidden items-center
            border-b border-dark-grey last:border-none py-6 mx-4'>
                <CustomCheckbox isChecked={cartInfo.selectedItem.includes(props.data.id)} onChange={ToggleItem} />
                <img src={props.data.img}
                    className='sm:max-md:w-32 sm:max-md:h-32 w-20 h-20'
                />
                <div className='ml-4'>
                    <a className='mr-4 sm:text-lg line-clamp-2' href={`/product/${props.data.id}`}>
                        {props.data.name}</a>
                    <p className='text-xl sm:text-2xl font-semibold text-brown'>{currencyFormatter.format(props.data.price)}</p>
                    <QuantityAdjust initValue={quantity} inventory={8} onChange={AdjustQuantity}
                        className='w-3/5 sm:w-2/5 h-8'
                    />
                </div>
                <IconButton icon={faTrashCan} iconClass='text-2xl text-dark-grey' className='text-center' onClick={RemoveFromCart} />
            </div>
        </>
    )
}

export default ItemInfo
