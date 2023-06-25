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
  max-width: 480px;
  height: max-content;
  padding: 10px;
  margin: 0 auto;
  border: 0px 1px 0px 1px red;
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
