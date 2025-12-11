import { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import { getCars } from '../services/api'
import '../styles/Cars.css'

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadCars()
  }, [])

  const loadCars = async () => {
    try {
      setLoading(true)
      const data = await getCars()
      setCars(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to load cars. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCars =
    filter === 'all'
      ? cars
      : cars.filter(
          (car) => car.type && car.type.toLowerCase() === filter.toLowerCase()
        )

  if (loading) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="loading-state">
            <p>Loading cars...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={loadCars} className="btn btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cars-page">
      <div className="container">
        <div className="page-header">
          <h1>Available Cars</h1>
          <p className="page-subtitle">
            Choose from {cars.length} available vehicles
          </p>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'sedan' ? 'active' : ''}`}
            onClick={() => setFilter('sedan')}
          >
            Sedan
          </button>
          <button
            className={`filter-btn ${filter === 'suv' ? 'active' : ''}`}
            onClick={() => setFilter('suv')}
          >
            SUV
          </button>
          <button
            className={`filter-btn ${filter === 'sports' ? 'active' : ''}`}
            onClick={() => setFilter('sports')}
          >
            Sports
          </button>
          <button
            className={`filter-btn ${filter === 'luxury' ? 'active' : ''}`}
            onClick={() => setFilter('luxury')}
          >
            Luxury
          </button>
        </div>

        <div className="cars-grid">
          {filteredCars.length ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="no-cars">
              <p>No cars found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cars

