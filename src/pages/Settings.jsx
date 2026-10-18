import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Current logged in user ka data
  const user = JSON.parse(localStorage.getItem('udaan_user')) || { email: 'admin@udaan.com' };

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: '#1e293b' }}>Settings</h1>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Settings Sidebar */}
        <div style={{ width: '250px', backgroundColor: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ width: '100%', textAlign: 'left', padding: '12px', backgroundColor: activeTab === 'profile' ? '#eff6ff' : 'transparent', color: activeTab === 'profile' ? '#2563eb' : '#475569', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '5px' }}
          >
            👤 Profile Settings
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            style={{ width: '100%', textAlign: 'left', padding: '12px', backgroundColor: activeTab === 'security' ? '#eff6ff' : 'transparent', color: activeTab === 'security' ? '#2563eb' : '#475569', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🔒 Security
          </button>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ marginTop: 0, color: '#334155' }}>Profile Settings</h2>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Update your admin profile details here.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Admin Name</label>
                  <input type="text" placeholder="Enter your name" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Email Address</label>
                  {/* Ab yeh box active hai, aap isme change kar sakte hain */}
                  <input type="email" defaultValue={user.email} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1', outline: 'none' }} />
                </div>
                <button style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content', marginTop: '10px' }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 style={{ marginTop: 0, color: '#334155' }}>Security Settings</h2>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Change your password here.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>New Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }} />
                </div>
                <button style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content', marginTop: '10px' }}>
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;