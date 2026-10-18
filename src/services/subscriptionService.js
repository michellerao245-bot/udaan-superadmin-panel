import api from './api'; // Apna axios instance import kiya

// 1. Saari subscriptions ki list lana (Get All)
export const getSubscriptions = async () => {
  try {
    const response = await api.get('/subscriptions');
    // Agar backend { data: [...] } format mein bhej raha hai, toh response.data.data karein
    return response.data; 
  } catch (error) {
    console.error("Subscriptions fetch karne mein error aaya:", error);
    throw error;
  }
};

// 2. Kisi ek specific subscription ki details lana (Get by ID)
export const getSubscriptionById = async (id) => {
  try {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Subscription ID ${id} fetch karne mein error aaya:`, error);
    throw error;
  }
};

// 3. Nayi subscription create karna / Plan assign karna (Create)
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await api.post('/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    console.error("Nayi subscription create karne mein error aaya:", error);
    throw error;
  }
};

// 4. Subscription update karna (e.g., Plan change, Renew)
export const updateSubscription = async (id, updatedData) => {
  try {
    const response = await api.put(`/subscriptions/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Subscription ID ${id} update karne mein error aaya:`, error);
    throw error;
  }
};

// 5. Subscription ka status update karna (Cancel / Pause / Resume)
export const updateSubscriptionStatus = async (id, statusData) => {
  try {
    // Yahan PATCH use kar rahe hain kyunki sirf status change ho raha hai
    const response = await api.patch(`/subscriptions/${id}`, statusData);
    return response.data;
  } catch (error) {
    console.error(`Subscription ID ${id} ka status update karne mein error aaya:`, error);
    throw error;
  }
};

// 6. Subscription ko delete karna
export const deleteSubscription = async (id) => {
  try {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Subscription ID ${id} delete karne mein error aaya:`, error);
    throw error;
  }
};