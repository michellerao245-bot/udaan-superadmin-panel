import { Link } from 'react-router-dom';

const ExpiredPlans = () => {
  // Filhal Dummy Data (Baad me backend API se aayega)
  const expiredPlansData = [
    { 
      id: 1, 
      company: 'Tech Solutions', 
      owner: 'Rahul Sharma',
      phone: '+91 98765 43210', 
      expiryDate: '2023-10-15', 
      reason: 'Payment Failed (Card Declined)' 
    },
    { 
      id: 2, 
      company: 'ShopEasy India', 
      owner: 'Priya Singh',
      phone: '+91 91234 56789', 
      expiryDate: '2023-10-20', 
      reason: 'User Cancelled Subscription' 
    },
    { 
      id: 3, 
      company: 'Global Traders', 
      owner: 'Amit Kumar',
      phone: '+91 99887 76655', 
      expiryDate: '2023-10-22', 
      reason: 'Plan Expired (No Renewal)' 
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to="/" style={{ padding: '8px 12px', backgroundColor: 'white', borderRadius: '5px', textDecoration: 'none', color: '#334155', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            ← Back
          </Link>
          <h1 style={{ margin: 0, color: '#1e293b' }}>Expired Plans Details</h1>
        </div>
        <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
          Total Expired: {expiredPlansData.length}
        </span>
      </div>

      {/* Details Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f8fafc', textAlign: 'left', color: '#475569' }}>
              <tr>
                <th style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>Company & Owner</th>
                <th style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>Contact Number</th>
                <th style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>Expiry Date</th>
                <th style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>Reason</th>
                <th style={{ padding: '15px', borderBottom: '2px solid #e2e8f0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {expiredPlansData.map((plan) => (
                <tr key={plan.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{plan.company}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{plan.owner}</div>
                  </td>
                  <td style={{ padding: '15px', color: '#3b82f6', fontWeight: 'bold' }}>{plan.phone}</td>
                  <td style={{ padding: '15px', color: '#64748b' }}>{plan.expiryDate}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                      {plan.reason}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    {/* Yahan Call Now button hai jo direct phone dialer kholega mobile me */}
                    <a 
                      href={`tel:${plan.phone.replace(/\s/g, '')}`} 
                      style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px' }}
                    >
                      📞 Call Now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpiredPlans;