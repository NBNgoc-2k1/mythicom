import React from 'react'
import { currencyFormatter } from '../../../../../services'
import IconButton from '../../../../../global_components/IconButton'
import { faCartPlus, faCheck, faClose, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StarRating from '../../../../../global_components/StarRating'

const WishedItem = (props: any) => {
    const inventory = 1
    return (
        <div className='flex justify-between m-4 bg-brown rounded-2xl text-white'>
            <img className="m-0 w-28 sm:w-32 h-auto rounded-l-2xl"
                src={`https://i.pinimg.com/474x/1c/1d/37/1c1d37cbcd7ea724fc04c52c4bca3ace.jpg`}
            />
            <div className='max-sm:ml-2 w-3/5'>
                <p className='text-lg xl:text-xl line-clamp-2'>1/6 Story of A Journey to The West - Sha Wujing</p>
                <StarRating disableRate={true} rating={4} />
                <div className='flex items-center'>
                    <div className='text-white text-lg lg:text-2xl font-semibold'>
                        {currencyFormatter.format(28)}
                    </div>
                    <div className={`${inventory > 0 && 'hidden'} bg-red mx-2 px-3 max-[414px]:hidden text-white w-fit rounded-lg`}>
                        Out of stock
                    </div>
                </div>
            </div>
            <div className='mr-2 sm:mr-4'>
                <IconButton icon={faXmark} className='relative bottom-1 cursor-pointer w-10 h-10'
                    iconClass={`text-3xl text-dark-silver mx-2.5 my-2`}
                />
                <IconButton icon={faCartPlus} className={`${inventory < 1 && 'hidden'} bg-teal mt-8 h-10 w-10 rounded-full`}
                    iconClass='text-white text-xl mx-2 my-3'
                    onClick={() => console.log('to cart')}
                />
            </div>
        </div>
    )
}

export default WishedItem
