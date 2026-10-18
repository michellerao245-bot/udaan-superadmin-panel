import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompanyById } from '../services/companyService';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Backend se real data fetch karna
    getCompanyById(id)
      .then(response => {
        // Agar backend { data: {...} } format me bhej raha hai
        const realData = response.data || response; 
        
        if (realData && Object.keys(realData).length > 0) {
          console.log("Backend se aaya hua real data:", realData); // Debugging ke liye
          setCompany(realData);
        } else {
          setError("Is ID ka koi data backend me nahi mila.");
        }
      })
      .catch(err => {
        console.error("Backend API Error:", err);
        setError("Backend se data fetch nahi ho paya. Server down hai ya ID galat hai.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#3b82f6' }}>Real data load ho raha hai...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {error}
        </div>
        <Link to="/companies" style={{ color: '#3b82f6', fontWeight: 'bold' }}>← Back to Companies</Link>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div>
      {/* Back Button */}
      <Link to="/companies" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#3b82f6', textDecoration: 'none', marginBottom: '20px', fontWeight: 'bold' }}>
        ← Back to Companies
      </Link>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Column */}
        <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                {/* Backend fields mapping (Aapke Supabase columns ke hisaab se adjust karein) */}
                <h1 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '28px' }}>
                  {company.name || company.companyName || company.company_name || 'Name Not Provided'}
                </h1>
                <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>
                  Owner: <strong>{company.owner || company.ownerName || company.owner_name || 'N/A'}</strong>
                </p>
              </div>
              <span style={{ 
                padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold',
                backgroundColor: (company.status || 'Active').toLowerCase() === 'active' ? '#dcfce7' : '#fee2e2', 
                color: (company.status || 'Active').toLowerCase() === 'active' ? '#166534' : '#991b1b' 
              }}>
                {company.status || 'Unknown'}
              </span>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

            {/* Location / Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#475569' }}>
              <span style={{ fontSize: '20px' }}>📍</span>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>Company Location</h4>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                  {/* Yahan real location aayegi. Agar supabase me 'location' column hai toh wo lega, warna 'address' */}
                  {company.location || company.address || company.shop_address || 'Location Not Available in Database'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '18px' }}>Contact Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>📞 PHONE NUMBER</p>
                <a href={`tel:${(company.phone || company.phoneNumber || company.mobile || '').replace(/\s/g, '')}`} style={{ margin: 0, color: '#3b82f6', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}>
                  {company.phone || company.phoneNumber || company.mobile || 'N/A'}
                </a>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 5px 0', color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>✉️ EMAIL ADDRESS</p>
                <a href={`mailto:${company.email || company.emailAddress || ''}`} style={{ margin: 0, color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>
                  {company.email || company.emailAddress || 'N/A'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '1', minWidth: '280px' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderTop: '5px solid #8b5cf6' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '18px' }}>Subscription Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <p style={{ margin: '0 0 3px 0', color: '#64748b', fontSize: '13px' }}>Current Plan</p>
                <p style={{ margin: 0, color: '#1e293b', fontWeight: 'bold', fontSize: '16px' }}>{company.plan || company.planName || 'N/A'}</p>
              </div>
              
              <div>
                <p style={{ margin: '0 0 3px 0', color: '#64748b', fontSize: '13px' }}>Plan Expiry Date</p>
                <p style={{ margin: 0, color: '#dc2626', fontWeight: 'bold', fontSize: '16px' }}>{company.expiryDate || company.planExpiry || company.endDate || 'N/A'}</p>
              </div>
              
              <div>
                <p style={{ margin: '0 0 3px 0', color: '#64748b', fontSize: '13px' }}>Member Since</p>
                <p style={{ margin: 0, color: '#1e293b', fontWeight: 'bold', fontSize: '16px' }}>{company.createdAt || company.joinDate || 'N/A'}</p>
              </div>

              <div style={{ backgroundColor: '#ecfdf5', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                <p style={{ margin: '0 0 3px 0', color: '#047857', fontSize: '13px' }}>Total Revenue</p>
                <p style={{ margin: 0, color: '#047857', fontWeight: 'bold', fontSize: '24px' }}>₹{company.totalPaid || company.revenue || '0'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetails;