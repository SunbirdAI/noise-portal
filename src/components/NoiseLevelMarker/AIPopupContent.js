import React from 'react';
import { formatDate } from '../../utils';

const AIPopupContent = ({ inference, environment, location }) => {
  const probabilityPercent = (inference.inference_probability * 100).toFixed(1);
  
  // Function to get color based on sound class
  const getClassColor = (className) => {
    const colors = {
      'traffic': '#ef4444',
      'construction': '#f97316',
      'music': '#8b5cf6',
      'speech': '#06b6d4',
      'nature': '#10b981',
      'silence': '#6b7280'
    };
    return colors[className?.toLowerCase()] || '#6b7280';
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      lineHeight: '1.4'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{
            fontWeight: '600',
            color: '#1e293b',
            fontSize: '14px'
          }}>
            AI Sensor
          </span>
          <span style={{
            backgroundColor: '#8b5cf6',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '500'
          }}>
            AI ENABLED
          </span>
        </div>
        <p style={{
          margin: 0,
          color: '#64748b',
          fontSize: '12px'
        }}>
          <strong>Last Updated:</strong> {formatDate(environment.created_at)}
        </p>
      </div>

      {/* Sound Analysis Section */}
      <div style={{
        backgroundColor: '#fef3f2',
        borderLeft: '4px solid #ef4444',
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '0 6px 6px 0'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          color: '#dc2626',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          Sound Analysis
        </h4>
        <div style={{ display: 'grid', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Sound Level:</span>
            <span style={{
              fontWeight: '600',
              color: environment.db_level > location.day_limit ? '#dc2626' : '#059669'
            }}>
              {environment.db_level} dB
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Day Limit:</span>
            <span style={{ fontWeight: '600', color: '#a16207' }}>
              {location.day_limit} dB
            </span>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
            marginTop: '4px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px'
            }}>
              <span style={{ color: '#374151', fontSize: '12px' }}>Detected Sound:</span>
              <span style={{
                backgroundColor: getClassColor(inference.inference_class),
                color: 'white',
                padding: '2px 6px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {inference.inference_class}
              </span>
            </div>
            <div style={{
              backgroundColor: '#f3f4f6',
              borderRadius: '3px',
              height: '6px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: getClassColor(inference.inference_class),
                height: '100%',
                width: `${probabilityPercent}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <div style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#6b7280',
              marginTop: '2px'
            }}>
              Confidence: {probabilityPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Conditions Section */}
      <div style={{
        backgroundColor: '#ecfdf5',
        borderLeft: '4px solid #10b981',
        padding: '12px',
        borderRadius: '0 6px 6px 0'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          color: '#059669',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          Environmental Conditions
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '8px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            textAlign: 'center',
            border: '1px solid #d1fae5'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>
              Temperature
            </div>
            <div style={{ fontWeight: '600', color: '#059669' }}>
              {environment.temperature}°C
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            textAlign: 'center',
            border: '1px solid #d1fae5'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>
              Humidity
            </div>
            <div style={{ fontWeight: '600', color: '#059669' }}>
              {environment.humidity}%
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            textAlign: 'center',
            border: '1px solid #d1fae5',
            gridColumn: '1 / -1'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>
              Pressure
            </div>
            <div style={{ fontWeight: '600', color: '#059669' }}>
              {environment.pressure} hPa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPopupContent;