import React from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { loadingAtom } from "../../atom/atom";

const LoadingTag = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  z-index: 99;
`;

const Loading = () => {
  const loading = useRecoilValue(loadingAtom);
  return (
    <>
      {loading && (
        <LoadingTag>
          <h1>Loading</h1>
        </LoadingTag>
      )}
    </>
  );
};

export default React.memo(Loading);
