import React from "react";
import {DropDownContainer} from "./CategorySelect.styles";
import Select from "react-select";

const CategorySelect = ({options, updateSelected}) => (
    <DropDownContainer>
        <p>Select a noise category:</p>
        <Select
            onChange={updateSelected}
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            name="Noise categories"
        />
    </DropDownContainer>
);

export default CategorySelect;
