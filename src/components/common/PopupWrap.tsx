import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { popupAtom } from "../../atom/atom";
import DefaultPopup from "./DefaultPopup";
import { AnimatePresence, Variants, motion } from "framer-motion";

const Dimmed = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.4);
`;

const dimmedVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const PopupWrap = () => {
  const popup = useRecoilValue(popupAtom);

  return (
    <>
      {popup.isShow && (
        <AnimatePresence>
          <Dimmed
            variants={dimmedVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
            onClick={popup.onDimmedClick}
          >
            {popup.element ? popup.element : <DefaultPopup />}
          </Dimmed>
        </AnimatePresence>
      )}
    </>
  );
};

export default PopupWrap;
