import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import IconButton from '../../IconButton'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const SearchBar = (props: any) => {
    const [keyword, setKeyword] = useState('')
    const navigation = useNavigate()

    const HandleClick = () => {
        navigation(`result/${keyword}`)
        setKeyword('')
    }

    return (
        <div className={`${props.className} flex bg-light-silver rounded-full my-auto 
            mx-4 sm:mx-14 md:mx-20 lg:mx-10 xl:w-1/3 h-12
        `}>
            <input className='bg-light-silver rounded-l-full border-none w-4/5
                sm:text-xl focus:outline-none focus:ring-0 focus:ring-offset-0 ml-4'
                type='text'
                placeholder='What are you looking for'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <div className='max-sm:hidden w-1/5 text-white bg-teal lg:text-teal lg:bg-light-silver 
                border-teal border-l hover:bg-teal hover:text-white px-3 rounded-r-full cursor-pointer'
                onClick={HandleClick}
            >
                <p className='text-xl text-center mt-2'>Search</p>
            </div>
            <IconButton icon={faSearch} className='bg-teal sm:hidden rounded-r-full w-1/5'
                iconClass='text-white text-2xl my-3 mx-4'
                onClick={HandleClick}
            />
        </div>
    )
}

SearchBar.propsType = {
    className: PropTypes.string,
}

export default SearchBar
