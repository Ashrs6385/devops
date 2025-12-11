import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookingById } from '../services/api'
import '../styles/Booking.css'

function Confirmation() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBooking()
  }, [bookingId])

  const loadBooking = async () => {
    try {
      const data = await getBookingById(bookingId)
      setBooking(data)
    } catch (err) {
      console.error('Error loading booking:', err)
    } finally {
      setLoading(false)
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

  if (!booking) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="error-state">
            <p>Booking not found</p>
            <Link to="/cars" className="btn btn-primary">
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const startDate = new Date(booking.startDate).toLocaleDateString()
  const endDate = new Date(booking.endDate).toLocaleDateString()
  const days = Math.ceil(
    (new Date(booking.endDate) - new Date(booking.startDate)) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <div className="booking-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message">
            Thank you, {booking.customerName}! Your reservation has been
            confirmed.
          </p>

          <div className="confirmation-details">
            <h2>Booking Details</h2>
            <div className="detail-row">
              <span className="detail-label">Booking ID:</span>
              <span className="detail-value">#{booking.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Car:</span>
              <span className="detail-value">
                {booking.car?.brand} {booking.car?.model}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Pickup Date:</span>
              <span className="detail-value">{startDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Return Date:</span>
              <span className="detail-value">{endDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">
                {days} day{days !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{booking.email}</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/cars" className="btn btn-primary">
              Book Another Car
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

