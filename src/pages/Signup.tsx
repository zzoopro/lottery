import { styled } from "styled-components";
import SignupForm from "../components/auth/SignupForm";
import Layout from "../components/common/Layout";
import Background from "../components/common/UI/Background";
import Logo from "../components/common/UI/Logo";
import Scafford from "../components/common/UI/Scaffold";
import { Link } from "react-router-dom";

const Em = styled.span`
  color: #fff;
  font-size: 20px;
  font-family: "Noto Sans Kr";
  font-style: normal;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
`;

const Span = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 300;
  line-height: 167.023%;
`;

const LinkTo = styled(Link)`
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 300;
  line-height: 167.023%;
  text-decoration-line: underline;
`;

const Signup = () => {
  return (
    <Layout>
      <Background bgImg="./images/bg-signup.jpg">
        <Scafford>
          <Logo width="70%" />
          <Em>나만의 뽑기통을 만들어 보세요!</Em>
          <SignupForm />
        </Scafford>
      </Background>
    </Layout>
  );
};

export default Signup;
