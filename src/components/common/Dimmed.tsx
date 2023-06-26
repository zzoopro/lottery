import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { popupAtom } from "../../atom/atom";

import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { ReactNode } from "react";

const DimmedTag = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 90;
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

interface DimmedProps {
  children: ReactNode;
}
const Dimmed = ({ children }: DimmedProps) => {
  const popup = useRecoilValue(popupAtom);

  return (
    <AnimatePresence>
      {popup.isShow && (
        <DimmedTag
          key="dimmed"
          variants={dimmedVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15 }}
          onClick={popup.onDimmedClick}
        >
          {children}
        </DimmedTag>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Dimmed);
