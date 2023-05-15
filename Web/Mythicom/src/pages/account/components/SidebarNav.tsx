import React from 'react'
import { Link } from 'react-router-dom'

const SidebarNav = (props: any) => {

    const GetAbbreviationUsername = (name: string) => {
        let abbreviationName = ''
        name.split(" ").map(string => abbreviationName += string.charAt(0))
        return abbreviationName
    }


    function stringToColor(string: any) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return (
        <div className='rounded-lg max-lg:hidden lg:w-1/4 2xl:w-1/6 mt-24'>
            <div className='bg-teal flex items-center text-xl capitalize rounded-t-lg text-white py-4'>
                <div className={`rounded-full text-white w-10 h-10 mx-4 items-center justify-center flex uppercase`}
                    style={{ backgroundColor: `${stringToColor(props.user.fullName)}` }}
                >
                    {GetAbbreviationUsername(props.user.fullName)}
                </div>
                {props.user.fullName}
            </div>
            <div className='flex flex-col py-4 bg-dark-silver text-xl rounded-b-lg'>
                <Link to='/account/profile'
                    className={`py-2 px-4 ${props.pathname === 'profile' && 'border-l-4'} border-brown`}>
                    Account Information</Link>
                <Link to='/account/password'
                    className={`py-2 px-4 ${props.pathname === 'password' && 'border-l-4'} border-brown`}>
                    Change password</Link>
                <Link to='/account/orders'
                    className={`py-2 px-4 ${props.pathname === 'orders' && 'border-l-4'} border-brown`}>
                    Order Management</Link>
                <Link to='/account/wishlist'
                    className={`py-2 px-4 ${props.pathname === 'wishlist' && 'border-l-4'} border-brown`}>
                    Wishlist</Link>
            </div>
        </div>
    )
}

export default SidebarNav
