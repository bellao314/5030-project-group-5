import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the prediction chart
const data = [
  { year: 2016, value: 150 },
  { year: 2020, value: 180 },
  { year: 2024, value: 210 },
  { year: 2028, value: 245 },
  { year: 2030, value: 270 },
];

const formatCurrency = (value) => {
  const numericValue = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(numericValue)) {
    return '--';
  }

  return `$${numericValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

const InfoCard = ({
  zipCode,
  city,
  countyName,
  beforeValue,
  afterValue,
  beforeLabel,
  afterLabel,
  isLoading,
  error
}) => {
  return (
    <div className="info-card">
      <h2 className="card-title">Zip Code: {zipCode || 'Select Area'}</h2>
      {(city || countyName) && (
        <p>{[city, countyName].filter(Boolean).join(', ')}</p>
      )}
      
      <div className="stats-section">
        {isLoading ? (
          <div className="stat-row">
            <span>Loading property data...</span>
          </div>
        ) : error ? (
          <div className="stat-row">
            <span>{error}</span>
          </div>
        ) : (
          <>
            <div className="stat-row">
              <span>Property Value Before Tornado ({beforeLabel}):</span>
              <span className="stat-value">{formatCurrency(beforeValue)}</span>
            </div>
            <div className="stat-row">
              <span>Property Value After Tornado ({afterLabel}):</span>
              <span className="stat-value">{formatCurrency(afterValue)}</span>
            </div>
          </>
        )}
      </div>

      <div className="chart-section">
        <h3>Prediction Chart</h3>
        <div style={{ width: '100%', height: 150 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" fontSize={10} tickMargin={5} />
              <YAxis hide={true} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="zoom-hint">← Zoom in for more info →</p>
      </div>
    </div>
  );
};

export default InfoCard;