import React from "react";
import {Wrapper, Text} from "./Banner.styles";

const Banner = ({image, overlay}) => (
    <Wrapper overlay={overlay} image={image}>
        <Text>
            <h2>Sunbird Noise Project</h2>
            <p>Monitoring Noise Pollution in Kampala.</p>
        </Text>
    </Wrapper>
);

export default Banner;
