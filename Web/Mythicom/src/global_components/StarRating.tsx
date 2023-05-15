import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faUnStar } from '@fortawesome/free-regular-svg-icons';
import IconButton from './IconButton';
import PropTypes from 'prop-types'

const StarRating = (props: any) => {
    return (
        <div className={`flex ${props.className}`}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <IconButton icon={index <= props.rating ? faStar : faUnStar}
                        className={`mr-2 ${index > props.rating && '!bg-transparent'} ${props.disableRate && '!cursor-default pointer-events-none'}`}
                        disabled={index > props.rating}
                        iconClass={`${index <= props.rating ? 'text-gold' : 'text-dark-grey'} `}
                    />
                );
            })}
        </div>
    )
}

StarRating.propsType = {
    className: PropTypes.string,
    rating: PropTypes.number.isRequired,
    disableRate: PropTypes.bool,
}

export default StarRating
