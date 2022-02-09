import tw, {styled} from 'twin.macro';


export const Wrapper = styled.div`
  ${tw`
    grid
    grid-cols-2
    gap-4
    mx-20
    my-10
  `}
`;

export const InfoContainer = styled.div`
  ${tw`
    shadow
    bg-white
    text-center
    flex
    items-center
    justify-center
    tracking-wide
  `}
`;

export const FilterContainer = styled.div`
  ${tw`
    shadow
    bg-white
    text-center
    flex
    justify-center
    items-center
  `}
`;

export const MyMapContainer = styled.div`
  ${tw`
    shadow-lg
    bg-gray-300
    text-center
    col-span-2
    z-0
  `}
  .leaflet-container {
    height: 500px;
  }
`;

