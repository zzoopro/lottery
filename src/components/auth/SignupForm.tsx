import { styled } from "styled-components";
import Input from "./Input";
import * as API from "../../api/api";
import { FieldValues, useForm } from "react-hook-form";
import BigButton from "../common/UI/BigButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { popupAtom, showPopup } from "../../atom/atom";
import { IResponse } from "../../utils/functions";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 10px;
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

export interface ISignup {
  userId: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  coin: number;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useRecoilState(popupAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkId = async (data: FieldValues) => {
    const response: IResponse = await API.idCheck(data.userId);
    if (response.status !== 200)
      return setPopup(showPopup({ content: response.message ?? "" }));
    onSubmit(data);
  };

  const onSubmit = async (data: FieldValues) => {
    data["coin"] = 5;
    const response = await API.signup(data as ISignup);
    if (response.status !== 200) {
      return setPopup(showPopup());
    }
    setPopup(
      showPopup({
        content: "회원가입에 성공하였습니다.",
        onConfirm: () => navigate("/login", { replace: true }),
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit(checkId)}>
      <Label htmlFor="userId">아이디</Label>
      <Input
        id="userId"
        placeholder="영문을 사용해 4 ~ 12자"
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

      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        placeholder="한글, 영문을 사용해 최대 6자"
        register={register("nickname", {
          required: true,
          minLength: { value: 2, message: "최소 2글자를 입력해주세요." },
          maxLength: {
            value: 6,
            message: "최대 6글자를 입력할 수 있습니다.",
          },
        })}
      />
      <ErrorText>{errors.nickname?.message as any}</ErrorText>

      <Label htmlFor="password">비밀번호</Label>
      <Input
        id="password"
        type="password"
        placeholder="영문, 숫자를 사용해 최대 4~12자"
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

      <Label htmlFor="phoneNumber">핸드폰 번호</Label>
      <Input
        id="phoneNumber"
        type="number"
        placeholder="(-) 를 제외"
        register={register("phoneNumber", {
          required: true,
          minLength: {
            value: 11,
            message: "11자리 핸드폰번호를 입력해 주세요.",
          },
          maxLength: {
            value: 11,
            message: "11자리 핸드폰번호를 입력해 주세요.",
          },
        })}
      />
      <ErrorText>{errors.phone?.message as any}</ErrorText>
      <BigButton style={{ marginBottom: "20px" }}>회원가입</BigButton>
    </Form>
  );
};

export default SignupForm;
