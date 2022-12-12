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
    md:col-span-4
  `}
`;

export const LineGraphContainer = styled.div`
  ${tw`
    h-60
    w-full
    md:h-96
  `}
`;
