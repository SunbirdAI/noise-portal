import React from 'react';
import { formatDate } from '../../utils';

const AIPopupContent = ({ inference, environment, location }) => {
  const probabilityPercent = (inference.inference_probability * 100).toFixed(0);
  
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
          {environment.device}
        </h3>
        <div style={{
          fontSize: '11px',
          color: '#666',
          marginBottom: '2px'
        }}>
          Last Updated: {formatDate(environment.created_at)}
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
          <span>Sound Pressure</span>
          <span style={{ fontWeight: '600' }}>{environment.db_level} dB</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Upper limit - day</span>
          <span style={{ fontWeight: '600' }}>{location.day_limit} dB</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Upper limit - night</span>
          <span style={{ fontWeight: '600' }}>{location.night_limit} dB</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Temperature</span>
          <span style={{ fontWeight: '600' }}>{environment.temperature}°C</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Pressure</span>
          <span style={{ fontWeight: '600' }}>{environment.pressure} hPa</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Humidity</span>
          <span style={{ fontWeight: '600' }}>{environment.humidity}%</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Inferred Class</span>
          <span style={{ 
            fontWeight: '600',
            textTransform: 'capitalize'
          }}>
            {inference.inference_class}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Inferred Probability</span>
          <span style={{ fontWeight: '600' }}>{probabilityPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export default AIPopupContent;