import React, { ReactNode } from "react";
import { styled } from "styled-components";

const Div = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Bg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
`;

interface BackgroundProps {
  children: ReactNode;
  bgImg: string;
}
const Background = ({ children, bgImg }: BackgroundProps) => {
  return (
    <Div>
      <Bg src={bgImg} />
      {children}
    </Div>
  );
};

export default React.memo(Background);
