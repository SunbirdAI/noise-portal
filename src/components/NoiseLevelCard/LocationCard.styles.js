import tw, {styled} from "twin.macro";
import {noiseColors} from "../../GlobalStyles";

export const LocationNameText = styled.h1`
  ${tw`
    font-semibold
    text-3xl
    md:text-4xl
    text-center
    col-span-1
    md:col-span-3
  `}
`;


export const NoiseLevelCardContainer = styled.div`
  ${tw`
    flex
    flex-row
    items-center
    bg-white
    rounded-lg
    shadow-md
  `}
`;

export const NoiseColorBand = styled.div`
  ${props => noiseColors[props.color_id]}
  ${tw`
    w-1/6
    h-40
    md:h-52
    rounded-l-lg
  `}
`;

export const LocationDescription = styled.div`
  ${tw`
    grid
    grid-cols-1
    w-5/6
    h-full
    justify-items-center
    content-around
  `}
`;

export const CardTitle = styled.h2`
  ${tw`
    text-xl
    md:text-2xl
    font-semibold
  `}
`;

export const DBLevel = styled.h2`
  ${tw`
    text-4xl
    md:text-6xl
    font-bold
  `}
`;

export const GenericNumberCardContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    justify-items-center
    content-around
    bg-white
    rounded-lg
    shadow-md
  `}
`;
