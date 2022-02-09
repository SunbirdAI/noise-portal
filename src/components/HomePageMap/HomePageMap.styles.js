import tw, {styled} from "twin.macro";

export const MyMapContainer = styled.div`
  ${tw`
    shadow-lg
    bg-gray-300
    text-center
    col-span-2
    z-0
  `}
  .leaflet-container {
    height: 500px;
  }
`;
