import styled, {css} from "styled-components";
import {FaCloud, FaMapMarker, FaMicrophone, FaRobot} from "react-icons/fa";

export const Wrapper = styled.section`
  padding: 4em 0;
  margin: -14em auto 0;
  max-width: calc(100% - 5em);
  width: 60em;

  @media screen and (max-width: 840px) {
    width: 100%;
  }
`;

export const Box = styled.section`
  background: var(--white);
  border-radius: 6px;
  box-shadow: 0 2px 0 0 #e5e5e5;
  margin: 0 0 2em 0;
  padding: 3em;
  text-align: center;

  :last-child {
    margin-bottom: 0;
  }
`;

export const IntroText = styled.header`
  text-align: center;
  margin: 0 0 3em 0;
  padding: 1em 0;

  h2 {
    font-size: 2.25em;
    margin: 0;
    font-weight: 300;
    color: #646464;
  }

  p {
    font-size: 1.25em;
    line-height: -1.5em;
    border-top: solid 2px var(--borderColor);
    color: #777;
    display: inline-block;
    font-style: normal;
    margin: 1.5em 0 0 0;
    padding: 1.5em 0 1.25em 0;
  }
`;

export const Features = styled.section`
`;

export const FeaturesRow = styled.div`
  border-top: solid 2px var(--borderColor);
  position: relative;

  ::after {
    clear: both;
    content: '';
    display: block;
  }
  
  :first-child {
    border-top: 0;
  }
  
  :first-child section {
    padding-top: 0;
  }
  
  :last-child section {
    padding-bottom: 0;
  }
`;

export const Feature = styled.section`
  float: left;
  padding: 3em;
  width: 50%;

  :last-child {
    margin-bottom: 0;
  }

  :nth-child(2n) {
    padding-right: 0;
  }

  :nth-child(2n):before {
    background: var(--borderColor);
    content: '';
    display: block;
    height: 100%;
    margin-left: -3em;
    position: absolute;
    top: 0;
    width: 2px;
  }
  
  :nth-child(2n-1) {
    padding-left: 0;
  }
`;

const SharedIconStyle = css`
  text-decoration: none;
  border-bottom: none;
  position: relative;
  border-radius: 100%;
  color: var(--white);
  cursor: default;
  display: inline-block;
  height: 5.5em;
  line-height: 5.5em;
  margin: 0 0 2em 0;
  width: 5.5em;
  padding: 1em;
`;

export const MicrophoneIcon = styled(FaMicrophone)`
  ${SharedIconStyle};
  background: #666;
`;

export const RobotIcon = styled(FaRobot)`
  ${SharedIconStyle};
  background: #e89980;
`;

export const CloudIcon = styled(FaCloud)`
  ${SharedIconStyle};
  background: #7fcdb8;
`;

export const MapMarkerIcon = styled(FaMapMarker)`
  ${SharedIconStyle};
  background: #90b0ba;
`;
