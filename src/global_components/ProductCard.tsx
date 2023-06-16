import React, { useEffect, useState } from 'react'
import AppButton from './AppButton'
import IconButton from './IconButton';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faUnHeart } from '@fortawesome/free-regular-svg-icons'
import { currencyFormatter, successSnackbar } from '../services';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { AddToCart, ToggleWishlist } from '../globalFunctions';

const ProductCard = (props: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const [isWish, setWish] = useState(false)
    const navigation = useNavigate()

    const AddCart = () => {
        const productInfo = {
            img: props.item.thumbImg,
            name: props.item.name,
            price: props.item.price,
            quantity: 1,
            id: props.item.id,
        }
        AddToCart(productInfo)
    }

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            const isExist = currentUser.favoriteProducts.filter((value: any) => value.id === props.item.id).length > 0 ? true : false
            setWish(isExist)
        }
    }, [])

    return (
        <div className='bg-brown pb-2 mx-2 sm:w-60 lg:w-64 rounded-xl drop-shadow cursor-pointer'
        >
            <IconButton icon={isWish ? faHeart : faUnHeart}
                className={`cursor-pointer absolute left-[80%] sm:left-[85%] top-3 z-10 ${Object.keys(currentUser).length == 0 && 'hidden'}`}
                iconClass={`text-2xl ${isWish ? 'text-red' : 'text-dark-grey'}`}
                onClick={() => {
                    const newItem = {
                        img: props.item.thumbImg,
                        name: props.item.name,
                        rating: props.item.rating,
                        price: props.item.price,
                        inventory: props.item.inventory,
                        id: props.item.id,
                    }
                    ToggleWishlist(newItem)
                    setWish(!isWish)
                }}
            />
            <div onClick={() => navigation(`/product/${props.item.id}`)}
            >
                <img src={props.item.thumbImg}
                    className={`'w-full h-44 min-[414px]:h-52 sm:h-64 lg:h-[17rem] bg-white rounded-t-xl 
                    ${props.item.inventory > 0 ? 'brightness-100' : 'brightness-75 '}`}
                />
                <div className={`absolute top-28 left-8 text-white bg-red rounded-xl p-1 text-4xl border-red border -rotate-45
                    ${props.item.inventory > 0 ? 'hidden' : 'block'}
                `}>
                    Out of stock</div>
                <p className='py-1 sm:py-2 sm:text-xl lg:text-2xl text-footer hover:no-underline ml-3 line-clamp-1 sm:line-clamp-2'>
                    {props.item.name}</p>
            </div>
            <div className='flex items-center justify-between mx-3 '>
                <div className='text-sm text-white sm:text-lg lg:text-2xl font-semibold'>
                    {currencyFormatter.format(props.item.price)}
                </div>
                <IconButton icon={faCartPlus} disabled={(props.item.inventory < 1)}
                    className='max-sm:hidden bg-teal h-10 w-10 rounded-full'
                    iconClass='text-white text-xl mx-2 my-3'
                    onClick={AddCart}
                />
            </div>
            <AppButton content='Add cart' disabled={(props.item.inventory < 1)} className='sm:hidden mx-auto text-white'
                onClick={AddCart}
            />
        </div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default ProductCard
