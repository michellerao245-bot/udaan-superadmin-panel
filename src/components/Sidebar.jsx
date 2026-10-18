import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', name: '📊 Dashboard' },
    { path: '/companies', name: '🏢 Companies' },
    { path: '/subscriptions', name: '💳 Subscriptions' },
    { path: '/payments', name: '💰 Payments' },
    { path: '/settings', name: '⚙️ Settings' },
  ];

  const handleLogout = () => {
    // Confirmation popup (Optional)
    if (window.confirm("Kya aap sach mein logout karna chahte hain?")) {
      navigate('/logout');
    }
  };

  return (
    <div style={{ width: '250px', backgroundColor: '#1e293b', color: 'white', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      
      {/* Top Section: Logo & Menu */}
      <div>
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #334155' }}>
          Udhaan Admin
        </div>
        <nav style={{ padding: '20px 10px' }}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              style={{
                display: 'block',
                padding: '12px 15px',
                color: location.pathname === item.path ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                borderRadius: '8px',
                backgroundColor: location.pathname === item.path ? '#334155' : 'transparent',
                marginBottom: '10px',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section: Logout Button */}
      <div style={{ padding: '20px 10px' }}>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px 15px',
            backgroundColor: '#ef4444', // Red color
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }}
        >
          🚪 Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;