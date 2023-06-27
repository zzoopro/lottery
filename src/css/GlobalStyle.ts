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
  background-color: #f1f1f1;
}

`;

export default GlobalStyle;
