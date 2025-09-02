import React from 'react';
import { formatDate } from '../../utils';

const MCUPopupContent = ({ data, location }) => {
  // Find the latest metric based on time_uploaded
  const getLatestMetric = (metrics) => {
    if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    
    // Sort by time_uploaded in descending order and get the first one
    return metrics.sort((a, b) => new Date(b.time_uploaded) - new Date(a.time_uploaded))[0];
  };

  const latestMetric = getLatestMetric(data.get_metrics);

  if (!latestMetric) {
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <p style={{ color: '#6b7280', margin: 0 }}>No metric data available</p>
      </div>
    );
  }

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
            Device: {data.device_name}
          </span>
          <span style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '30px',
            fontSize: '10px',
            fontWeight: '500'
          }}>
            ONLINE
          </span>
        </div>
        <p style={{
          margin: 0,
          color: '#64748b',
          fontSize: '12px'
        }}>
          <strong>Last Updated:</strong> {formatDate(latestMetric.time_uploaded)}
        </p>
      </div>

      {/* Noise Level Section */}
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
          Noise Levels
        </h4>
        <div style={{ display: 'grid', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Current Level:</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.db_level > location.day_limit ? '#dc2626' : '#059669'
            }}>
              {latestMetric.db_level.toFixed(1)} dB
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Average Level:</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.avg_db_level > location.day_limit ? '#dc2626' : '#059669'
            }}>
              {latestMetric.avg_db_level.toFixed(1)} dB
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Maximum Level:</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.max_db_level > location.day_limit ? '#dc2626' : '#059669'
            }}>
              {latestMetric.max_db_level.toFixed(1)} dB
            </span>
          </div>
        </div>
      </div>

      {/* Limits & Violations Section */}
      <div style={{
        backgroundColor: '#fefce8',
        borderLeft: '4px solid #eab308',
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '0 6px 6px 0'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          color: '#a16207',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          Limits & Violations
        </h4>
        <div style={{ display: 'grid', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Day Limit:</span>
            <span style={{ fontWeight: '600', color: '#a16207' }}>
              {location.day_limit} dB
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Night Limit:</span>
            <span style={{ fontWeight: '600', color: '#a16207' }}>
              {location.night_limit} dB
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Exceedances (1h):</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.no_of_exceedances > 0 ? '#dc2626' : '#059669'
            }}>
              {latestMetric.no_of_exceedances}
            </span>
          </div>
        </div>
      </div>

      {/* Device Status Section */}
      <div style={{
        backgroundColor: '#f0f9ff',
        borderLeft: '4px solid #0ea5e9',
        padding: '12px',
        borderRadius: '0 6px 6px 0'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          color: '#0369a1',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          Device Status
        </h4>
        <div style={{ display: 'grid', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Signal Strength:</span>
            <span style={{ fontWeight: '600', color: '#0369a1' }}>
              {latestMetric.sig_strength}%
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Battery:</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.battery_voltage < 3.5 ? '#dc2626' : '#059669'
            }}>
              {latestMetric.battery_voltage}V
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Solar Panel:</span>
            <span style={{ fontWeight: '600', color: '#0369a1' }}>
              {latestMetric.panel_voltage}V
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Data Balance:</span>
            <span style={{
              fontWeight: '600',
              color: latestMetric.data_balance < 50 ? '#dc2626' : '#059669'
            }}>
              {latestMetric.data_balance} MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCUPopupContent;