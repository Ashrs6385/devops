import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getCars = async () => {
  try {
    const response = await api.get('/cars')
    return response.data
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching car:', error)
    throw error
  }
}

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData)
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking:', error)
    throw error
  }
}

export default api

