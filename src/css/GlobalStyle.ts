import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}  

#root {
}
* {
    box-sizing: border-box;
}
body {    
  overflow: hidden;
}

`;

export default GlobalStyle;
