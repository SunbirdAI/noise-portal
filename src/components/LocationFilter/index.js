import {FilterContainer} from "./LocationFilter.styles";
import Select from "react-select";


const LocationFilter = ({selectedOption, setSelectedCity, options}) => {
    console.log(options, selectedOption);
    const handleChange = (selectedOption) => {
        setSelectedCity(selectedOption.value);
    };

    return (
        <FilterContainer>
            <Select
                className="my-8 w-3/4 z-30"
                defaultValue={selectedOption}
                options={options}
                onChange={handleChange}
                placeholder="Select a city"
                key={Math.random() * (1000000 - 10000)}
            />
        </FilterContainer>
    )
}

export default LocationFilter;
