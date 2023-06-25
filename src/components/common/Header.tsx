import React from "react";
import { styled } from "styled-components";
import { IPopup, popupAtom } from "../../atom/atom";
import { useSetRecoilState } from "recoil";

const HeaderTag = styled.header`
  height: 50px;
`;

const Header = () => {
  const setPopup = useSetRecoilState(popupAtom);
  return (
    <HeaderTag>
      <h1
        onClick={() =>
          setPopup((popup: IPopup) => ({ ...popup, isShow: true }))
        }
      >
        뽑기통 장수
      </h1>
    </HeaderTag>
  );
};

export default React.memo(Header);
