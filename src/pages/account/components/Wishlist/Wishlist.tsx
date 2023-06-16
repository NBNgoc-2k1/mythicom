import React from 'react'
import TitlePage from '../../../../global_components/TitlePage'
import WishedItem from './components/WishedItem'
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../global_components/AppButton';
import user from '../../../../assets/images/account/mindfulness.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Wishlist = (props: any) => {
    const navigation = useNavigate()

    return (
        <div>
            <TitlePage title='Wishlist' />
            {
                props.user.favoriteProducts.length > 0 ?
                    <div>
                        {
                            props.user.favoriteProducts.map((products: any) => <WishedItem data={products} />)
                        }
                    </div>
                    : <div>
                        <div className='mx-auto w-fit mb-8'>
                            <img src={user} className='mx-auto' />
                            <p className='text-xl text-center'>
                                Click<FontAwesomeIcon icon={faHeart} className='text-red mx-2' />
                                your favorite products when shopping to find again easily
                            </p>
                        </div>
                        <AppButton content='Continue shopping' onClick={() => { navigation('/') }}
                            className='text-white mx-auto'
                        />
                    </div>
            }
        </div>
    )
}

export default Wishlist
