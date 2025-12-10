import React from 'react';
import { formatDate } from '../../utils';

const MCUPopupContent = ({ data, location }) => {
  // Find the latest metric based on time_uploaded
  const getLatestMetric = (metrics) => {
    if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    
    return metrics.sort((a, b) => new Date(b.time_uploaded) - new Date(a.time_uploaded))[0];
  };

  const latestMetric = getLatestMetric(data.get_metrics);

  if (!latestMetric) {
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <p style={{ color: '#666', margin: 0 }}>No metric data available</p>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      lineHeight: '1.4',
      color: '#333',
      minWidth: '180px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <h3 style={{
          margin: '0 0 4px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: '#000'
        }}>
          {data.device_id}
        </h3>
        <div style={{
          fontSize: '11px',
          color: '#666',
          marginBottom: '2px'
        }}>
          Last Updated: {formatDate(latestMetric.time_uploaded)}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#666'
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Data Rows */}
      <div style={{ display: 'grid', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Instantaneous dB level:</span>
          <span style={{ fontWeight: '600' }}>{latestMetric.db_level.toFixed(0)} dB</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Average dB level:</span>
          <span style={{ fontWeight: '600' }}>{latestMetric.avg_db_level.toFixed(0)} dB</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Max dB level:</span>
          <span style={{ fontWeight: '600' }}>{latestMetric.max_db_level.toFixed(0)} dB</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Number of exceedances</span>
          <span style={{ fontWeight: '600' }}>{latestMetric.no_of_exceedances}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b>In the last hour</b></span>
          <span></span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Upper limit - day</span>
          <span style={{ fontWeight: '600' }}>{location.day_limit} dB</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Upper limit - night</span>
          <span style={{ fontWeight: '600' }}>{location.night_limit} dB</span>
        </div>
      </div>
    </div>
  );
};

export default MCUPopupContent;