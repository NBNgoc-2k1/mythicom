import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const HoverDropdown = (props: any) => {
    return (
        <>
            <div className={`lg:hidden group-hover:flex hover:flex
                flex-col lg:absolute text-lg w-full lg:w-40 drop-shadow-lg left-4 top-14
                ${props.open ? 'flex' : 'hidden'} ${props.className}
            `}>
                {
                    props.data.length > 0 ? props.data.map((data: any) =>
                        <NavLink to={data.path} className='max-lg:px-6 p-2 capitalize hover:text-white hover:bg-teal
                            border-b border-b-2 border-dark-silver'
                            onClick={props.closeDrawer}
                        >{data.title}</NavLink>
                    ) : (
                        <></>
                    )
                }
            </div>
        </>
    )
}

HoverDropdown.propsType = {
    'open':PropTypes.bool.isRequired,
    'className':PropTypes.string,
    'data':PropTypes.array.isRequired,
}


export default HoverDropdown
