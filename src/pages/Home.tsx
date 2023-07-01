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
import { Form, useNavigate, useParams } from "react-router-dom";
import Background from "../components/common/UI/Background";
import BigButton from "../components/common/UI/BigButton";

const Img = styled.img`
  user-select: none;
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari 및 Chrome */
  -ms-user-select: none; /* IE 10+ */
`;

const Machine = styled(motion.div)`
  position: absolute;
  top: 20.5%;
  left: 50.5%;
  transform: translateX(-50%);
  width: 65%;
  aspect-ratio: 1 / 1.01;
  background-color: #f1f1f1;
  border: 1px solid #333;
  border-radius: 5px;
  z-index: 3;
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
  border: 2px solid #263ca6;
`;

const RandomBox = styled(Img)`
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  object-fit: contain;
  width: 80%;
  z-index: 2;
  pointer-events: none;
`;
const CapsuleLight = styled(Img)`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 30%;
  pointer-events: none;
`;
const RandomBoxButton = styled(Img)`
  position: absolute;
  left: 50%;
  top: 61.5%;
  width: 70px;
  transform: translateX(-50%);
  object-fit: contain;
  z-index: 5;
  cursor: pointer;
`;

const Message = styled.textarea`
  display: flex;
  width: 100%;
  height: 80%;
  flex-shrink: 0;

  padding: 25px;
  border-radius: 20px;
  border: 1px solid var(--unnamed, #c6c6c6);
  background: var(--unnamed, rgba(255, 255, 255, 0.14));
  margin: 20px 0px;

  color: rgba(51, 51, 51, 0.4);
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  line-height: 167.023%;
`;
const To = styled.h3`
  color: black;
  font-family: Noto Sans Kr;
  font-weight: 700;
  align-self: flex-start;
  font-size: 20px;
  font-style: normal;
  strong {
    color: #5571ee;
  }
`;
const From = styled.h3`
  font-family: Noto Sans Kr;
  color: black;
  font-weight: 700;
  align-self: flex-end;
  font-size: 20px;
  font-style: normal;
  strong {
    color: #5571ee;
  }
`;

const Letter = styled(motion.div)<{ bgcolor: string }>`
  position: absolute;
  width: 90%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
  transform: translateX(-50%);
  aspect-ratio: 1 / 1.5;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #030138;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  border-radius: 20px;
  z-index: 90;
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

interface CapsuleStatus {
  isOpen: boolean;
  capsuleId: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const machineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const [capsule, setCapsule] = useState<CapsuleStatus>();
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

  const openCapsule = useCallback(
    (capsuleId: string): MouseEventHandler & TouchEventHandler =>
      (event) => {
        if (isDragging.current) return;
        setCapsule({ isOpen: true, capsuleId: String(capsuleId) });
        const backgroundColor = window.getComputedStyle(
          event.target as Element
        ).backgroundColor;
        setLetterBgColor(backgroundColor);
      },
    [setCapsule]
  );
  const goToReply: MouseEventHandler = useCallback(
    (event) => {
      setCapsule({ isOpen: false, capsuleId: "" });
      setLetterBgColor("");
      navigate("/master/random-box/1/reply");
    },
    [navigate]
  );

  const onDragStart: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = true;
  }, []);
  const onDragEnd: DragEventHandlerType = useCallback((event, info) => {
    isDragging.current = false;
  }, []);

  return (
    <Layout>
      <Background bgImg="/images/bg-random-box.jpg">
        <RandomBox src="/images/random-box.png" />
        <RandomBoxButton
          draggable={false}
          src="/images/random-box-button.png"
          onClick={openCapsule("1")}
        />
        <Machine ref={machineRef}>
          {items.map((item, i) => (
            <Item
              key={i}
              onClick={openCapsule(String(item.value))}
              drag
              onDragStart={onDragStart as any}
              onDragEnd={onDragEnd as any}
              dragConstraints={machineRef}
              dragElastic={0}
              bgcolor={item.bgColor}
              whileTap={{ scale: 1.2, zIndex: 2 }}
              whileDrag={{ scale: 1.2, zIndex: 2 }}
              dragControls={controls}
            >
              <CapsuleLight src="/images/capsule-light.png" />
            </Item>
          ))}
        </Machine>

        <AnimatePresence>
          {capsule?.isOpen && (
            <Letter
              // onClick={goToReply}
              bgcolor={letterBgColor}
              variants={letterVariants}
              transition={{ type: "tween", duration: 0.2 }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <To>
                <strong>To.</strong> 익주
              </To>
              <Message></Message>
              <From>
                <strong>From.</strong> 누군가
              </From>
              <BigButton onClick={goToReply} style={{ marginTop: "20px" }}>
                답장하기
              </BigButton>
            </Letter>
          )}
        </AnimatePresence>
      </Background>
    </Layout>
  );
};

export default Home;
