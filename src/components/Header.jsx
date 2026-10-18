import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // User data nikalne ki koshish (agar login hai toh)
  const user = JSON.parse(localStorage.getItem('udaan_user')) || { email: 'Admin User' };

  const handleLogout = () => {
    // Token aur user clear kar dein
    localStorage.removeItem('udaan_token');
    localStorage.removeItem('udaan_user');
    // Login page par redirect karein
    navigate('/login');
  };

  return (
    <header style={{ backgroundColor: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative', zIndex: 10 }}>
      <h2 style={{ margin: 0, color: '#333' }}>Super Admin Panel</h2>
      
      {/* User Profile Section */}
      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', padding: '5px 10px', borderRadius: '8px', transition: 'background 0.2s' }}
        >
          <span style={{ fontWeight: 'bold', color: '#555' }}>{user.email || user.name || 'Admin User'}</span>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' }}>
            A
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div style={{ 
            position: 'absolute', 
            top: '55px', 
            right: '0', 
            backgroundColor: 'white', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
            borderRadius: '8px', 
            width: '200px', 
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ padding: '12px 15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b' }}>
              Signed in as <br/><strong style={{ color: '#1e293b' }}>{user.email || 'admin@udaan.com'}</strong>
            </div>
            
            <button 
              onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
              style={{ width: '100%', textAlign: 'left', padding: '12px 15px', background: 'none', border: 'none', borderBottom: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '14px', color: '#334155' }}
            >
              👤 My Profile
            </button>

            <button 
              onClick={handleLogout}
              style={{ width: '100%', textAlign: 'left', padding: '12px 15px', background: '#fef2f2', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#dc2626', fontWeight: 'bold' }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;