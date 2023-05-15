import React, { useState } from 'react'
import IconButton from '../../../global_components/IconButton'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CustomCheckbox from '../../../global_components/CustomCheckbox'
import QuantityAdjust from '../../../global_components/QuantityAdjust'
import { currencyFormatter } from '../../../services'

const ItemInfo = (props: any) => {
    const [quantity, setQuantity] = useState(1);

    const AdjustQuantity = (value: number) => {
        setQuantity(value)
    }

    return (
        <>
            <div className='max-md:hidden grid text-lg xl:text-2xl grid-cols-12 justify-between
            border-b border-dark-grey last:border-none py-6 mx-4'>
                <div className='flex items-center col-span-5'>
                    <CustomCheckbox isChecked={props.isChecked} onChange={() => { }} />
                    <div className='flex items-start'>
                        <img src='https://i.pinimg.com/474x/1c/1d/37/1c1d37cbcd7ea724fc04c52c4bca3ace.jpg'
                            className='w-20 h-20'
                        />
                        <p className='mx-4 text-lg xl:text-xl line-clamp-2'>1/6 Story of A Journey to The West - Sha Wujing</p>
                    </div>
                </div>
                <p className='lg:max-xl:text-base col-span-2'>{currencyFormatter.format(12.5)}</p>
                <QuantityAdjust initValue={quantity} inventory={8} onChange={AdjustQuantity}
                    className='col-span-2'
                />
                <p className='text-brown font-semibold max-md:hidden lg:max-xl:text-base col-span-2 text-center truncate'>
                    {currencyFormatter.format(25)}</p>
                <IconButton icon={faTrashCan} iconClass='text-red' className='col-span-1 text-center' />
            </div>
            <div className='flex md:hidden items-center
            border-b border-dark-grey last:border-none py-6 mx-4'>
                <CustomCheckbox isChecked={props.isChecked} onChange={() => { }} />
                <img src='https://i.pinimg.com/474x/1c/1d/37/1c1d37cbcd7ea724fc04c52c4bca3ace.jpg'
                    className='sm:max-md:w-32 sm:max-md:h-32 w-20 h-20'
                />
                <div className='ml-4'>
                    <p className='mr-4 sm:text-lg line-clamp-2'>1/6 Story of A Journey to The West - Sha Wujing</p>
                    <p className='text-xl sm:text-2xl font-semibold text-brown'>{currencyFormatter.format(12.5)}</p>
                    <QuantityAdjust initValue={quantity} inventory={8} onChange={AdjustQuantity}
                        className='w-3/5 sm:w-2/5 h-8'
                    />
                </div>
                <IconButton icon={faTrashCan} iconClass='text-2xl text-red' className='text-center' />
            </div>
        </>
    )
}

export default ItemInfo
