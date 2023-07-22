import { AnimatePresence, Variants, motion } from "framer-motion";

import { styled } from "styled-components";

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import { isNewbieAtom } from "../../atom/atom";

const Bubble = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;

  overflow: hidden;
  z-index: 600;
`;

const Img = styled(motion.img)`
  width: 100%;
  object-fit: contain;
`;

interface NewbieIntroProps {
  setIntro: Dispatch<SetStateAction<boolean>>;
}

const imgVariants = {
  enter: {
    x: "100%",
  },
  center: {
    x: 0,
  },
  exit: {
    x: "-100%",
  },
};

const bubbleVariants = {
  enter: {
    y: "100%",
  },
  center: {
    y: 0,
  },
  exit: {
    y: "100%",
  },
};

const NewbieIntro = () => {
  const [isNewbie, setIsNewbie] = useRecoilState(isNewbieAtom);
  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    if (step < 4) return setStep((old) => old + 1);
    setIsNewbie(false);
  };

  return (
    <Bubble
      variants={bubbleVariants}
      initial="enter"
      animate="center"
      exit="exit"
      onClick={nextStep}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <Img
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          key={step}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          src={`/images/intro-0${step}.jpg`}
        />
      </AnimatePresence>
    </Bubble>
  );
};

export default NewbieIntro;
