import React, { ReactNode } from "react";
import { styled } from "styled-components";

const MainTag = styled.main`
  width: 100%;
  height: max-content;
`;

interface MainProps {
  children?: ReactNode | null;
}
const Main = ({ children }: MainProps) => {
  return <MainTag>{children}</MainTag>;
};

export default React.memo(Main);
