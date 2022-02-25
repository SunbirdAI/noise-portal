import {FilterContainer} from "./LocationFilter.styles";
import Select from "react-select";


const LocationFilter = ({locations}) => {
    const cities = new Set(locations.map((location) => location.city));
    const getLocationOptions = () => (
        [...cities].map((city, index) => ({
            value: `${city}`,
            label: `${city}`
        }))
    );

    return (
        <FilterContainer>
            <Select
                className="my-8 w-3/4 z-30"
                options={getLocationOptions()}
                placeholder="Select a location"
            />
        </FilterContainer>
    )
}

export default LocationFilter;
