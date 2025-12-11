import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getPool, initDatabase } from './config/database.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Rental API is running!',
    endpoints: {
      health: '/health',
      cars: '/api/cars',
      bookings: '/api/bookings'
    }
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/cars', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.query(
      'SELECT * FROM cars WHERE available = true ORDER BY brand, model'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching cars:', error)
    res.status(500).json({ error: 'Failed to fetch cars' })
  }
})

app.get('/api/cars/:id', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [
      req.params.id
    ])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching car:', error)
    res.status(500).json({ error: 'Failed to fetch car' })
  }
})

app.post('/api/bookings', async (req, res) => {
  try {
    const { carId, startDate, endDate, customerName, email, phone } = req.body

    if (!carId || !startDate || !endDate || !customerName || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const pool = getPool()
    const carResult = await pool.query('SELECT * FROM cars WHERE id = $1', [
      carId
    ])

    if (carResult.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    if (!carResult.rows[0].available) {
      return res.status(400).json({ error: 'Car is not available' })
    }

    const conflictCheck = await pool.query(
      `SELECT id FROM bookings 
       WHERE carId = $1 
       AND (
         (startDate <= $2 AND endDate >= $2) OR
         (startDate <= $3 AND endDate >= $3) OR
         (startDate >= $2 AND endDate <= $3)
       )`,
      [carId, startDate, endDate]
    )

    if (conflictCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ error: 'Car is already booked for selected dates' })
    }

    const result = await pool.query(
      `INSERT INTO bookings (carId, startDate, endDate, customerName, email, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [carId, startDate, endDate, customerName, email, phone || null]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.query(
      `SELECT b.*, c.brand, c.model, c.type, c.pricePerDay
       FROM bookings b
       JOIN cars c ON b.carId = c.id
       WHERE b.id = $1`,
      [req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    const booking = result.rows[0]

    res.json({
      id: booking.id,
      carId: booking.carid,
      startDate: booking.startdate,
      endDate: booking.enddate,
      customerName: booking.customername,
      email: booking.email,
      phone: booking.phone,
      createdAt: booking.createdat,
      car: {
        brand: booking.brand,
        model: booking.model,
        type: booking.type,
        pricePerDay: booking.priceperday
      }
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({ error: 'Failed to fetch booking' })
  }
})

app.get('/api/bookings', async (req, res) => {
  try {
    const pool = getPool()
    const result = await pool.query(
      `SELECT b.*, c.brand, c.model
       FROM bookings b
       JOIN cars c ON b.carId = c.id
       ORDER BY b.createdAt DESC`
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const startServer = async () => {
  try {
    await initDatabase()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

