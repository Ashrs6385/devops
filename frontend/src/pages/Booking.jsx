import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBooking, getCarById } from '../services/api'
import { getCarImage, getDefaultCarImage } from '../utils/carImages'
import '../styles/Booking.css'

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    customerName: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadCar()
  }, [id])

  const loadCar = async () => {
    try {
      const data = await getCarById(id)
      setCar(data)
    } catch (err) {
      console.error('Error loading car:', err)
      navigate('/cars')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date'
      }
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    try {
      const booking = await createBooking({
        carId: Number(id),
        ...formData
      })
      navigate(`/confirmation/${booking.id}`)
    } catch (err) {
      console.error(err)
      alert('Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    )
  }

  if (!car) {
    return null
  }

  const days =
    formData.startDate && formData.endDate
      ? Math.ceil(
          (new Date(formData.endDate) - new Date(formData.startDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 0
  const totalPrice = days * car.pricePerDay

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Book Your Car</h1>
          <p>Complete the form below to confirm your reservation</p>
        </div>

        <div className="booking-content">
          <div className="car-summary">
            <div className="car-summary-image">
              <img
                src={car.image || getCarImage(car)}
                alt={`${car.brand} ${car.model}`}
                onError={(e) => {
                  e.target.src = getDefaultCarImage()
                }}
                loading="lazy"
              />
            </div>
            <div className="car-summary-info">
              <h2>
                {car.brand} {car.model}
              </h2>
              <div className="car-summary-details">
                <span>{car.type}</span>
                <span>{car.seats} seats</span>
              </div>
              <div className="car-summary-price">
                <span className="price">₹{car.pricePerDay}</span>
                <span className="price-label">per day</span>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Pickup Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={errors.startDate ? 'error' : ''}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Return Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                className={errors.endDate ? 'error' : ''}
              />
              {errors.endDate && (
                <span className="error-message">{errors.endDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.customerName ? 'error' : ''}
              />
              {errors.customerName && (
                <span className="error-message">{errors.customerName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            {days > 0 && (
              <div className="price-summary">
                <div className="price-row">
                  <span>Daily Rate</span>
                  <span>₹{car.pricePerDay}</span>
                </div>
                <div className="price-row">
                  <span>Days</span>
                  <span>{days}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking

