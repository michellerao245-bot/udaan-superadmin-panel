const StatsCards = ({ title, value, color }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, borderLeft: `5px solid ${color}` }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>{title}</h4>
      <h2 style={{ margin: 0, color: '#1e293b', fontSize: '28px' }}>{value}</h2>
    </div>
  );
};

export default StatsCards;