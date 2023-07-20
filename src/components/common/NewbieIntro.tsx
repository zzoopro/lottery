import { Variants, motion } from "framer-motion";

import { styled } from "styled-components";
import { IUser } from "../../utils/type";
import { MouseEventHandler, useEffect, useState } from "react";
import Dimmed from "./Dimmed";

const Bubble = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 120px;
  max-width: 90%;
  border-radius: 12px;
  border: 1px solid #000;
  background: #fff;
  z-index: 600;

  color: #000;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
`;

const DimmedBg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 20;
`;

interface NewbieIntroProps {
  user: IUser;
}
const NewbieIntro = ({ user }: NewbieIntroProps) => {
  const [step, setStep] = useState<number>(0);

  const onClick =
    (step: number): MouseEventHandler =>
    () => {
      if (step < 4) {
        setStep((old) => old + 1);
      } else {
        setStep(0);
      }
    };

  const content = (step: number) => {
    switch (step) {
      case 1:
        return <span>STEP 1</span>;
      case 2:
        return <span>STEP 2</span>;
      case 3:
        return <span>STEP 3</span>;
      default:
        return <span>STEP 4</span>;
    }
  };

  useEffect(() => {
    // setStep(1);
  }, []);
  return (
    <>
      {step > 0 && (
        <>
          <DimmedBg />
          <Bubble onClick={onClick(step)}>{content(step)}</Bubble>
        </>
      )}
    </>
  );
};

export default NewbieIntro;
