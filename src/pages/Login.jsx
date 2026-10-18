import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api'; // Abhi ke liye backend call band hai

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // ==========================================
    // TEMPORARY MOCK LOGIN (Bina Backend ke test karne ke liye)
    // ==========================================
    setTimeout(() => {
      // Direct token aur user save kar rahe hain
      localStorage.setItem('udaan_token', 'dummy-token-12345');
      localStorage.setItem('udaan_user', JSON.stringify({ email: email || 'admin@udaan.com', name: 'Super Admin' }));
      
      // Dashboard par bhej dein
      navigate('/');
      setLoading(false);
    }, 1000); // 1 second ka loading dikhayega

    /* 
    // ==========================================
    // REAL BACKEND LOGIN (Jab backend ready ho jaye tab uncomment karein)
    // ==========================================
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('udaan_token', token);
      localStorage.setItem('udaan_user', JSON.stringify(response.data.user || { email }));
      navigate('/');
    } catch (err) {
      alert("Backend Login Failed!");
    }
    */
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#1e293b', fontSize: '28px', fontWeight: '800' }}>Udaan</h1>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Super Admin Panel Login</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@udaan.com"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '15px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 45px 12px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '15px' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
              >
                {showPassword ? '🔒' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '14px', backgroundColor: loading ? '#94a3b8' : '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;