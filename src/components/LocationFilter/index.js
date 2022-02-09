import {FilterContainer} from "./LocationFilter.styles";
import Select from "react-select";

const options = [
    {value: 'Entebbe', label: 'Entebbe'},
    {value: 'Kampala', label: 'Kampala'},
    {value: 'Uganda', label: 'Uganda'}
]


const LocationFilter = () => (
    <FilterContainer>
        <Select
            className="my-8 w-3/4 z-30"
            options={options}
            placeholder="Select a location"
        />
    </FilterContainer>
)

export default LocationFilter;
