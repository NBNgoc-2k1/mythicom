import React, { useState } from 'react'
import Label from './Label'
import FilterWrapper from './FilterContainer'
import AppButton from '../../../global_components/AppButton'
import PropTypes from 'prop-types'
import { useFilter } from '../../../contexts/FilterContext'
import { useParams } from 'react-router-dom'

const Filter = (props: any) => {
    const [unCheckedAll, setUnCheckedAll] = useState(false)
    const { filterValue, setFilterValue } = useFilter()
    let { param1, param2 } = useParams()

    return (
        <div className={`${props.className} lg:w-1/5 bg-teal lg:rounded-r-xl lg:mt-20 h-fit py-4 text-white`}>
            <div>
                <Label content='Price' />
                <div className='mt-2 mx-4 '>
                    <div className='flex items-center justify-between text-xl text-dark-grey' >
                        <input className='w-1/2 rounded-md px-2' type="text"
                            value={filterValue.rangePrice.minPrice}
                            onChange={(e) => {
                                e.target.value !== '' ?
                                    setFilterValue({
                                        ...filterValue, rangePrice: {
                                            ...filterValue.rangePrice,
                                            minPrice: e.target.value.replace(/^0+/, '')
                                        }
                                    }) : setFilterValue({
                                        ...filterValue, rangePrice: {
                                            ...filterValue.rangePrice,
                                            minPrice: 0
                                        }
                                    })
                            }}
                            onKeyDown={(event) => {
                                if (/[0]/.test(event.key) && filterValue.rangePrice.minPrice.toString() == '0') {
                                    event.preventDefault();
                                }
                                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <span className='mx-3 text-white'>-</span>
                        <input className='w-1/2 rounded-md px-2' type="text"
                            value={filterValue.rangePrice.maxPrice}
                            onChange={(e) => {
                                e.target.value !== '' ? setFilterValue({
                                    ...filterValue, rangePrice: {
                                        ...filterValue.rangePrice,
                                        maxPrice: e.target.value.replace(/^0+/, '')
                                    }
                                }) : setFilterValue({
                                    ...filterValue, rangePrice: {
                                        ...filterValue.rangePrice,
                                        maxPrice: 0
                                    }
                                })
                            }}
                            onKeyDown={(event) => {
                                if (/[0]/.test(event.key) && filterValue.rangePrice.maxPrice.toString() == '0') {
                                    event.preventDefault();
                                }
                                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>
                    <AppButton content='apply' className='!bg-dark-grey w-full' onClick={props.onFilterByPrice} />
                </div>
            </div>
            <>
                {
                    props.filterValue && Object.keys(props.filterValue).map((value) => {
                        if (param1 !== 'books' || (param1 === 'books' && (value === 'origin' || value === 'author'))) { 
                            return (
                                <FilterWrapper label={value}
                                    valueSet={props.filterValue[value]}
                                    unCheckedAll={unCheckedAll}
                                    resetUnCheckAll={() => setUnCheckedAll(false)}
                                />
                            )
                        }

                    })
                }
            </>
            <div className='flex justify-around'>
                <AppButton content='Reset' className='!w-2/5 !bg-dark-grey text-white' onClick={() => {
                    props.onReset()
                    setUnCheckedAll(true)
                }} />
                <AppButton content='Apply' className='!w-2/5 !bg-gold text-dark-grey' onClick={props.onFilterByCategory} />
            </div>
        </div>
    )
}

Filter.propTypes = {
    className: PropTypes.string,
    filterValue: PropTypes.any.isRequired,
    onFilterByCategory: PropTypes.func.isRequired,
    onFilterByPrice: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
}

export default Filter
