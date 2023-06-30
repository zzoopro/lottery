import LoginForm from "../components/auth/LoginForm";
import Background from "../components/common/Background";
import Layout from "../components/common/Layout";

const Login = () => {
  return (
    <Layout>
      <Background bgImg="./images/bg-login.jpg">
        <LoginForm />
      </Background>
    </Layout>
  );
};

export default Login;
