import { ReactNode } from "react";
import { styled } from "styled-components";

const Bg = styled.div<{ bgimg: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: ${({ bgimg }) => `url(${bgimg})`};
  background-size: cover;
`;

interface BackgroundProps {
  children: ReactNode;
  bgImg: string;
}
const Background = ({ children, bgImg }: BackgroundProps) => {
  return <Bg bgimg={bgImg}>{children}</Bg>;
};

export default Background;
