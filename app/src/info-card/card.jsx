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

const InfoCard = ({ zipCode, fedFunds, propertyValue }) => {
  return (
    <div className="info-card">
      <h2 className="card-title">Zip Code: {zipCode || 'Select Area'}</h2>
      
      <div className="stats-section">
        <div className="stat-row">
          <span>Fed. Funds:</span>
          <span className="stat-value">${fedFunds?.toLocaleString() || '--'}</span>
        </div>
        <div className="stat-row">
          <span>Avg. Property Value:</span>
          <span className="stat-value">${propertyValue?.toLocaleString() || '--'}</span>
        </div>
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