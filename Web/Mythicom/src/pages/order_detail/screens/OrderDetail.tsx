import React from 'react'
import TitlePage from '../../../global_components/TitlePage'
import ItemList from '../components/ItemList'

const OrderDetail = (props: any) => {

    return (
        <div className='my-10 mx-2 sm:mx-auto sm:w-5/6 2xl:w-[64%]'>
            <TitlePage title='Detail Order' />
            <div className='lg:flex justify-between text-xl
                max-lg:bg-dark-silver max-lg:p-4 max-lg:rounded-xl
            '>
                <p>Order ID: #156748</p>
                <p className='max-lg:text-base max-lg:text-dark-grey'>Placed on: 16:00 16/4/2023</p>
            </div>
            <div className='flex justify-between my-4'>
                <div className='w-full lg:w-2/5'>
                    <p className='uppercase font-bold'>Address</p>
                    <div className='bg-dark-silver p-4 rounded-xl'>
                        <p className='capitalize lg:font-semibold'>Nguyễn Bảo Ngọc</p>
                        <p className='text-dark-grey'>
                            Address: Kí túc xá khu A ĐHQG TPHCM, Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh, Việt Nam
                        </p>
                        <p className='text-dark-grey'>
                            Điện thoại: 0342834371
                        </p>
                    </div>
                </div>
                <div className='w-2/5 max-lg:hidden'>
                    <p className='uppercase'>delivery method</p>
                    <div className='text-lg sm:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                        Standard international
                    </div>
                    <p className='uppercase'>payment method</p>
                    <div className='text-lg sm:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                        Pay with Paypal
                    </div>
                </div>
            </div>
            <ItemList />
        </div>
    )
}

export default OrderDetail
