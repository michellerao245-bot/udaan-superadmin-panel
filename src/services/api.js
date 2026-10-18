// ==================== API CLIENT ==================== 
import axios from 'axios'; 

// Base URL set kiya gaya hai (Aapke code se syntax errors remove kar diye hain)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://udaanbackend-z5tw.vercel.app/api'; 

const api = axios.create({ 
  baseURL: API_BASE_URL, // Yahan variable name fix kiya hai
  headers: { 
    'Content-Type': 'application/json', 
  }, 
}); 

// ==================== REQUEST INTERCEPTOR ==================== 
api.interceptors.request.use( 
  (config) => { 
    // Har request ke sath token bhejega agar local storage me available ho
    const token = localStorage.getItem('udaan_token'); 
    if (token) { 
      config.headers.Authorization = `Bearer ${token}`; 
    } 
    return config; 
  }, 
  (error) => Promise.reject(error) 
); 

// ==================== RESPONSE INTERCEPTOR ==================== 
api.interceptors.response.use( 
  (response) => response, 
  (error) => { 
    // Agar token expire ho gaya (401), toh user ko logout kar ke login page pe bhejega
    if (error.response?.status === 401) { 
      localStorage.removeItem('udaan_token'); 
      localStorage.removeItem('udaan_user'); 
      window.location.href = '/'; 
    } 
    return Promise.reject(error); 
  } 
); 
 
export default api;