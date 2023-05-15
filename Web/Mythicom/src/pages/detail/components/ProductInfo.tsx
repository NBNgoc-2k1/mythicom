import React, { useState } from 'react'
import { faCheck, faClose, faHeart, } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faUnHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '../../../global_components/IconButton';
import AppButton from '../../../global_components/AppButton';
import { currencyFormatter } from '../../../services';
import Modal from '../../../global_components/Modal';
import QuantityAdjust from '../../../global_components/QuantityAdjust';
import StarRating from '../../../global_components/StarRating';
import parser from 'html-react-parser'

const ProductInfo = (props: any) => {
    const [quantity, setQuantity] = useState(1);
    const inventory = props.data.inventory
    const [fullDescription, setFullDescription] = useState(false)
    const [isWish, setWish] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

    const options = {
        replace: (domNode:any) => {
            if (domNode.attribs && domNode.attribs.class === 'remove') {
                return <></>;
            }
        },
    };

    const AdjustQuantity = (value: number) => {
        setQuantity(value)
    }

    const describesample = (
        <div className={`bg-dark-silver text-dark-grey rounded-b-xl p-4 ${fullDescription && 'h-full overflow-y-scroll'}`}>
            {parser(props.data.description, options)}
        </div>
    )


    const ToggleDescriptionDialog = () => {
        {
            fullDescription ? document.body.style.overflowY = "" : document.body.style.overflowY = "hidden"
        }
        setFullDescription(!fullDescription)
    }

    return (
        <div className='mx-2 sm:mx-20 2xl:mx-0 text-white lg:flex '>
            <img src={props.data.avtImg} className='w-full lg:w-2/5 lg:h-2/5 max-lg:rounded-t-2xl' />
            <div className='lg:w-1/2 py-3 px-6 mx-auto bg-teal rounded-2xl' >
                <p className='text-xl sm:text-2xl xl:text-3xl font-semibold'>{props.data.name}</p>
                <StarRating rating={props.data.rating} disableRate={true} />
                <div className='flex items-center my-3'>
                    <p className='text-2xl md:text-3xl xl:text-4xl text-gold '>{currencyFormatter.format(props.data.price)}</p>
                    <div className={`${inventory > 0 ? 'bg-green' : 'bg-red'} max-[414px]:hidden text-white w-fit p-2 mx-3 rounded-xl`}>
                        <FontAwesomeIcon icon={inventory > 0 ? faCheck : faClose} className='mx-2' />
                        {inventory > 0 ? `In stock (${inventory} ${inventory > 1 ? 'items' : 'items'})` : 'Out of stock'}
                    </div>
                </div>
                <div className={`${inventory > 0 ? 'bg-green' : 'bg-red'} min-[414px]:hidden text-white w-fit p-2 rounded-xl my-3`}>
                    <FontAwesomeIcon icon={inventory > 0 ? faCheck : faClose} className='mx-2' />
                    {inventory > 0 ? `In stock (${inventory} ${inventory > 1 ? 'items' : 'items'})` : 'Out of stock'}
                </div>
                <div className={`${inventory < 1 ? 'hidden' : 'flex'} text-xl items-center ${Object.keys(currentUser).length > 0 && 'xl:justify-between'}`}>
                    Quantity:
                    <QuantityAdjust inventory={inventory} onChange={AdjustQuantity} initValue={quantity} className='mx-4 !w-1/2 sm:!w-1/3' />
                    {Object.keys(currentUser).length > 0 && <AppButton content='Add to cart' className='max-xl:hidden !bg-brown w-full !my-0' />}
                </div>
                <div className={`${inventory < 1 && 'hidden'}`}>
                    {Object.keys(currentUser).length > 0 && <AppButton content='Add to cart' className='xl:hidden !bg-brown w-full my-3' />}
                    <AppButton content='Buy now' className='w-full !bg-gold !text-dark-grey my-3' />
                </div>
                <div className='uppercase text-2xl border-b border-white my-4 flex justify-between'>description
                    <div className='flex items-center normal-case cursor-pointer select-none' onClick={() => setWish(!isWish)}>
                        <p className='max-sm:hidden'>Add to wishlist</p>
                        <FontAwesomeIcon icon={isWish ? faHeart : faUnHeart} className={`ml-2 text-xl ${isWish ? 'text-red' : 'text-dark-grey'}`} />
                    </div>
                </div>
                <div className='overflow-y-hidden h-60 max-md:lg:h-28 xl:h-40 2xl:h-60 text-ellipsis rounded-xl '>
                    {describesample}
                </div>
                <AppButton content='View more' className='mx-auto !bg-dark-grey' onClick={ToggleDescriptionDialog} />
            </div>
            <Modal open={fullDescription} onClose={ToggleDescriptionDialog} className='flex-col' >
                <div className="w-4/5 sm:w-2/3 md:w-1/2 h-2/3 bg-light-silver rounded-xl">
                    <div className='text-center capitalize rounded-t-xl text-xl sm:text-2xl bg-brown w-full py-4'>
                        product information
                    </div>
                    <IconButton icon={faClose} className='absolute top-[19%] left-[78%] md:left-[70%] text-2xl rounded-full bg-teal px-2'
                        onClick={ToggleDescriptionDialog}
                    />
                    {describesample}
                </div>
            </Modal>
        </div>
    )
}

export default ProductInfo
