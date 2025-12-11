import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🚗</span>
          <span className="logo-text">Ashish Rental</span>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              className={location.pathname === '/cars' ? 'active' : ''}
            >
              Browse Cars
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

