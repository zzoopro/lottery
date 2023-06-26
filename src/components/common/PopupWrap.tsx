import { useRecoilValue } from "recoil";
import { popupAtom } from "../../atom/atom";
import { styled } from "styled-components";
import Dimmed from "./Dimmed";
import DefaultPopup from "./DefaultPopup";

const PopupContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const PopupWrap = () => {
  const popup = useRecoilValue(popupAtom);

  return (
    <>
      {popup.isShow && popup.withDimmed && (
        <Dimmed>{popup.element ? popup.element : <DefaultPopup />}</Dimmed>
      )}
      <PopupContainer>
        {popup.isShow && !popup.withDimmed && popup.element ? (
          popup.element
        ) : (
          <DefaultPopup />
        )}
      </PopupContainer>
    </>
  );
};

export default PopupWrap;
