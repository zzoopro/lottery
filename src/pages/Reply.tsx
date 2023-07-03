import { styled } from "styled-components";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Input from "../components/auth/Input";
import Scafford from "../components/common/UI/Scaffold";
import FlexBox from "../components/common/UI/FlexBox";
import { theme } from "../css/theme";
import { useCallback, useState } from "react";
import BigButton from "../components/common/UI/BigButton";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, Variants, motion } from "framer-motion";

const H2 = styled.h2`
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 700;
  margin-top: 30px;
`;

const P = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  margin-top: 5px;
`;

const Capsule = styled.div<{ bgcolor: string; selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 10px 10px rgba(88, 83, 83, 0.2);
  cursor: pointer;
  filter: ${({ selected }) => !selected && "blur(2px)"};
  transform: ${({ selected }) => !selected && "scale(90%)"};
  transition: all ease-in-out 0.1s;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button<{ selected: boolean }>`
  display: flex;
  width: 48%;
  height: 60px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  border-radius: 14px;
  background: ${({ selected }) => (selected ? "#5571ee" : "#28282B")};
  transition: all ease-in-out 0.1s;
  color: ${({ selected }) =>
    selected ? "#fff" : "rgba(255, 255, 255, 0.40);"};
  border: ${({ selected }) =>
    selected ? "none" : "border: 1px solid rgba(255, 255, 255, 0.14)"};
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  line-height: 167.023%;
`;

const Setting = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Writing = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--unnamed, #c6c6c6);
  background: var(--unnamed, rgba(255, 255, 255, 0.14));
  margin-top: 20px;
  padding: 20px;
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SettingVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const WritingVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const Reply = () => {
  const { userType, jarId, capsuleId, step } = useParams();
  const navigate = useNavigate();

  const [capsuleColor, setCapsuleColor] = useState<string>(
    theme.capsule["red"]
  );
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const pickCapsuleColor = useCallback((color: string) => {
    setCapsuleColor(color);
  }, []);

  const onButtonClick = useCallback(() => {
    if (step === "setting")
      return navigate(
        `/${userType}/capsule-box/${jarId}/${capsuleId}/reply/write`
      );
  }, [navigate, userType, jarId, capsuleId, step]);

  return (
    <Layout bgColor="dark">
      <Header goBack title="답장하기" />
      <Scafford style={{ justifyContent: "space-between" }}>
        <AnimatePresence mode="sync">
          {step === "setting" && (
            <Setting
              variants={SettingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              // key="setting"
            >
              <H2>닉네임 적기</H2>
              <P>로그인을 하면 닉네임을 바꿀 수 없어요</P>
              <Input
                type="text"
                placeholder="익명의 누군가"
                style={{ marginTop: "20px" }}
              />

              <H2>캡슐 색 고르기</H2>
              <P>로그인을 하면 닉네임을 바꿀 수 없어요</P>
              <FlexBox
                direction="row"
                style={{ justifyContent: "space-around", marginTop: "20px" }}
              >
                {Object.entries(theme.capsule).map(([key, value]) => (
                  <Capsule
                    key={value}
                    onClick={() => pickCapsuleColor(value)}
                    bgcolor={value}
                    selected={value === capsuleColor}
                  />
                ))}
              </FlexBox>
              <H2>편지 보여주기</H2>
              <P>편지를 모두에게 공개할까요?</P>
              <Buttons>
                <Button onClick={() => setIsPublic(false)} selected={!isPublic}>
                  비공개
                </Button>
                <Button onClick={() => setIsPublic(true)} selected={isPublic}>
                  공개
                </Button>
              </Buttons>
            </Setting>
          )}
          {step === "write" && (
            <Writing
              variants={WritingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              // key="writing"
            >
              <H2>TO. 익쥬</H2>
              <TextArea placeholder="내용을 적어주세요. 다른 사람에게 상처를 주는 말은 자제해주세요."></TextArea>
            </Writing>
          )}
        </AnimatePresence>

        <BigButton onClick={onButtonClick}>
          {step === "setting" ? "다음" : "보내기"}
        </BigButton>
      </Scafford>
    </Layout>
  );
};

export default Reply;
