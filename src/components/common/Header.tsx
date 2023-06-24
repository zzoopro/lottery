import React from "react";
import { styled } from "styled-components";

const HeaderTag = styled.header`
  height: 50px;
`;

const Header = () => {
  return (
    <HeaderTag>
      <h1>뽑기통 장수</h1>
    </HeaderTag>
  );
};

export default React.memo(Header);
