import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}  

@font-face{
  font-family:'Bitbit';
  src: url("./fonts/Bitbit/DNFBitBitOTF.otf") format("opentype")
}
@font-face{
  font-family:'Noto Sans Kr';
  src: url("./fonts/Noto_Sans_KR/NotoSansKR-Regular.otf") format("opentype");
}
@font-face{
  font-family:'Noto Sans';
  src: url("./fonts/Noto_Sans/NotoSans-Regular.ttf") format("truetype");
}


* {
  box-sizing: border-box;    
  font-family: "Noto Sans", "Noto Sans KR", "Bitbit", AppleSDGothic , sans-serif !important;
}

body {    
  background-color: #f1f1f1;  
  
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none; 
  margin: 0;
}
img {
  pointer-events: none;
}
a {
  text-decoration: none;  
}

`;

export default GlobalStyle;
