import React from 'react';

const ProjectInfoCard = ({
  location,
  fedFunds,
  avgPropertyValue,
  chartData
}) => {
  
  // Helper to format numbers as USD currency
  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="card-container">
      <header>
        <p className="subtitle" style={{ color: '#666' }}>{location}</p>
      </header>

      {/* Financial Info Section */}
      <section className="stats" style={{ margin: '20px 0' }}>
        <div className="stat-line">
          <strong>Fed. Funds: </strong> 
          {formatCurrency(fedFunds)} 
        </div>
        <div className="stat-line">
          <strong>Avg. Property Value: </strong> 
          {formatCurrency(avgPropertyValue)}
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-area">
        <h3 style={{ fontSize: '18px' }}>Prediction Chart</h3>
        <div className="placeholder-chart" style={{ height: '150px', borderBottom: '1px solid #ccc' }}>
          {/* Chart logic would go here */}
          <p style={{ color: '#ccc', paddingTop: '50px', textAlign: 'center' }}>
            [Line Chart Visualization]
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProjectInfoCard;