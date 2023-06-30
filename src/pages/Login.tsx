import LoginForm from "../components/auth/LoginForm";
import Background from "../components/common/UI/Background";
import Layout from "../components/common/Layout";
import Scaffold from "../components/common/UI/Scaffold";

const Login = () => {
  return (
    <Layout>
      <Background bgImg="./images/bg-login.jpg">
        <Scaffold>
          <LoginForm />
        </Scaffold>
      </Background>
    </Layout>
  );
};

export default Login;
