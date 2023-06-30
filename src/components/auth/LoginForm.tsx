import { styled } from "styled-components";
import Input from "./Input";
import { useForm } from "react-hook-form";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button``;

interface ILoginData {
  id: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="아이디"
        register={register("userId", { required: true, maxLength: 20 })}
      />
      <Input
        placeholder="비밀번호"
        register={register("password", { required: true, maxLength: 20 })}
      />
      <Button>회원가입</Button>
    </Form>
  );
};

export default LoginForm;
