import styled from "styled-components";

export const Wrapper = styled.section`
  background-attachment: scroll, fixed;
  background-color: #666;
  background-image: url(${({image}) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--white);
  padding: 12em 0 20em 0;
  text-align: center;
`;

export const Text = styled.div`
  h2 {
    font-size: 3.5em;
    line-height: 1em;
    margin: 0 0 0.5em 0;
    padding: 0;
  }

  p {
    font-size: 1.25em;
    margin-bottom: 1.75em;
  }
`;
