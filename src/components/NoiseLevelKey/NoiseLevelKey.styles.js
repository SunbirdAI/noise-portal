import tw, {styled} from "twin.macro";
import {noiseColors} from "../../GlobalStyles";

export const NoiseKeyContainer = styled.div`
  ${tw`
    md:col-span-2
    grid
    gap-y-4
    grid-cols-3
    justify-items-center
  `}
`;

export const KeyHeading = styled.h1`
  ${tw`
        font-semibold
        text-2xl
        col-span-3
    `}
`;

export const NoiseRangeDiv = styled.div`
  ${tw`
    grid
    grid-cols-1
    gap-4
    justify-items-center
    content-center
  `}
`;

export const NoiseRangeText = styled.h1`
  ${tw`
    text-lg
    font-semibold
    text-center
  `}
`;


export const ColorRangeDiv = styled.div`
  ${tw`
    flex
  `}
`;

export const ColorDiv = styled.div`
  ${props => noiseColors[props.color_id]}
  ${tw`
    grid
    justify-items-center
    content-center
    h-[70px]
    w-[80px]
  `}
`;

export const RangeText = styled.h2`
  ${tw`
    font-semibold
    text-sm
  `}
`;
