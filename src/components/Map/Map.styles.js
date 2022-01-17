import styled from "styled-components";
import {MapContainer} from "react-leaflet";


export const Container = styled.div`
  //font-size: 24px;
  //font-weight: bold;
  margin: 10px;
  display: block;

  p {
    font-size: 16px;
    font-weight: normal;
  }

  .leaflet-container {
    height: 600px;
    width: 100%;
  }
`;

export const MyMap = styled(MapContainer)`
  float: left;
  border-radius: 2%;
`;