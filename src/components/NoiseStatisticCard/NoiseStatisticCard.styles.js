import tw, {styled} from "twin.macro";
import {noiseColors} from "../../GlobalStyles";

export const NoiseMultiColorBand = styled.div`
  ${tw`
    flex
    w-full
    h-7
    rounded-t-lg
    overflow-hidden
    mb-6
  `}
`;

export const ColorDiv = styled.div`
  ${props => noiseColors[props.color_id]}
  ${tw`
    h-full
    w-full
  `}
`;
