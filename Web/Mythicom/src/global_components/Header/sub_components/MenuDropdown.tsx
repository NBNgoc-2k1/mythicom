import { faArrowRightFromBracket, faHeart, faKey, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import user from '../../../assets/images/global/meditationdark.png'
import { Logout } from '../../../api/AuthAPI';
const MenuDropdown = (props: any) => {
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
        <div className={`${props.open ? 'flex' : 'hidden'} w-full h-screen absolute left-0 ${props.className}`}
            onClick={(e) => {
                if (e.currentTarget === e.target) {
                    props.onClose();
                }
            }}
        >
            <div className={`w-64 sm:w-72
                absolute top-20 rounded-lg
                right-[16vw] sm:right-[14vw] lg:right-[9vw] xl:right-[4vw] 2xl:right-[4.7vw]
            `}>
                <span className="absolute right-3 -top-3"
                    style={{
                        borderLeft: '12px solid transparent',
                        borderRight: "12px solid transparent",
                    }}
                >
                    <span className="absolute top-px -right-[0.8rem]"
                        style={{
                            borderLeft: "13px solid transparent",
                            borderRight: "13px solid transparent",
                            borderBottom: "12px solid #649393",
                        }}
                    ></span>
                </span>
                {Object.keys(props.user).length > 0 &&
                    <div className="flex bg-teal pl-2 py-2 items-center w-full rounded-t-lg ">
                        <div className={`rounded-full text-white w-10 h-10 items-center justify-center flex uppercase`}
                            style={{ backgroundColor: `${stringToColor(props.user.fullName)}` }}
                        >
                            {GetAbbreviationUsername(props.user.fullName)}
                        </div>
                        <div className="text-lg pl-2 capitalize">
                            <p className="text-white "
                            >{props.user.fullName}</p>
                        </div>
                    </div>}
                <div className="flex max-w-full flex-col pl-4 bg-white rounded-b-lg border border-dark-grey"
                >
                    <div className="flex my-4"
                    >
                        <img src={user} alt="logo"
                            className="w-6 h-6"
                        />
                        <Link className="text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/account/profile'
                            onClick={(e) => {
                                props.onClose()
                            }}
                        >
                            Profile
                        </Link>
                    </div>
                    <div className="flex mb-4"
                    >
                        <FontAwesomeIcon icon={faKey} size="lg" color='brown' />
                        <Link className="text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/account/password'
                            onClick={(e) => {
                                props.onClose()
                            }}

                        > Password
                        </Link>
                    </div>
                    <div className="flex mb-4"
                    >
                        <FontAwesomeIcon icon={faReceipt} size="xl" color='green' />
                        <Link className="text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/account/orders'
                            onClick={(e) => {
                                props.onClose()
                            }}

                        > My Orders
                        </Link>
                    </div>
                    <div className="flex mb-4"
                    >
                        <FontAwesomeIcon icon={faHeart} size="xl" color='red' />
                        <Link className="text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/account/wishlist'
                            onClick={(e) => {
                                props.onClose()
                            }}

                        > My Wishlist
                        </Link>
                    </div>
                    <div className="flex mb-4" onClick={() => {
                        Logout()
                        window.location.reload()
                    }}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl"/>
                        <p className="cursor-pointer text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2">
                            Log out
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

MenuDropdown.propsType = {
    'open': PropTypes.bool.isRequired,
    'className': PropTypes.string,
    'onClose': PropTypes.func.isRequired,
}


export default MenuDropdown
