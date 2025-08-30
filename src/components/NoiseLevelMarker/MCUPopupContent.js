import React from 'react';
import { formatDate } from '../../utils';

const MCUPopupContent = ({ data, location }) => {
  return (
    <div>
      <p><strong>Last Updated:</strong> {formatDate(data.time_uploaded)}</p>
      <p><strong>Instantaneous db level:</strong> {data.db_level} dB</p>
      <p><strong>Average db level:</strong> {data.avg_db_level} dB</p>
      <p><strong>Number of exceedances in the last hour:</strong> {data.no_of_exceedances}</p>
      <p><strong>Upper limit - day:</strong> {location.day_limit} dB</p>
      <p><strong>Upper limit - night:</strong> {location.night_limit} dB</p>
    </div>
  );
};

export default MCUPopupContent;
