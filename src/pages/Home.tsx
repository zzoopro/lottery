import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { styled } from "styled-components";
import { DragEventHandler, MouseEventHandler, useRef } from "react";

const Machine = styled(motion.div)`
  width: 500px;
  height: 500px;
  border: 1px solid red;
`;
const Item = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid red;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
`;

const Home = () => {
  const machineRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: 12 }).map((x, i) => i + 1);

  const onDrag = (event: MouseEvent | TouchEvent, info: any) => {
    console.log(info);
  };

  return (
    <>
      <Header />
      <div style={{ height: "80vh" }}>
        <Machine ref={machineRef}>
          {items.map((item, i) => (
            <Item drag dragConstraints={machineRef} dragElastic={0}>
              {item}
            </Item>
          ))}
        </Machine>
      </div>
      <Footer />
    </>
  );
};

export default Home;
