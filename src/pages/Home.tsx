import { AnimatePresence, PanInfo, Variants, motion } from "framer-motion";
import { styled } from "styled-components";
import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "../components/common/Layout";
import { RandomColor } from "../utils/functions";
import { useNavigate, useParams } from "react-router-dom";

const Machine = styled(motion.div)`
  position: relative;
  width: 350px;
  aspect-ratio: 1 / 1.2;
  background-color: #f1f1f1;
  border-radius: 30px;
`;
const Item = styled(motion.div)<{ bgcolor: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
`;

const LetterWrap = styled.div`
  position: fixed;
  top: 100px;
  width: 300px;
  border: 1px solid red;
  aspect-ratio: 1 / 1.2;
  overflow: hidden;
  pointer-events: none;
`;

const Letter = styled(motion.div)<{ bgcolor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 300px;
  width: 300px;
  aspect-ratio: 1 / 1.2;
  background-color: ${(props) => props.bgcolor};
  pointer-events: auto;
  z-index: 500;
`;

const items = Array.from({ length: 10 })
  .map((x, i) => i + 1)
  .map((item: number) => ({
    value: item,
    bgColor: RandomColor(),
  }));

type DragEvent = (
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => void;

const letterVariants: Variants = {
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

const Home = () => {
  const navigate = useNavigate();
  const params = useParams<{ letterId: string }>();
  const machineRef = useRef<HTMLDivElement>(null);

  const [letterBgColor, setLetterBgColor] = useState<string>("");

  const onClick = useCallback(
    (letterId: string): MouseEventHandler =>
      (event) => {
        navigate(`/${letterId}`);
        const backgroundColor = window.getComputedStyle(
          event.target as Element
        ).backgroundColor;
        setLetterBgColor(backgroundColor);
      },
    [navigate]
  );
  const closeLetter: MouseEventHandler = useCallback(
    (event) => {
      navigate(`/`);
      setLetterBgColor("");
    },
    [navigate]
  );

  return (
    <Layout>
      <Machine ref={machineRef}>
        {items.map((item, i) => (
          <Item
            key={i}
            onClickCapture={onClick(String(item.value))}
            drag
            dragConstraints={machineRef}
            dragElastic={0}
            bgcolor={item.bgColor}
            whileTap={{ scale: 1.2, zIndex: 99 }}
            whileDrag={{ scale: 1.2, zIndex: 99 }}
          ></Item>
        ))}
      </Machine>
      <LetterWrap>
        <AnimatePresence>
          {params.letterId && (
            <Letter
              onClickCapture={closeLetter}
              bgcolor={letterBgColor}
              variants={letterVariants}
              transition={{ type: "tween", duration: 0.2 }}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </LetterWrap>
    </Layout>
  );
};

export default Home;
