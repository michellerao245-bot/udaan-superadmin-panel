import { useNavigate } from 'react-router-dom';

const SubscriptionStatus = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginTop: '20px' }}>
      <h3 style={{ marginTop: 0, color: '#1e293b', marginBottom: '20px' }}>Subscription Overview</h3>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Active Plans Box (Non-clickable) */}
        <div style={{ flex: 1, minWidth: '150px', backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
          <h4 style={{ margin: 0, color: '#1e40af', fontSize: '15px' }}>Active Plans</h4>
          <h2 style={{ margin: '10px 0 0 0', color: '#1e40af', fontSize: '32px' }}>0</h2>
        </div>
        
        {/* Expired Plans Box (Clickable Button) */}
        <div 
          onClick={() => navigate('/expired-plans')}
          style={{ 
            flex: 1, 
            minWidth: '150px', 
            backgroundColor: '#fef2f2', 
            padding: '20px', 
            borderRadius: '8px', 
            textAlign: 'center', 
            border: '1px solid #fecaca',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <h4 style={{ margin: 0, color: '#991b1b', fontSize: '15px' }}>Expired Plans</h4>
          {/* Dummy count 3 hai, baad me API se aayega */}
          <h2 style={{ margin: '10px 0 0 0', color: '#991b1b', fontSize: '32px' }}>3</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#dc2626', fontWeight: 'bold' }}>Click to view details →</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;