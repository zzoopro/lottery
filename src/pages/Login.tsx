import LoginForm from "../components/auth/LoginForm";
import Background from "../components/common/UI/Background";
import Layout from "../components/common/Layout";
import Scaffold from "../components/common/UI/Scaffold";
import Logo from "../components/common/UI/Logo";
import Box from "../components/common/UI/Box";
import { styled } from "styled-components";
import FlexBox from "../components/common/UI/FlexBox";
import { Link } from "react-router-dom";
import React from "react";

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

const Login = () => {
  return (
    <Layout>
      <Background bgImg="./images/bg-login.jpg">
        <Scaffold>
          <Box h="60px" />
          <Logo width="70%" />
          <Em>누가 나한테 편지를 썼을까?</Em>
          <LoginForm />
          <FlexBox
            direction="row"
            style={{
              justifyContent: "space-between",
              marginTop: "10px",
              padding: "0px 10px",
            }}
          >
            <Span>편지를 받아보고 싶나요?</Span>
            <LinkTo to="/signup">회원가입</LinkTo>
          </FlexBox>
        </Scaffold>
      </Background>
    </Layout>
  );
};

export default React.memo(Login);
