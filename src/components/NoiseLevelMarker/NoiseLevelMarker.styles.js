import {blackText, noiseColors, redText} from "../../GlobalStyles";
import tw, {styled} from "twin.macro";
import {Link} from "react-router-dom";

export const NoiseLevelMarkerContainer = styled.div`
  ${props => noiseColors[props.color_id]}
  ${props => props.color_id >= 8 ? redText : blackText}
  ${tw`
    shadow-lg
    text-base
    font-medium
    rounded-full
    grid
    grid-cols-1
    justify-items-center
    content-center
    w-[50px]
    h-[50px]
  `}
`;

export const PopUpContainer = styled.div`
  ${tw`
        grid
        grid-cols-1
        gap-2
        bg-white
        justify-center
        justify-items-center
        w-[150px]
        h-[70px]
        md:h-[100px]
    `}
`;

export const LocationText = styled.div`
  ${tw`    
    text-lg
    text-center
    grid
    grid-cols-1
    content-center
   `}
`;

export const NoiseLevelDescription = styled.div`
  ${props => noiseColors[props.color_id]}
  ${props => props.color_id >= 8 ? redText : blackText}
  ${tw`
    flex
    justify-center
    items-center
    justify-items-center
    gap-4
    p-2
    text-sm
    `}
`;

export const ViewLocationButton = styled(Link)`
  ${tw`
    shadow
    bg-sunbird-light-orange
    ring-1
    ring-sunbird-dark-orange
    rounded-2xl
    flex
    items-center
    justify-center
    text-opacity-90
    text-gray-900
    hover:bg-sunbird-dark-orange
    w-3/4
  `}
`;
