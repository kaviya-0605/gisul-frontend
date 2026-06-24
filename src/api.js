import axios from 'axios'

// Uses VITE_API_BASE_URL from .env (falls back to localhost for local dev)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
})

export default api
