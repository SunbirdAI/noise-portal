import tw, {styled} from "twin.macro";

export const Wrapper = styled.div`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-2
    gap-2
    md:gap-4
    mx-5
    my-3
    md:mx-16
    md:my-5
    lg:mx-20
    lg:my-10
  `}
`;

export const noiseColors = [
    tw`bg-noise-dark-blue-green`,
    tw`bg-noise-blue-green`,
    tw`bg-noise-light-blue-green`,
    tw`bg-noise-light-green`,
    tw`bg-noise-yellowish-green`,
    tw`bg-noise-light-orange`,
    tw`bg-noise-orange`,
    tw`bg-noise-dark-orange`,
    tw`bg-noise-magenta`,
    tw`bg-noise-purple`,
    tw`bg-noise-dark-purple`
]
