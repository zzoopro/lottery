import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { INIT_POPUP, IPopup, popupAtom } from "../../atom/atom";
import { MouseEventHandler, useCallback } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

const PopupLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 350px;
  aspect-ratio: 1 / 0.6;
  border-radius: 10px;
  box-shadow: 10px 10px 10px #999;
  background-color: #fff;
  z-index: 99;
`;
const Title = styled.strong``;
const Content = styled.p``;
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button``;

const popupVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.05,
    },
  },
};

const DefaultPopup = () => {
  const [popup, setPopup] = useRecoilState(popupAtom);
  const onReject: MouseEventHandler = useCallback(
    (event) => {
      if (popup.onReject) popup.onReject(event);
      setPopup((popup: IPopup) => ({ ...popup, ...INIT_POPUP }));
    },
    [popup, setPopup]
  );

  const onConfirm: MouseEventHandler = useCallback(
    (event) => {
      if (popup.onConfirm) popup.onConfirm(event);
      setPopup((popup: IPopup) => ({ ...popup, ...INIT_POPUP }));
    },
    [popup, setPopup]
  );

  return (
    <AnimatePresence>
      {popup.isShow && (
        <PopupLayout
          key="popup"
          variants={popupVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "tween", duration: 0.15 }}
        >
          <Title>{popup.title || "알림"}</Title>
          <Content>{popup.content || "일시적인 오류가 발생했습니다."}</Content>
          <Buttons>
            {popup.numberOfButton === 2 && (
              <Button onClick={onReject}>{popup.rejectText || "취소"}</Button>
            )}
            <Button onClick={onConfirm}>{popup.confirmText || "확인"}</Button>
          </Buttons>
        </PopupLayout>
      )}
    </AnimatePresence>
  );
};

export default DefaultPopup;
