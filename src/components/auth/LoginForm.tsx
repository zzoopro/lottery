import { styled } from "styled-components";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import BigButton from "../common/UI/BigButton";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const ErrorText = styled.p`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 5px;
  color: #ff4343;
  font-size: 16px;
  font-family: Noto Sans Kr;
`;

export interface ILogin {
  id: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    login(data as ILogin).then((res) => console.log(res));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="아이디를 입력해주세요"
        register={register("id", {
          required: true,
          minLength: { value: 4, message: "최소 4글자를 입력해주세요." },
          maxLength: {
            value: 12,
            message: "최대 12글자를 입력할 수 있습니다.",
          },
        })}
      />
      <ErrorText>{errors.userId?.message as any}</ErrorText>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register("password", {
          required: true,
          minLength: { value: 4, message: "최소 4글자를 입력해주세요." },
          maxLength: {
            value: 12,
            message: "최대 12글자를 입력할 수 있습니다.",
          },
        })}
      />
      <ErrorText>{errors.password?.message as any}</ErrorText>
      <BigButton style={{ marginTop: "30px" }}>로그인</BigButton>
    </Form>
  );
};

export default LoginForm;
