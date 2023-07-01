import React, { ReactNode, useCallback, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { OS, osAtom } from "../../atom/atom";
import { osCheck } from "../../utils/functions";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Frame = styled.div<{ os: OS }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  height: ${(props) => (props.os !== "web" ? "100vh" : "800px")};
  min-height: ${(props) => (props.os !== "web" ? "100vh" : "800px")};
  border-radius: ${(props) => (props.os === "web" ? "10px" : "0px")};
  overflow: auto;
`;

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [os, setOs] = useRecoilState(osAtom);
  const resize = useCallback(() => {
    setOs(osCheck());
  }, [setOs]);

  useEffect(() => {
    setOs(osCheck());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setOs, resize]);

  return (
    <Root>
      <Frame os={os}>{children}</Frame>
    </Root>
  );
};

export default React.memo(Layout);
