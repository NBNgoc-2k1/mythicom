import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faUnStar } from '@fortawesome/free-regular-svg-icons';
import IconButton from './IconButton';
import PropTypes from 'prop-types'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRating = (props: any) => {
    const [rating, setRating] = useState(props.star);
    const [hover, setHover] = useState(0);



    return (
        <div className={`flex ${props.className}`}>
            {[...Array(5)].map((index) => {
                index += 1;
                return (
                    <button
                        type='button'
                        key={index}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        onClick={() => setRating(index)}
                        className='mx-1'
                    >
                        <FontAwesomeIcon icon={index <= (hover || rating) ? faStar : faUnStar}
                            className={`${index <= (hover || rating) && 'text-gold'}`}
                        />
                    </button>
                );
            })}
        </div>
    )
}

StarRating.propsType = {
    className: PropTypes.string,
    star: PropTypes.number.isRequired,
    disable: PropTypes.bool,
    onClick: PropTypes.func
}

export default StarRating
