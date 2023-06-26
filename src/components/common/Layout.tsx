import React, { ReactNode } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Scafford = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  height: max-content;
  min-height: 100vh;
  padding: 10px;
  margin: 0 auto;
  background-color: #333;
`;

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Scafford>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Scafford>
  );
};

export default React.memo(Layout);
