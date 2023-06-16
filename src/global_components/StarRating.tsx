import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faUnStar } from '@fortawesome/free-regular-svg-icons';
import IconButton from './IconButton';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRating = (props: any) => {
    const [rating, setRating] = useState(props.star);
    const [hover, setHover] = useState(props.star);
    const descriptionRate: any = [
        'terrible',
        'poor',
        'fair',
        'good',
        'amazing'
    ]

    useEffect(() => {
        setRating(props.star)
        setHover(props.star)
    },[props.isReset])

    return (
        <div>
            <p className={`py-3 text-center ${props.disable && 'hidden'} capitalize`}>{descriptionRate[hover-1]}</p>
            <div className={`flex ${props.className}`}>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type='button'
                            key={index}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            onClick={() => {
                                props.onRating()
                                setRating(index)
                            }}
                            className={`mx-1 ${props.disable && 'cursor-default pointer-events-none '}`}
                        >
                            <FontAwesomeIcon icon={(index <= (hover || rating) && !props.disable) ? faStar : faUnStar}
                                className={`${index <= (hover || rating) ? 'text-gold' : 'text-dark-grey'}`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

StarRating.propsType = {
    className: PropTypes.string,
    star: PropTypes.number.isRequired,
    disable: PropTypes.bool,
    onRating: PropTypes.func,
    isReset: PropTypes.bool
}

export default StarRating
