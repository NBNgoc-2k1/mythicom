import React from 'react'
import RadioCustom from '../../../../../global_components/RadioCustom'
import PropTypes from 'prop-types'

const MethodList = (props: any) => {
    return (
        <div className='mb-8'>
            <p className='capitalize text-3xl'>{props.label}</p>
            <form>
                {
                    props.data.map((data: any) => <RadioCustom data={data} name={props.label} checked={props.valueChecked === data.content}
                        onChange={props.onChange}
                    />)
                }
            </form>
        </div>
    )
}

MethodList.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    valueChecked: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default MethodList
