import api from './api'; // Apni api.js file import ki

// 1. Saari companies ki list lana (Get All)
export const getCompanies = async () => {
  try {
    const response = await api.get('/companies');
    // Agar backend { data: [...] } bhej raha hai toh response.data.data karein
    return response.data; 
  } catch (error) {
    console.error("Companies fetch karne mein error aaya:", error);
    throw error;
  }
};

// 2. Kisi ek specific company ki details lana (Get by ID)
export const getCompanyById = async (id) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Company ID ${id} fetch karne mein error aaya:`, error);
    throw error;
  }
};

// 3. Nayi company add karna (Create)
export const createCompany = async (companyData) => {
  try {
    const response = await api.post('/companies', companyData);
    return response.data;
  } catch (error) {
    console.error("Nayi company add karne mein error aaya:", error);
    throw error;
  }
};

// 4. Company ki details update karna (Update)
export const updateCompany = async (id, updatedData) => {
  try {
    // Kuch backends PUT use karte hain, kuch PATCH. Filhal PUT use kar rahe hain.
    const response = await api.put(`/companies/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Company ID ${id} update karne mein error aaya:`, error);
    throw error;
  }
};

// 5. Company ko delete karna (Delete)
export const deleteCompany = async (id) => {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Company ID ${id} delete karne mein error aaya:`, error);
    throw error;
  }
};