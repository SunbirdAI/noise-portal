import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --navyBlue: #282850;
    --white: #fff;
    --lightOrange: #ffaa28;
    --darkOrange: #dc7828;
    --fontHeader: 20px
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;
