import { useState, useEffect } from 'react';
import StatsCards from '../components/StatsCards';
import SubscriptionStatus from '../components/SubscriptionStatus';
import { getCompanies } from '../services/companyService';

const Dashboard = () => {
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se companies ka data lana
    getCompanies()
      .then(data => {
        // Agar data array hai toh length nikalenge
        const count = Array.isArray(data) ? data.length : (data.data ? data.data.length : 0);
        setCompanyCount(count);
      })
      .catch(err => {
        console.error("Dashboard data fetch error:", err);
        setCompanyCount(0); // Error aane par 0 dikhaye
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatsCards title="Total Companies" value={loading ? "..." : companyCount} color="#3b82f6" />
        
        {/* Abhi ke liye yeh 0 hain, baad me backend se connect honge */}
        <StatsCards title="Total Revenue" value="₹0" color="#10b981" />
        <StatsCards title="Active Users" value="0" color="#f59e0b" />
      </div>

      <SubscriptionStatus />
    </div>
  );
};

export default Dashboard;