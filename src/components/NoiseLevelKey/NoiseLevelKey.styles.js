import tw, {styled} from "twin.macro";
import {blackText, noiseColors, redText} from "../../GlobalStyles";

export const NoiseKeyContainer = styled.div`
  ${tw`
    md:col-span-2
    grid
    gap-y-4
    grid-cols-1
    xl:grid-cols-3
    justify-items-center
  `}
`;

export const KeyHeading = styled.h1`
  ${tw`
        font-semibold
        text-2xl
        col-span-1
        xl:col-span-3
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
    h-[40px]
    w-[50px]
    md:h-[50px]
    md:w-[60px]
    lg:h-[60px]
    lg:w-[70px]
    xl:h-[70px]
    xl:w-[80px]
  `}
`;

export const RangeText = styled.h2`
  ${props => props.color_id >= 8 ? redText : blackText}
  ${tw`
    font-semibold
    text-xs
    lg:text-sm
  `}
`;
