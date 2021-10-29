import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 2em 0;
  margin: 4em auto 0;
  max-width: calc(100% - 5em);
  width: 60em;
  text-align: center;

  @media screen and (max-width: 840px) {
    width: 100%;
  }
`;

export const MapIntroHeader = styled.header`
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
    border-top: solid 2px var(--borderColor);
    //line-height: -1.5em;
    color: #777;
    display: inline-block;
    font-style: normal;
    margin: 1.5em 0 0 0;
    padding: 1.5em 0 1.25em 0;
  }
`;
