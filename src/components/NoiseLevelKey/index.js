import {
    ColorDiv,
    ColorRangeDiv,
    KeyHeading,
    NoiseKeyContainer,
    NoiseRangeDiv,
    NoiseRangeText,
    RangeText
} from "./NoiseLevelKey.styles";


const noiseRanges = [...Array(11).keys()].map((color_id) => {
    const low = color_id === 0 ? 0 : 35 + 5 * (color_id - 1);
    return {
        color_id: color_id,
        rangeText: `${low} to ${low + 5}`
    }
}).map((range, index) => (
    <ColorDiv key={index} color_id={range.color_id}>
        <RangeText color_id={range.color_id}>{range.rangeText}</RangeText>
    </ColorDiv>
));

export const NoiseLevelKey = () => (
    <NoiseKeyContainer>
        <KeyHeading>Noise Level Key (decibels (dB))</KeyHeading>
        <NoiseRangeDiv>
            <ColorRangeDiv>
                {noiseRanges.slice(0, 5)}
            </ColorRangeDiv>
            <NoiseRangeText>
                Noise exposure Level: 1 (e.g quiet areas to moderate nuisance)
            </NoiseRangeText>
        </NoiseRangeDiv>
        <NoiseRangeDiv>
            <ColorRangeDiv>
                {noiseRanges.slice(5, 8)}
            </ColorRangeDiv>
            <NoiseRangeText>
                Noise exposure Level: 2 (e.g moderate to high noise nuisance)
            </NoiseRangeText>
        </NoiseRangeDiv>
        <NoiseRangeDiv>
            <ColorRangeDiv>
                {noiseRanges.slice(8, 11)}
            </ColorRangeDiv>
            <NoiseRangeText>
                Noise exposure Level: 3 (e.g very high level of noise nuisance)
            </NoiseRangeText>
        </NoiseRangeDiv>
    </NoiseKeyContainer>
);
