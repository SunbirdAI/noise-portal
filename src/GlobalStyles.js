import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --navyBlue: #282850;
    --white: #fff;
    --lightOrange: #ffaa28;
    --darkOrange: #dc7828;
    --bodyBackground: #f5f5f5;
    --borderColor: #e5e5e5;
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
    background: var(--bodyBackground);
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;
