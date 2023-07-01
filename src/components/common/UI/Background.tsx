import React, { ReactNode, useEffect, useState } from "react";
import { styled } from "styled-components";

const Bg = styled.div<{ bgimg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: max-content;
  min-height: 100%;
  background-image: ${({ bgimg }) => `url(${bgimg})`};
  background-size: cover;
`;

interface BackgroundProps {
  children: ReactNode | ReactNode[];
  bgImg: string;
  height?: string;
}
const Background = ({ children, bgImg }: BackgroundProps) => {
  return <Bg bgimg={bgImg}>{children}</Bg>;
};

export default React.memo(Background);
