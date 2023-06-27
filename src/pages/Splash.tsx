import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  max-width: 450px;
  margin: 0 auto;
  background-image: url("./images/splash-bg.jpg");
  background-size: cover;
`;

const Img = styled(motion.img)`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const Logo = styled(Img)`
  width: 75%;
  margin-left: 20px;
`;

const Capsule = styled(Img)`
  position: absolute;
  top: 63%;
  right: 20%;
  width: 24%;
`;

const Star1 = styled(Img)`
  position: absolute;
  top: 30%;
  right: 10%;
  width: 9%;
`;

const Star2 = styled(Img)`
  position: absolute;
  top: 25%;
  left: 10%;
  width: 5%;
`;

const Star3 = styled(Img)`
  position: absolute;
  top: 15%;
  left: 40%;
  width: 6%;
`;

const Star4 = styled(Img)`
  position: absolute;
  top: 12%;
  left: 70%;
  width: 4%;
`;

const Star5 = styled(Img)`
  position: absolute;
  top: 30%;
  left: 40%;
  width: 4%;
`;

const Button = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 87%;
  height: 68px;
  padding: 16px 114px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #5571ee;
  text-align: center;
  font-size: 24px;
  font-family: Noto Sans KR;
  font-weight: 500;
  line-height: 100%;
  color: #fff;
`;

const Splash = () => {
  const navigate = useNavigate();
  return (
    <Background>
      <Star1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatDelay: 0.2, duration: 0.2 }}
        src="/images/star-1.png"
      />
      <Star2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.4 }}
        src="/images/star-2.png"
      />
      <Star3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.3 }}
        src="/images/star-3.png"
      />
      <Star4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.15 }}
        src="/images/star-4.png"
      />
      <Star5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.25 }}
        src="/images/star-4.png"
      />
      <Logo
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        whileTap={{
          scale: 0.9,
          rotate: -5,
        }}
        src="/images/logo.png"
      ></Logo>
      <Capsule
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.4 }}
        whileTap={{
          scale: 1.2,
          rotate: 720,
        }}
        src="/images/capsule.png"
      />
      <Button onClick={() => navigate("/master/random-box")}>시작하기</Button>
    </Background>
  );
};

export default Splash;
