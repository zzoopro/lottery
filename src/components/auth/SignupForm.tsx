import { styled } from "styled-components";
import Input from "./Input";
import { FormEvent, useCallback, useState } from "react";
import * as API from "../../api/api";

const Form = styled.form``;
const Button = styled.button``;

export interface ISignup {
  userId: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  coin: number;
}

const SignupForm = () => {
  const [signupForm, setSignupForm] = useState<ISignup>();

  const validate = useCallback((form: ISignup): Promise<ISignup> => {
    return new Promise((resolve, reject) => {
      if (!form.nickname) return reject("닉네임을 입력하세요.");
      if (!form.userId) return reject("아이디를 입력하세요.");
      if (!form.password) return reject("비밀번호를 입력하세요.");
      if (!form.phoneNumber) return reject("핸드폰 번호를 입력하세요.");
      form["coin"] = 5;
      return resolve(form);
    });
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = await validate(signupForm!).then((form) =>
      API.signup(signupForm!)
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      <Button>회원가입</Button>
    </Form>
  );
};

export default SignupForm;
