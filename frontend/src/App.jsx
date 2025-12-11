import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

