import React, { useEffect, useState } from 'react'
import { currencyFormatter, errorSnackbar, successSnackbar } from '../../../../services'
import AppButton from '../../../../global_components/AppButton'
import TextField from '../../../../global_components/TextField'
import { useNavigate } from 'react-router-dom';
import SelectedProduct from './components/SelectedProducts';
import { AddNewData, UpdateData } from '../../../../api/CRUD_API';
import { userOrder } from '../../../../contexts/TempOrderContext';
import { userData } from '../../../../interface';
import { useCart } from '../../../../contexts/CartContext';

const PriceSummary = () => {
    const [voucherCode, setVoucherCode] = useState('')
    const navigation = useNavigate()
    const [discount, setDiscount] = useState(0)
    const [shipfee, setShipfee] = useState(30)
    const order = JSON.parse(sessionStorage.getItem('orderInfo') || '{}')
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const { orderInfo, setOrderInfo } = userOrder()
    const { setCartInfo } = useCart()

    const CheckFieldEmpty = (label: any) => {
        const propertyName: keyof userData = label

        return orderInfo.customerInfo[propertyName] !== '' && orderInfo.customerInfo[propertyName].trim().length > 0
    }

    useEffect(() => {
        setOrderInfo(order)
    }, [])

    const ResetOrderInfo = () => {
        const newOrderInfo = {
            ...orderInfo,
            customerInfo: {
                ...orderInfo.customerInfo,
                fullName: currentUser.fullName || '',
                phoneNumber: currentUser.phoneNumber || '',
                address: currentUser.address || '',
                country: 'Vietnam',
                postalCode: '',
            }
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(newOrderInfo))
    }

    const PlaceOrder = () => {
        const newOrderInfo = {
            ...orderInfo,
            shipping: shipfee,
            discount:discount,
            customerInfo: {
                fullName: orderInfo.customerInfo.fullName.trim(),
                phoneNumber: orderInfo.customerInfo.phoneNumber.trim(),
                address: orderInfo.customerInfo.address.trim(),
                country: orderInfo.customerInfo.country,
                postalCode: orderInfo.customerInfo.postal.trim()
            }
        }
        AddNewData(newOrderInfo, 'orders', 'Order placed').then((orderID: any) => {

            if (Object.keys(currentUser).length > 0) {
                const newCart = currentUser.cart.map((item: any, index: any) => {
                    if (index < orderInfo.products.length) {
                        if (item.id !== orderInfo.products[index].id)
                            return item
                    }
                    else return item
                }).filter((item: any) => item !== undefined)

                const newUserData = {
                    ...currentUser, orders: [...currentUser.orders, orderID], cart: newCart
                }
                UpdateData(currentUser.id, 'users', newUserData, () => { })
                localStorage.setItem('currentUser', JSON.stringify(newUserData))
            }
            setCartInfo({
                selectedItem: [],
                totalValue: 0
            })
            ResetOrderInfo()
            navigation('/')
        })
    }

    return (
        <div className='bg-brown py-3 max-lg:my-4 lg:ml-4 rounded-xl text-white '>
            <p className='text-4xl text-center bg-gold text-dark-grey capitalize font-bold p-2 my-4'>Order Information</p>
            <div className='p-4'>
                {
                    order.products.map((item: any) => <SelectedProduct data={item} />)
                }

                <hr className='border-2 border-white my-4' />
                <div className='text-dark-grey xl:flex items-center justify-between'>
                    <TextField placeholder='Voucher code' className='w-full xl:w-3/4 max-sm:!mb-0'
                        value={voucherCode} onChange={(event: any) => setVoucherCode(event.target.value)}
                    />
                    <AppButton content='Apply' className='xl:rounded-xl !bg-dark-grey text-white my-0 max-xl:!w-full' />
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Provisional: <p>{currencyFormatter.format(order.total)}</p>
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Shipping: <p>{currencyFormatter.format(shipfee)}</p>
                </div>
                <div className='flex justify-between text-xl first-letter:uppercase'>
                    Discount: <p>- {currencyFormatter.format(discount)}</p>
                </div>
                <hr className='border-2 border-white my-4' />
                <div className='flex items-center justify-between text-xl font-bold capitalize'>subtotal:
                    <p className='text-4xl text-gold'>{currencyFormatter.format(order.total + shipfee - discount)}</p>
                </div>
                <AppButton content='place order' className='uppercase w-full' onClick={() => {
                    if (!CheckFieldEmpty('fullName') || !CheckFieldEmpty('phoneNumber') || !CheckFieldEmpty('address') || !CheckFieldEmpty('postal')) {
                        errorSnackbar('Please fill required information fields')
                    }
                    else {
                        PlaceOrder()
                    }
                }} />
            </div>
        </div>
    )
}

export default PriceSummary
