import { faBars, faBasketShopping, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/global/logo2.png'
import user from '../../assets/images/global/meditation.png'
import IconButton from '../IconButton';
import SearchBar from './sub_components/SearchBar';
import Navigation from './sub_components/Navigation';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { NavLink, useNavigate } from 'react-router-dom';
import Social from '../SocialPart';
import MenuDropdown from './sub_components/MenuDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { authPopup, setAuthPopup } = useAuth()
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const navigation = useNavigate()

    const toggleSearchBar = () => {
        setOpenSearchBar(!openSearchBar)
    }

    const handleBasketIconClick = () => {
        if (Object.keys(currentUser).length > 0)
            navigation('/cart')
        else {
            setAuthPopup({ ...authPopup, open: true })
            document.body.style.overflowY = "hidden"
        }
    }

    const handleUserIconClick = () => {
        if (Object.keys(currentUser).length > 0)
            setShowProfileMenu(!showProfileMenu)
        else {
            setAuthPopup({ ...authPopup, open: true })
            document.body.style.overflowY = "hidden"
        }
    }

    return (
        <header className={`sticky top-0 shadow-md shadow-dark-grey z-20 bg-brown ${openSearchBar && 'max-xl:py-4'} xl:flex`}>
            <div className='hidden xl:flex w-full justify-around'>
                <NavLink to='/' className='flex cursor-pointer text-white'>
                    <img src={logo} alt="logo"
                        className="w-16 h-14 mx-auto sm:my-1.5"
                    />
                    <p className={`max-sm:hidden text-2xl my-auto mx-0 select-none`}>
                        Mythicom
                    </p>
                </NavLink>
                <Navigation className='flex bg-brown justify-center' openSearchBar={openSearchBar} />
                <SearchBar className='max-xl:hidden xl:w-1/3 mx-4 sm:mx-14 md:mx-20 lg:mx-10' icon={faSearch} onClick={() => { }}
                    placeholder='What are you looking for' actionName='Search'
                />
                <div className='flex justify-between'>
                    <IconButton icon={faSearch} className='mx-1.5 hidden lg:max-xl:block my-auto'
                        iconClass='text-white text-3xl' onClick={toggleSearchBar} />
                    <img src={user}
                        className='w-10 h-10 my-auto cursor-pointer'
                        onClick={handleUserIconClick}
                    />
                    <div className='relative text-white ml-2 my-auto cursor-pointer'
                        onClick={handleBasketIconClick}
                    >
                        <FontAwesomeIcon icon={faBasketShopping} className='w-8 h-8' />
                        <div className="leading-[100%] p-1 w-auto h-6 text-center absolute bg-teal rounded-xl bottom-4 left-3">
                            {Object.keys(currentUser).length > 0 ? `${currentUser.cart.length} ${currentUser.cart.length > 99 ? '+' : ''} ` : 0}
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-xl:flex hidden w-full justify-around'>
                <div className='flex lg:absolute'>
                    <IconButton icon={faBars} className='mx-1.5 lg:hidden my-auto'
                        iconClass='text-white text-3xl' onClick={() => setOpenMenuDrawer(true)} />
                    <IconButton icon={faSearch} className='mx-1.5 lg:hidden my-auto'
                        iconClass='text-white text-3xl' onClick={toggleSearchBar} />
                </div>
                <NavLink to='/' className='flex cursor-pointer text-white'>
                    <img src={logo} alt="logo"
                        className="w-16 h-14 mx-auto sm:my-1.5"
                    />
                    <p className={`max-sm:hidden text-2xl my-auto mx-0 select-none`}>
                        Mythicom
                    </p>
                </NavLink>
                <div className='absolute'>
                    <Drawer open={openMenuDrawer} direction='left' onClose={() => setOpenMenuDrawer(false)} >
                        <IconButton icon={faClose} className='relative left-[85%] my-2' iconClass='text-dark-grey text-3xl'
                            onClick={() => setOpenMenuDrawer(false)}
                        />
                        <Navigation className='flex flex-col bg-teal justify-center'
                            isOpenDrawer={openMenuDrawer}
                            closeDrawer={() => setOpenMenuDrawer(false)} />
                        <Social className='bg-teal lg:hidden' />
                    </Drawer>
                </div>
                <Navigation className='hidden lg:flex bg-brown justify-center' openSearchBar={openSearchBar} />
                <SearchBar className='max-xl:hidden xl:w-1/3 mx-4 sm:mx-14 md:mx-20 lg:mx-10'
                />
                <div className='flex justify-between'>
                    <IconButton icon={faSearch} className='mx-1.5 hidden lg:max-xl:block my-auto'
                        iconClass='text-white text-3xl' onClick={toggleSearchBar} />
                    <img src={user}
                        className='w-10 h-10 my-auto cursor-pointer'
                        onClick={handleUserIconClick}
                    />
                    <div className='relative text-white ml-2 my-auto cursor-pointer'
                        onClick={handleBasketIconClick}
                    >
                        <FontAwesomeIcon icon={faBasketShopping} className='w-8 h-8' />
                        <div className="leading-[100%] p-1 w-auto h-6 text-center absolute bg-teal rounded-xl bottom-4 left-3">
                            {Object.keys(currentUser).length > 0 ? `${currentUser.cart.length} ${currentUser.cart.length > 99 ? '+' : ''} ` : 0}
                        </div>
                    </div>
                </div>
                <MenuDropdown open={showProfileMenu} onClose={handleUserIconClick} user={currentUser} />
            </div>
            <SearchBar className={`${!openSearchBar ? 'hidden' : 'xl:hidden'}`}
            />
            <MenuDropdown open={showProfileMenu} onClose={handleUserIconClick} user={currentUser} className='max-xl:!hidden' />
        </header>
    )
}

export default Header