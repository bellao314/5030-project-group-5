import React from 'react';
import { CSSProperties } from 'react';
import { inherits } from 'util';

const ProjectInfoCard: React.FC<ProjectCardProps> = ({
  location,
  fedFunds,
  avgPropertyValue,
  // chartData
}) => {
  // Simple formatter for currency
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div style={{color: "black", backgroundColor: "white", borderColor: "gray", borderWidth: "1px", padding: "2%", borderRadius: "5%", maxWidth: "25%"}}>
      <section className="stats">
        <div className="stat-line" style={{marginBottom: "2%", fontSize: "150%"}}>
          <strong>{location}</strong>
        </div>
      </section>
      <section className="stats" style={{marginBottom: "2%"}}>
        <div className="stat-line" style={{marginBottom: "2%"}}>
          <strong>Fed. Funds:</strong> {formatCurrency(fedFunds)} 
        </div>
        <div className="stat-line" style={{marginBottom: "2%"}}>
          <strong>Avg. Property Value:</strong> {formatCurrency(avgPropertyValue)}
        </div>
      </section>

      <section className="chart-area">
        <strong>Prediction Chart</strong>
        {/* You would integrate a library like Recharts or Victory here */}
        <div className="placeholder-chart">
          <img src="https://s3.tradingview.com/snapshots/d/dwzWclLe.png" alt="placeholder chart" />
        </div>
      </section>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-icon">🔍</button>
      </div>
    </div>
  );
};

export default ProjectInfoCard;