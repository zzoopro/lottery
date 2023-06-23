import React from "react";
import { styled } from "styled-components";

const Scafford = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: max-content;
  padding: 10px;
  margin: 0 auto;
`;

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}
const Layout = ({ children }: LayoutProps) => {
  return <Scafford>{children}</Scafford>;
};

export default React.memo(Layout);
