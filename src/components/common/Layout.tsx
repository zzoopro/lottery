import React, { ReactNode, useCallback, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { OS, osAtom } from "../../atom/atom";
import { osCheck } from "../../utils/functions";

const Scafford = styled.div<{ os: OS }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  height: ${(props) => (props.os !== "web" ? "100vh" : "800px")};
  margin: ${(props) => (props.os !== "web" ? "auto" : "auto")};
  background-color: #333;
  border-radius: ${(props) => (props.os === "web" ? "10px" : "0px")};
  overflow: hidden;
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

  return <Scafford os={os}>{children}</Scafford>;
};

export default React.memo(Layout);
