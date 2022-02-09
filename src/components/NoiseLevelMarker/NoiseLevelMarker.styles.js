import {blackText, noiseColors, redText} from "../../GlobalStyles";
import tw, {styled} from "twin.macro";

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
