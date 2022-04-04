import {FilterContainer} from "./LocationFilter.styles";
import Select from "react-select";
import {useState} from "react";


const LocationFilter = ({selectedOption, setSelectedCity, options}) => {

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
            />
        </FilterContainer>
    )
}

export default LocationFilter;
