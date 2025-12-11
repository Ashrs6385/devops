import { Link } from 'react-router-dom'
import { getHeroImage } from '../utils/carImages'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Ride</h1>
          <p className="hero-subtitle">
            Explore our wide selection of premium vehicles at unbeatable prices
          </p>
          <div className="hero-buttons">
            <Link to="/cars" className="btn btn-primary">
              Browse Cars
            </Link>
            <Link to="/cars" className="btn btn-secondary">
              View Deals
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive rates with no hidden fees</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Easy Booking</h3>
              <p>Simple and fast reservation process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Fully Insured</h3>
              <p>All vehicles come with comprehensive coverage</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Cars</h3>
              <p>Well-maintained vehicles from top brands</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

