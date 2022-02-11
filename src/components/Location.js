import {AnalysisWrapper} from "../GlobalStyles";
import NoiseLevelCard, {GenericNumberCard} from "./NoiseLevelCard";
import {useLocation} from "react-router-dom";
import {LocationNameText} from "./NoiseLevelCard/LocationCard.styles";
import NoiseLevelChart from "./NoiseLevelChart";

const Location = () => {
    const route = useLocation();
    const { location } = route.state;
    console.log(route.state);
    return (
        <AnalysisWrapper>
            <LocationNameText>{location.name}</LocationNameText>
            <NoiseLevelCard location={location} title={"Average (Past 30 minutes)"}/>
            <GenericNumberCard title={"Exceedances"} value={8}/>
            <NoiseLevelCard location={location} title={"Maximum"}/>
            <NoiseLevelChart/>
        </AnalysisWrapper>
    )
};

export default Location;
