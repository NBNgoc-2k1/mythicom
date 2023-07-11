import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const SortDropdown = (props: any) => {

    const [selectedValue, setSelectedValue] = useState('Featured')
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    function Compare(a: any, b: any, field: string) {
        switch (field) {
            case 'Highest Price':
                return b.price - a.price
            case 'Lowest Price':
                return a.price - b.price
            case 'Featured':
                return b.sold - a.sold
            case 'Newest':                
                return a.createdAt.seconds - b.createdAt.seconds
            default:
                break;
        }
    }

    const HandleClick = (e: any) => {
        setSelectedValue(e.target.innerText)
        setDropdownOpen(!isDropdownOpen)
        props.handleSort(props.data.sort((firstProduct:any, secondProduct:any) => Compare(firstProduct, secondProduct, e.target.innerText)))
    }

    return (
        <div className={`flex flex-col h-12 relative`}
        >
            <div className={`flex justify-between bg-dark-silver w-40 lg:w-48 px-4 cursor-pointer h-12
                
                ${isDropdownOpen ? 'rounded-none rounded-t-xl border-b border-dark-grey border-solid' : 'rounded-xl'}`}
                onClick={() => {
                    setDropdownOpen(!isDropdownOpen)
                }}
            >
                <p className="text-xl sm:text-xl text-dark-grey my-2">{selectedValue}</p>
                {
                    isDropdownOpen
                        ? <FontAwesomeIcon icon={faSortUp} size="2x" className="text-teal block mt-3" />
                        : <FontAwesomeIcon icon={faSortDown} size="2x" className="text-teal block" />
                }
            </div>
            {
                isDropdownOpen && <div className="flex flex-col divide-y divide-dark-grey text-xl sm:text-xl text-dark-grey 
                    bg-dark-silver z-10 w-40 lg:w-48 relative rounded-b-xl">
                    <p className="cursor-pointer py-2 hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        Featured</p>
                        <p className="cursor-pointer py-2 hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        Newest</p>
                    <p className="cursor-pointer py-2 hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        % Discount</p>
                    <p className="py-2 cursor-pointer hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        Lowest Price</p>
                    <p className="cursor-pointer py-2 hover:bg-teal hover:text-white hover:rounded-b-xl px-4"
                        onClick={HandleClick}
                    >
                        Highest Price</p>

                </div>
            }
        </div>
    )
}

export default SortDropdown
