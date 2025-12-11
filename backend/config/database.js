import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

let pool = null

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      database: process.env.PGDATABASE || 'carrental',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      ssl: process.env.PGHOST ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }

  return pool
}

async function ensureDatabaseExists() {
  const dbName = process.env.PGDATABASE || 'carrental'
  const defaultDb = 'postgres' // Try postgres first, fallback to template1
  
  // Try to connect to default database to create our target database
  let adminPool = null
  try {
    adminPool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      database: defaultDb,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      ssl: process.env.PGHOST ? { rejectUnauthorized: false } : false,
    })
    
    await adminPool.query('SELECT NOW()')
  } catch (err) {
    // If postgres doesn't exist, try template1
    if (err.code === '3D000' && defaultDb === 'postgres') {
      try {
        adminPool = new Pool({
          host: process.env.PGHOST || 'localhost',
          port: process.env.PGPORT || 5432,
          database: 'template1',
          user: process.env.PGUSER || 'postgres',
          password: process.env.PGPASSWORD || 'postgres',
          ssl: process.env.PGHOST ? { rejectUnauthorized: false } : false,
        })
        await adminPool.query('SELECT NOW()')
      } catch (err2) {
        console.warn('Could not connect to default database, assuming target database exists')
        return // Give up and let the main connection try
      }
    } else {
      console.warn('Could not connect to default database, assuming target database exists')
      return
    }
  }

  try {
    // Check if database exists
    const result = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    )
    
    if (result.rows.length === 0) {
      // Database doesn't exist, create it
      // Escape database name to prevent SQL injection (though it comes from env var)
      const escapedDbName = dbName.replace(/"/g, '""') // Escape double quotes
      console.log(`Database '${dbName}' does not exist. Creating it...`)
      await adminPool.query(`CREATE DATABASE "${escapedDbName}"`)
      console.log(`Database '${dbName}' created successfully!`)
    } else {
      console.log(`Database '${dbName}' already exists`)
    }
  } catch (err) {
    console.warn(`Could not create database '${dbName}':`, err.message)
    // Continue anyway - maybe it exists or will be created manually
  } finally {
    if (adminPool) {
      await adminPool.end()
    }
  }
}

export async function initDatabase() {
  // First, ensure the database exists
  await ensureDatabaseExists()
  
  const pool = getPool()

  try {
    await pool.query('SELECT NOW()')
    console.log('Database connection established')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        type VARCHAR(50),
        seats INTEGER,
        pricePerDay DECIMAL(10,2) NOT NULL,
        image TEXT,
        available BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        carId INTEGER REFERENCES cars(id) ON DELETE CASCADE,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        customerName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_bookings_carId
      ON bookings(carId)
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_bookings_dates
      ON bookings(startDate, endDate)
    `)

    const carCount = await pool.query('SELECT COUNT(*) FROM cars')
    if (parseInt(carCount.rows[0].count, 10) === 0) {
      const sampleCars = [
        ['Toyota', 'Camry', 'Sedan', 5, 45.0],
        ['Honda', 'Accord', 'Sedan', 5, 48.0],
        ['Ford', 'Mustang', 'Sports', 4, 75.0],
        ['BMW', '3 Series', 'Luxury', 5, 95.0],
        ['Mercedes-Benz', 'C-Class', 'Luxury', 5, 100.0],
        ['Jeep', 'Wrangler', 'SUV', 5, 65.0],
        ['Toyota', 'RAV4', 'SUV', 5, 55.0],
        ['Nissan', 'Altima', 'Sedan', 5, 42.0],
        ['Chevrolet', 'Corvette', 'Sports', 2, 120.0],
        ['Audi', 'A4', 'Luxury', 5, 90.0]
      ]

      for (const [brand, model, type, seats, price] of sampleCars) {
        await pool.query(
          `INSERT INTO cars (brand, model, type, seats, pricePerDay)
           VALUES ($1, $2, $3, $4, $5)`,
          [brand, model, type, seats, price]
        )
      }

      console.log('Sample cars inserted')
    }
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}

