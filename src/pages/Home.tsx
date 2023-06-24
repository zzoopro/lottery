import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { styled } from "styled-components";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import Layout from "../components/common/Layout";
import { RandomColor } from "../utils/functions";
import {} from "typescript";
import { useNavigate, useParams } from "react-router-dom";

const Machine = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto;
  aspect-ratio: 1 / 1.2;
  background-color: #f1f1f1;
  border-radius: 30px;
`;
const Item = styled(motion.div)<{ bgcolor: string }>`
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

const Letter = styled(motion.div)<{ bgcolor: string }>`
  position: absolute;
  width: 90%;
  top: 0;
  aspect-ratio: 1 / 1.2;
  background-color: ${(props) => props.bgcolor};
  z-index: 500;
`;

const items = Array.from({ length: 10 })
  .map((x, i) => i + 1)
  .map((item: number) => ({
    value: `letter${item}`,
    bgColor: RandomColor(),
  }));

const Home = () => {
  const navigate = useNavigate();
  const params = useParams<{ letterId: string }>();
  const machineRef = useRef<HTMLDivElement>(null);

  const [letterBgColor, setLetterBgColor] = useState("");

  // const onDrag = (event: MouseEvent | TouchEvent, info: any) => {};

  const onClick = useCallback(
    (letterId: string): MouseEventHandler =>
      (event) => {
        const backgroundColor = window.getComputedStyle(
          event.target as Element
        ).backgroundColor;

        setLetterBgColor(backgroundColor);
        navigate(`/${letterId}`);
      },
    [navigate]
  );
  const closeLetter = useCallback(() => {
    setLetterBgColor("");
    navigate("/");
  }, [navigate]);

  return (
    <Layout>
      <Machine ref={machineRef}>
        {items.map((item, i) => (
          <Item
            key={i}
            onClick={onClick(`${item.value}`)}
            drag
            dragConstraints={machineRef}
            dragElastic={0}
            bgcolor={item.bgColor}
            whileTap={{ scale: 1.2, zIndex: 99 }}
            whileDrag={{ scale: 1.2, zIndex: 99 }}
            layoutId={`${item.value}`}
          ></Item>
        ))}
      </Machine>
      <AnimatePresence>
        {params.letterId && (
          <Letter
            layoutId={params.letterId}
            onClick={closeLetter}
            bgcolor={letterBgColor}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Home;
