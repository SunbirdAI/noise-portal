import tw, {styled} from "twin.macro";


export const AnalysisBarChartsContainer = styled.div`
    ${tw`
        grid
        grid-cols-1
        gap-4
        md:col-span-3
        md:grid-cols-2
        justify-items-center
        content-around
        rounded-lg
        my-5
    `}
`;
