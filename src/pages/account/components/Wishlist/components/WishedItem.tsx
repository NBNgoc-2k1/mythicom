import React from 'react'
import { currencyFormatter } from '../../../../../services'
import IconButton from '../../../../../global_components/IconButton'
import { faCartPlus, faCheck, faClose, faXmark } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../../../../../global_components/StarRating'
import { AddToCart, ToggleWishlist } from '../../../../../globalFunctions'
import { useNavigate } from 'react-router-dom'

const WishedItem = (props: any) => {
    const AddCart = () => {
        const productInfo = {
            img: props.data.img,
            name: props.data.name,
            price: props.data.price,
            quantity: 1,
            id: props.data.id,
        }
        AddToCart(productInfo)
    }
    const inventory = props.data.inventory
    const navigate = useNavigate()

    return (
        <div className='flex justify-between mx-auto my-4 bg-brown rounded-2xl text-white w-4/5'>
            <img className="m-0 w-28 sm:w-32 h-auto rounded-l-2xl cursor-pointer"
                src={props.data.img}
                onClick={() => navigate(`/product/${props.data.id}`)}
            />
            <div className='ml-4 w-3/5 cursor-pointer'
                onClick={() => navigate(`/product/${props.data.id}`)}
                >
                <p className='text-lg xl:text-xl line-clamp-2'>{props.data.name}</p>
                <StarRating disable={true} star={props.data.rating} />
                <div className='flex items-center'>
                    <div className='text-white text-lg lg:text-2xl font-semibold'>
                        {currencyFormatter.format(props.data.price)}
                    </div>
                    <div className={`${inventory > 0 && 'hidden'} bg-red mx-2 px-3 max-[414px]:hidden text-white w-fit rounded-lg`}>
                        Out of stock
                    </div>
                </div>
            </div>
            <div className='mr-2 sm:mr-4'>
                <IconButton icon={faXmark} className='relative bottom-1 cursor-pointer w-10 h-10'
                    iconClass={`text-3xl text-dark-silver mx-2.5 my-2`}
                    onClick={() => {
                        ToggleWishlist(props.data)
                        window.location.reload()
                    }}
                />
                <IconButton icon={faCartPlus} className={`${inventory < 1 && 'hidden'} bg-teal mt-8 h-10 w-10 rounded-full`}
                    iconClass='text-white text-xl mx-2 my-3'
                    onClick={AddCart}
                />
            </div>
        </div>
    )
}

export default WishedItem
