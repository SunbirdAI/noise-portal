import tw, {styled} from "twin.macro";

export const MyMapContainer = styled.div`
  ${tw`
    shadow-lg
    bg-gray-300
    text-center
    md:col-span-2
    z-0
    h-[400px]
    md:h-[600px]
    lg:h-[700px]
  `}
  .leaflet-container {
    height: 100%;
  }
  
  .leaflet-div-icon {
    border: none;
    background: none;
  }
`;
