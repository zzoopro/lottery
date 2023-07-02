import React from "react";
import { styled } from "styled-components";

const HeaderTag = styled.header`
  display: flex;
  height: 50px;
`;

const Title = styled.h2``;

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderTag>
      {/* <FontAwesomeIcon icon={faAngleLeft} /> */}
      <Title>{title}</Title>
    </HeaderTag>
  );
};

export default React.memo(Header);
