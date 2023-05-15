import React from 'react'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'

const Item = (props: any) => {
    return (
        <div className='bg-dark-silver lg:table-row text-xl last:border-none border-b border-dark-grey'>
            <div className='w-full lg:table-cell p-4'>
                <div className='flex'>
                    <img src='https://i.pinimg.com/474x/1c/1d/37/1c1d37cbcd7ea724fc04c52c4bca3ace.jpg'
                        className='w-20 h-20'
                    />
                    <div className='ml-4'>
                        <p className='max-sm:text-base line-clamp-2'>1/6 Story of A Journey to The West - Sha Wujing</p>
                        <div className='flex lg:hidden'>
                            <p className='max-sm:text-lg font-semibold inline-block mr-2'>{currencyFormatter.format(25)}</p>
                            <span className='inline-block max-sm:text-lg mr-2'>
                                x{5}
                            </span>
                        </div>
                        <div className='hidden lg:flex text-white'>
                            <AppButton content='rate' className='!bg-gold !text-dark-grey' />
                            <AppButton content='Buy again' className='ml-4 !bg-dark-grey' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(25)}
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                2
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(0)}
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(50)}
            </div>
        </div>
    )
}

export default Item
