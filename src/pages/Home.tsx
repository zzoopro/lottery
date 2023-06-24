import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { styled } from "styled-components";
import { useEffect, useRef } from "react";
import Layout from "../components/common/Layout";
import { RandomColor } from "../utils/functions";
import {} from "typescript";

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

const Home = () => {
  const machineRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: 10 }).map((x, i) => i + 1);

  const onDrag = (event: MouseEvent | TouchEvent, info: any) => {};

  return (
    <Layout>
      <Header />
      <Machine ref={machineRef}>
        {items.map((item, i) => (
          <Item
            drag
            dragConstraints={machineRef}
            dragElastic={0}
            bgcolor={RandomColor()}
            whileTap={{ scale: 1.2, zIndex: 99 }}
            whileDrag={{ scale: 1.2, zIndex: 99 }}
          ></Item>
        ))}
      </Machine>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Home;
