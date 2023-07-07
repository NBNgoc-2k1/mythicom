import React from 'react'
import Label from './Label'
import CustomCheckbox from '../../../global_components/CustomCheckbox'

const FilterContainer = (props: any) => {
    return (
        <div className='my-4'>
            <Label content={props.label} />
            <div className='flex flex-col mt-1 mx-4 items-start'>
                {
                    props.valueSet.length > 0 ?
                        props.valueSet.map((value: any) => {
                            return (
                                <CustomCheckbox unCheckedAll={props.unCheckedAll} nameGroup={props.label}
                                    value={value}
                                    resetUnCheckAll={() => props.resetUnCheckAll()}
                                />
                            )
                        })
                        : <CustomCheckbox unCheckedAll={props.unCheckedAll} nameGroup={props.label}
                            value={''}
                            resetUnCheckAll={() => props.resetUnCheckAll()} />
                }
            </div>
        </div>
    )
}

export default FilterContainer
