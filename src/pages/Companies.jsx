import { useState, useEffect } from 'react';
import CompaniesTable from '../components/CompaniesTable';
import { getCompanies } from '../services/companyService';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    setLoading(true);
    setError(null);
    
    getCompanies()
      .then(response => {
        // Backend response handle (Array ya { data: [] })
        const realData = Array.isArray(response) ? response : (response.data || []);
        console.log("Companies from Backend:", realData); // Debugging
        setCompanies(realData);
      })
      .catch(err => {
        console.error("Backend API Failed:", err);
        setError("Companies load nahi ho payi. Backend connection check karein.");
        setCompanies([]);
      })
      .finally(() => setLoading(false));
  };

  // Block / Unblock Logic
  const handleBlock = (company) => {
    const isActive = company.status?.toLowerCase() === 'active';
    const actionText = isActive ? 'block' : 'unblock';

    if (window.confirm(`Kya aap sach mein is company ko ${actionText} karna chahte hain?`)) {
      // Backend API call yahan aayegi baad me (updateCompanyStatus)
      const updatedCompanies = companies.map(comp => {
        const compId = comp.id || comp._id;
        const targetId = company.id || company._id;
        
        if (compId === targetId) {
          return { ...comp, status: isActive ? 'Inactive' : 'Active' };
        }
        return comp;
      });
      setCompanies(updatedCompanies);
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany({ ...company }); 
    setIsModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Backend API call yahan aayegi baad me (updateCompany)
    const updatedCompanies = companies.map(comp => {
      const compId = comp.id || comp._id;
      const editId = editingCompany.id || editingCompany._id;
      if (compId === editId) return editingCompany; 
      return comp;
    });
    setCompanies(updatedCompanies);
    setIsModalOpen(false);
  };

  const filteredCompanies = companies.filter(company => 
    (company.name || company.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.owner || company.ownerName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e293b' }}>Registered Companies</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Total {companies.length} companies</p>
        </div>
        
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search company or owner..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 15px 10px 35px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', width: '280px', fontSize: '14px', backgroundColor: 'white' }}
          />
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {error}
          <button onClick={fetchCompanies} style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #991b1b', backgroundColor: 'transparent', color: '#991b1b', fontWeight: 'bold' }}>Retry</button>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#3b82f6' }}>Backend se data load ho raha hai...</div>
      ) : (
        <CompaniesTable 
          companies={filteredCompanies} 
          onBlock={handleBlock} 
          onEdit={handleEditClick} 
        />
      )}

      {/* Edit Modal */}
      {isModalOpen && editingCompany && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginTop: 0, color: '#1e293b' }}>Edit Company</h2>
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Company Name</label>
                <input type="text" value={editingCompany.name || editingCompany.companyName || ''} onChange={(e) => setEditingCompany({...editingCompany, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Owner Name</label>
                <input type="text" value={editingCompany.owner || editingCompany.ownerName || ''} onChange={(e) => setEditingCompany({...editingCompany, owner: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Phone Number</label>
                <input type="text" value={editingCompany.phone || editingCompany.phoneNumber || ''} onChange={(e) => setEditingCompany({...editingCompany, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;