import { styled } from "styled-components";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import Box from "../common/UI/Box";
import BigButton from "../common/UI/BigButton";
import { useNavigate } from "react-router-dom";

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

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    navigate("/master/random-box");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="아이디를 입력해주세요"
        register={register("userId", {
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
