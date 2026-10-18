import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Token aur User data clear karein
    localStorage.removeItem('udaan_token');
    localStorage.removeItem('udaan_user');
    
    // Login page par redirect karein
    navigate('/login');
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f8' }}>
      <h2 style={{ color: '#334155' }}>Logging out...</h2>
    </div>
  );
};

export default Logout;