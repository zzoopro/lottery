import {
  AnimatePresence,
  PanInfo,
  Variants,
  motion,
  useDragControls,
} from "framer-motion";
import { styled } from "styled-components";
import {
  MouseEvent,
  MouseEventHandler,
  TouchEventHandler,
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
  border: 1px solid #333;
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
  z-index: 10;
`;

const items = Array.from({ length: 10 })
  .map((x, i) => i + 1)
  .map((item: number) => ({
    value: item,
    bgColor: RandomColor(),
  }));

type DragEventHandlerType = (
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
  const { userType, letterId } = useParams();
  const machineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const [letterBgColor, setLetterBgColor] = useState<string>("");
  const controls = useDragControls();

  useEffect(() => {
    if (machineRef.current) {
      const machine = machineRef.current;
      const rect = machine.getBoundingClientRect();
      const machineWidth = rect.width;
      const machineHeight = rect.height;

      items.forEach((item, index) => {
        const itemRef = machine.childNodes[index] as HTMLDivElement;
        const itemWidth = itemRef.offsetWidth;
        const itemHeight = itemRef.offsetHeight;
        const maxX = machineWidth - itemWidth;
        const maxY = machineHeight - itemHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        itemRef.style.left = `${randomX}px`;
        itemRef.style.top = `${randomY}px`;
      });
    }
  }, []);

  const onClick = useCallback(
    (letterId: string): MouseEventHandler & TouchEventHandler =>
      (event) => {
        if (isDragging.current) return;
        navigate(`/${userType}/random-box/${letterId}`);
        const backgroundColor = window.getComputedStyle(
          event.target as Element
        ).backgroundColor;
        setLetterBgColor(backgroundColor);
      },
    [navigate, userType]
  );
  const closeLetter: MouseEventHandler = useCallback(
    (event) => {
      navigate(`/${userType}/random-box`);
      setLetterBgColor("");
    },
    [navigate, userType]
  );

  const onDragStart: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = true;
  }, []);
  const onDragEnd: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = false;
  }, []);

  return (
    <Layout>
      <Machine ref={machineRef}>
        {items.map((item, i) => (
          <Item
            key={i}
            onClick={onClick(String(item.value))}
            drag
            onDragStart={onDragStart as any}
            onDragEnd={onDragEnd as any}
            dragConstraints={machineRef}
            dragElastic={0}
            bgcolor={item.bgColor}
            whileTap={{ scale: 1.2, zIndex: 2 }}
            whileDrag={{ scale: 1.2, zIndex: 2 }}
            dragControls={controls}
          ></Item>
        ))}
      </Machine>
      <LetterWrap>
        <AnimatePresence>
          {letterId && (
            <Letter
              onClick={closeLetter}
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
