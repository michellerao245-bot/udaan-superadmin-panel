import { useState } from 'react';
import { Link } from 'react-router-dom';

const CompaniesTable = ({ companies, onBlock, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead style={{ backgroundColor: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '15px', fontWeight: '600' }}>Company Name</th>
              <th style={{ padding: '15px', fontWeight: '600' }}>Owner</th>
              <th style={{ padding: '15px', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', fontWeight: '600', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((company) => {
                const companyId = company.id || company._id;
                const status = company.status || 'Active';
                const isActive = status.toLowerCase() === 'active';
                
                return (
                  <tr key={companyId} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e293b' }}>{company.name || company.companyName}</td>
                    <td style={{ padding: '15px', color: '#64748b' }}>{company.owner || 'N/A'}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ 
                        padding: '5px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        backgroundColor: isActive ? '#dcfce7' : '#fee2e2', 
                        color: isActive ? '#166534' : '#991b1b' 
                      }}>
                        {status}
                      </span>
                    </td>
                    <td style={{ padding: '15px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {/* View Button */}
                      <Link 
                        to={`/companies/${companyId}`} 
                        style={{ padding: '6px 12px', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px' }}
                      >
                        View
                      </Link>
                      
                      {/* Edit Button */}
                      <button 
                        onClick={() => onEdit(company)}
                        style={{ padding: '6px 12px', backgroundColor: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>

                      {/* Block / Unblock Button */}
                      <button 
                        onClick={() => onBlock(company)}
                        style={{ 
                          padding: '6px 12px', 
                          backgroundColor: isActive ? '#fee2e2' : '#dcfce7', 
                          color: isActive ? '#dc2626' : '#166534', 
                          border: 'none', 
                          borderRadius: '5px', 
                          fontWeight: 'bold', 
                          fontSize: '12px', 
                          cursor: 'pointer' 
                        }}
                      >
                        {isActive ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                  Koi company nahi mili.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, companies.length)} of {companies.length} entries
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button 
                key={number} 
                onClick={() => paginate(number)}
                style={{ 
                  padding: '6px 12px', 
                  backgroundColor: currentPage === number ? '#3b82f6' : 'white', 
                  color: currentPage === number ? 'white' : '#334155',
                  border: '1px solid #cbd5e1', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontWeight: currentPage === number ? 'bold' : 'normal'
                }}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;