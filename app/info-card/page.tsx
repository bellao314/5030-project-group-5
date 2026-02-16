import React from 'react';
import { CSSProperties } from 'react';
import { inherits } from 'util';

const InfoCard: React.FC<CardProps> = ({
  location,
  fedFunds,
  avgPropertyValue,
  // chartData
}) => {
  // Simple formatter for currency
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-gray-50 text-black border-gray-900 border-1 rounded-lg max-w-sm p-5">
      <section className="stats">
        <div className="stat-line mb-4 text-3xl">
          <strong>{location}</strong>
        </div>
      </section>
      <section className="stats mb-3">
        <div className="stat-line mb-3">
          <strong>Fed. Funds:</strong> {formatCurrency(fedFunds)} 
        </div>
        <div className="stat-line mb-3">
          <strong>Avg. Property Value:</strong> {formatCurrency(avgPropertyValue)}
        </div>
      </section>

      <section className="chart-area mb-3">
        <strong className="mb-3">Prediction Chart</strong>
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

export default InfoCard;