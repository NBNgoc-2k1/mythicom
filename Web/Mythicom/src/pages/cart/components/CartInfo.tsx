import React, { useState } from 'react'
import CustomCheckbox from '../../../global_components/CustomCheckbox'
import IconButton from '../../../global_components/IconButton'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ItemInfo from './ItemInfo'

const CartInfo = () => {
    const [checkedAll, setCheckedAll] = useState(false)

    return (
        <div className='bg-light-silver rounded-xl w-full border border-dark-grey
        lg:w-[70%] xl:w-2/3
        '>
            <div className='flex bg-teal text-white capitalize rounded-t-xl text-2xl p-4 justify-between
                md:grid grid-cols-2 md:grid-cols-12 
            '>
                <div className='col-span-1 md:col-span-5'>
                    <CustomCheckbox isChecked={checkedAll} value={`All (1 items)`} onChange={() => setCheckedAll(!checkedAll)} />
                </div>
                <p className='max-md:hidden col-span-2'>price</p>
                <p className='max-md:hidden col-span-2 text-center'>quantity</p>
                <p className='max-md:hidden col-span-2 text-center'>Total</p>
                <IconButton icon={faTrashCan} iconClass='text-white ' className='col-span-1 text-end md:text-center' />
            </div>
            <div className='bg-dark-silver rounded-b-xl'>
                <ItemInfo isChecked={checkedAll} />
                <ItemInfo isChecked={checkedAll} />
                <ItemInfo isChecked={checkedAll} />
                <ItemInfo isChecked={checkedAll} />
            </div>
        </div>
    )
}

export default CartInfo
