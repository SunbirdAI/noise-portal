import React from 'react';
import { formatDate } from '../../utils';

const AIPopupContent = ({ inference, environment, location }) => {
  const probabilityPercent = (inference.inference_probability * 100).toFixed(1);

  return (
    <div>
      <p><strong>Last Updated:</strong> {formatDate(environment.created_at)}</p>
      <p><strong>Sound Pressure db level:</strong> {environment.db_level} dB</p>
      <p><strong>Upper limit - day:</strong> {location.day_limit} dB</p>
      {/* <p><strong>Upper limit - night:</strong> {location.night_limit} dB</p> */}
      <p><strong>Temperature:</strong> {environment.temperature} °C</p>
      <p><strong>Pressure:</strong> {environment.pressure} hPa</p>
      <p><strong>Humidity:</strong> {environment.humidity} %</p>
      <p><strong>Last Inferred class:</strong> {inference.inference_class}</p>
      <p><strong>Inferred class probability:</strong> {probabilityPercent}%</p>
    </div>
  );
};

export default AIPopupContent;
