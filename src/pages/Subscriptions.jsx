import { useState, useEffect } from 'react';
import { getSubscriptions } from '../services/subscriptionService';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data fetch karne ka function
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptions();
      
      // Backend response handle karein (Direct array ya { data: [] })
      setSubscriptions(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setError("Subscriptions load nahi ho payin. Backend connection check karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold', fontSize: '18px' }}>
        Subscriptions load ho rahi hain...
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '8px' }}>
          {error}
        </div>
        <button 
          onClick={fetchSubscriptions}
          style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, color: '#1e293b' }}>Active Subscriptions</h1>
        <button 
          onClick={fetchSubscriptions}
          style={{ padding: '10px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* No Data State */}
      {subscriptions.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', color: '#64748b' }}>
          Abhi tak koi subscription active nahi hai.
        </div>
      ) : (
        /* Subscriptions Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {subscriptions.map((sub) => {
            // Backend field names ke hisaab se adjust karein
            const companyName = sub.companyName || sub.company || sub.company_name || 'Unknown Company';
            const planName = sub.plan || sub.planName || 'Standard';
            const price = sub.price || sub.amount || 'N/A';
            const status = sub.status || 'Active';
            const expiryDate = sub.expiry || sub.expiryDate || sub.endDate;

            return (
              <div 
                key={sub.id || sub._id} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '25px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  borderTop: '5px solid #8b5cf6',
                  position: 'relative'
                }}
              >
                {/* Status Badge */}
                <span style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: status.toLowerCase() === 'active' ? '#dcfce7' : '#fee2e2',
                  color: status.toLowerCase() === 'active' ? '#166534' : '#991b1b'
                }}>
                  {status}
                </span>

                <h3 style={{ margin: '0 0 15px 0', color: '#1e293b', fontSize: '18px', paddingRight: '60px' }}>
                  {companyName}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#475569' }}>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#334155' }}>Plan:</strong> {planName}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#334155' }}>Price:</strong> ₹{price}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#334155' }}>Expires:</strong> {expiryDate ? new Date(expiryDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <button style={{ flex: 1, padding: '8px', backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                    Renew
                  </button>
                  <button style={{ flex: 1, padding: '8px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;