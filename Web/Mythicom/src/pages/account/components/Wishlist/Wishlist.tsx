import React from 'react'
import TitlePage from '../../../../global_components/TitlePage'
import WishedItem from './components/WishedItem'

const Wishlist = () => {
    return (
        <div>
            <TitlePage title='Wishlist' />
            <WishedItem />
        </div>
    )
}

export default Wishlist
