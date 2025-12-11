import { Link } from 'react-router-dom'
import { getCarImage, getDefaultCarImage } from '../utils/carImages'
import '../styles/Cars.css'

function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-image-wrapper">
        <img
          src={car.image || getCarImage(car)}
          alt={`${car.brand} ${car.model}`}
          onError={(e) => {
            e.target.src = getDefaultCarImage()
          }}
          loading="lazy"
        />
      </div>
      <div className="car-info">
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>
        <div className="car-details">
          <span className="car-type">{car.type}</span>
          <span className="car-seats">{car.seats} seats</span>
        </div>
        <div className="car-price">
          <span className="price-amount">₹{car.pricePerDay}</span>
          <span className="price-label">/day</span>
        </div>
        <Link to={`/booking/${car.id}`} className="book-btn">
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default CarCard

