import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import IconButton from '../../IconButton'
import HoverDropdown from './HoverDropdown'
import PropTypes from 'prop-types'

const Navigation = (props: any) => {
    const location = useLocation()

    const [openFigureDropdown, setOpenFigureDropdown] = useState(false)
    const [openAccessoryDropdown, setOpenAccessoryDropdown] = useState(false)

    useEffect(() => {
        setOpenFigureDropdown(false)
        setOpenAccessoryDropdown(false)
    }, [props.isOpenDrawer])

    const categoryData = {
        figurines: [
            { title: 'gods', path: '/figurines/gods' },
            { title: 'creatures', path: '/figurines/creatures' },
            { title: 'items', path: '/figurines/items' }
        ],
        books: [
        ],
        accessories: [
            { title: 'Key chain', path: '/accessories/keyChain' },
            { title: 'Backpack - Wallet', path: '/accessories/backpackWallet' },
            { title: 'Necklace', path: '/accessories/necklace' },
        ]
    }

    return (
        <div className={`bg-brown justify-center ${props.className} mt-3`}>
            <div className='group relative border-none max-lg:border-b border-b-2 border-white'>
                <div className={`${(location.pathname.slice(0, 10) === '/figurines') &&
                    'bg-brown lg:bg-teal lg:rounded-full'} 
                    flex
                `}>
                    <NavLink to='/figurines/1'
                        className='nav-item'
                        onClick={props.closeDrawer}
                    >
                        Figurines
                    </NavLink>
                    <IconButton icon={openFigureDropdown ? faChevronUp : faChevronDown}
                        className={`text-white my-auto lg:hidden`}
                        onClick={() => setOpenFigureDropdown(!openFigureDropdown)}
                    />
                </div>
                <div className={`${!openFigureDropdown && 'hidden'} lg:group-hover:block lg:hover:block`}>
                    <HoverDropdown data={categoryData.figurines}
                        className='bg-white text-dark-grey'
                        closeDrawer={props.closeDrawer}
                    />
                </div>
            </div>
            <div className='group relative border-none max-lg:border-b border-b-2 border-white'>
                <div className={`${(location.pathname.slice(0, 6) === '/books') &&
                    'bg-brown lg:bg-teal lg:rounded-full'} 
                    flex
                `}>
                    <NavLink to='/books/1'
                        className='nav-item'
                        onClick={props.closeDrawer}
                    >
                        Books
                    </NavLink>
                </div>
            </div>
            <div className='group relative border-none max-lg:border-b border-b-2 border-white'>
                <div className={`${(location.pathname.slice(0, 12) === '/accessories') &&
                    'bg-brown lg:bg-teal lg:rounded-full'} 
                    flex
                `}>
                    <NavLink to='/accessories/1'
                        className='nav-item'
                        onClick={props.closeDrawer}
                    >
                        Accessories
                    </NavLink>
                    <IconButton icon={openAccessoryDropdown ? faChevronUp : faChevronDown}
                        className={`text-white my-auto lg:hidden`}
                        onClick={() => setOpenAccessoryDropdown(!openAccessoryDropdown)}
                    />
                </div>
                <div className={`${!openAccessoryDropdown && 'hidden'} lg:group-hover:block lg:hover:block`}>
                    <HoverDropdown data={categoryData.accessories}
                        className='bg-white text-dark-grey'
                        closeDrawer={props.closeDrawer}
                    />
                </div>
            </div>
        </div>

    )
}

Navigation.propsType = {
    'isOpenDrawer': PropTypes.bool,
    'className': PropTypes.string,
}

export default Navigation
