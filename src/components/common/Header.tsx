import React from "react";
import { styled } from "styled-components";

const HeaderTag = styled.header``;

const Header = () => {
  return (
    <HeaderTag>
      <h1>LOGO</h1>
    </HeaderTag>
  );
};

export default React.memo(Header);
