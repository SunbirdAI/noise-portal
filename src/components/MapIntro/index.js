import React from "react";
import {MapIntroHeader, Wrapper} from "./MapIntro.styles";

const MapIntro = () => (
    <Wrapper>
        <MapIntroHeader>
            <h2>Phone Collected Data map</h2>
            <p>Map of the locations of the phone collected data.</p>
            {/*<p>The colored clusters show data points close to each other.</p>*/}
            {/*<p>Zoom in to expand the clusters and view the individual data clusters</p>*/}
            {/*<p>Click on a marker to show more information about the data point.</p>*/}
            {/*<p>Use the dropdown on the right to filter by noise category.</p>*/}
        </MapIntroHeader>
    </Wrapper>
);

export default MapIntro;