import { Routes, Route, Outlet, Navigate } from 'react-router-dom'; 
import Sidebar from './components/Sidebar'; 
import Header from './components/Header'; 
import Login from './pages/Login'; 
import Logout from './pages/Logout';  
import Settings from './pages/Settings';  
import Dashboard from './pages/Dashboard'; 
import Companies from './pages/Companies'; 
import CompanyDetails from './pages/CompanyDetails'; 
import Payments from './pages/Payments'; 
import Subscriptions from './pages/Subscriptions'; 
import ExpiredPlans from './pages/ExpiredPlans'; // ✅ Naya Page Import kiya

// Protected Layout 
const DashboardLayout = () => { 
  const token = localStorage.getItem('udaan_token'); 
   
  if (!token) { 
    return <Navigate to="/login" replace />; 
  } 
 
  return ( 
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}> 
      <Sidebar /> 
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> 
        <Header /> 
        <main style={{ padding: '20px', overflowY: 'auto' }}> 
          <Outlet /> 
        </main> 
      </div> 
    </div> 
  ); 
}; 
 
function App() { 
  return ( 
    <Routes> 
      {/* Public Routes - Comment syntax fixed */}
      <Route path="/login" element={<Login />} /> 
      <Route path="/logout" element={<Logout />} /> 
 
      {/* Protected Routes */}
      <Route element={<DashboardLayout />}> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/companies" element={<Companies />} /> 
        <Route path="/companies/:id" element={<CompanyDetails />} /> 
        <Route path="/payments" element={<Payments />} /> 
        <Route path="/subscriptions" element={<Subscriptions />} /> 
        <Route path="/settings" element={<Settings />} />  
        
        {/* ✅ Naya Route Add kiya */}
        <Route path="/expired-plans" element={<ExpiredPlans />} /> 
      </Route> 
    </Routes> 
  ); 
} 
 
export default App;