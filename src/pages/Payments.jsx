import { useState, useEffect } from 'react';
import { getPayments } from '../services/paymentService';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      
      // Backend response ke hisaab se adjust karein (data ya data.data)
      setPayments(data); 
      setError(null);
    } catch (err) {
      setError("Payments load nahi ho paye. Backend connection check karein.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading payments...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>Payment History</h1>
      
      {payments.length === 0 ? (
        <p>Abhi tak koi payment record nahi hai.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <thead style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Transaction ID</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Company</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Amount</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Date</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id || p._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                {/* Note: 'p.id || p._id' isliye likha hai kyunki MongoDB wale _id bhejte hain aur SQL wale id */}
                <td style={{ padding: '15px' }}>{p.id || p._id || p.transactionId}</td>
                <td style={{ padding: '15px' }}>{p.companyName || p.company}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>₹{p.amount}</td>
                <td style={{ padding: '15px' }}>{new Date(p.createdAt || p.date).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '5px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    backgroundColor: p.status === 'Success' || p.status === 'success' ? '#dcfce7' : p.status === 'Pending' || p.status === 'pending' ? '#fef3c7' : '#fee2e2', 
                    color: p.status === 'Success' || p.status === 'success' ? '#166534' : p.status === 'Pending' || p.status === 'pending' ? '#92400e' : '#991b1b' 
                  }}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;