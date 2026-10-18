import api from './api'; // Apni api.js file import ki

// 1. Saari payments ki history lana (Get All Payments)
export const getPayments = async () => {
  try {
    const response = await api.get('/payments');
    // Agar backend { data: [...] } format mein bhej raha hai, toh response.data.data karein
    return response.data; 
  } catch (error) {
    console.error("Payments fetch karne mein error aaya:", error);
    throw error;
  }
};

// 2. Kisi ek specific payment/transaction ki details lana (Get by ID)
export const getPaymentById = async (id) => {
  try {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Payment ID ${id} fetch karne mein error aaya:`, error);
    throw error;
  }
};

// 3. Nayi payment record create karna (Create Payment / Manual Entry)
export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error("Nayi payment create karne mein error aaya:", error);
    throw error;
  }
};

// 4. Payment ka status update karna (e.g., Pending se Success, ya Refund)
export const updatePaymentStatus = async (id, statusData) => {
  try {
    // Yahan hum PATCH use kar rahe hain kyunki sirf status change ho raha hai
    const response = await api.patch(`/payments/${id}`, statusData);
    return response.data;
  } catch (error) {
    console.error(`Payment ID ${id} ka status update karne mein error aaya:`, error);
    throw error;
  }
};

// 5. Payment record delete karna (Agar zaroorat ho)
export const deletePayment = async (id) => {
  try {
    const response = await api.delete(`/payments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Payment ID ${id} delete karne mein error aaya:`, error);
    throw error;
  }
};