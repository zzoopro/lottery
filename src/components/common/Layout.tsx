import React, { ReactNode, useEffect } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useRecoilState } from "recoil";
import { osAtom } from "../../atom/atom";
import { osCheck } from "../../utils/functions";

const Scafford = styled.div<{ mobile: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  height: max-content;
  max-height: ${(props) => (props.mobile ? "100vh" : "800px")};
  padding: 10px;
  margin: 0 auto;
  background-color: #333;
`;

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [os, setOs] = useRecoilState(osAtom);
  useEffect(() => {
    setOs(osCheck());
  }, [setOs]);

  return (
    <Scafford mobile={os !== "web"}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Scafford>
  );
};

export default React.memo(Layout);
