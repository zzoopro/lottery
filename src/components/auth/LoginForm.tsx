import { styled } from "styled-components";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import BigButton from "../common/UI/BigButton";
import { useNavigate } from "react-router-dom";
import * as API from "../../api/api";
import { AUTH } from "../../utils/constants";
import { useRecoilState } from "recoil";
import { popupAtom, showPopup } from "../../atom/atom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.p`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0px 5px;
  color: #ff4343;
  font-size: 16px;
  font-family: Noto Sans Kr;
`;

export interface ILogin {
  id: string;
  password: string;
}

interface LoginResponse {
  jarId: string;
  token: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useRecoilState(popupAtom);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    API.login(data as ILogin)
      .then(({ token, jarId }: LoginResponse) => {
        alert("?");
        localStorage.setItem(AUTH, token);
        navigate(`/master/capsule-box/${jarId}`);
      })
      .catch((error: any) =>
        setPopup(
          showPopup({ content: "아이디 또는 비밀번호가 일치하지 않습니다." })
        )
      );
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
      <BigButton>로그인</BigButton>
    </Form>
  );
};

export default LoginForm;
