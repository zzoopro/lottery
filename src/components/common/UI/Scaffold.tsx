import { ReactNode } from "react";
import { styled } from "styled-components";

interface ScaffordProps {
  children: ReactNode;
  padding?: number;
}

const ScaffordDiv = styled.div<{ padding: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ padding }) => `${padding}px`};
`;

const Scafford = ({ children, padding = 20 }: ScaffordProps) => {
  return <ScaffordDiv padding={padding}>{children}</ScaffordDiv>;
};

export default Scafford;
