import tw, {styled} from "twin.macro";

export const ChartContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    justify-items-center
    content-around
    bg-white
    rounded-lg
    shadow-md
    md:col-span-2
  `}
`;

export const LineGraphContainer = styled.div`
  ${tw`
    h-52
    w-full
    md:h-80
  `}
`;
