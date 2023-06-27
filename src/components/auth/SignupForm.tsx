import { styled } from "styled-components";
import Input from "./Input";
import { FormEvent, useCallback, useState } from "react";
import { ISignup } from "../../utils/type";
import * as API from "../../api/api";

const Form = styled.form``;
const Button = styled.button``;

const SignupForm = () => {
  const [signupForm, setSignupForm] = useState<ISignup>();

  const validate = useCallback((form: ISignup) => {
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
    const data = validate(signupForm!).then((form) => API.signup(signupForm!));
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="닉네임"
        onChange={(e) =>
          setSignupForm((form: any) => ({ ...form, nickname: e.target.value }))
        }
        value={signupForm?.nickname ?? ""}
      />
      <Input
        type="text"
        placeholder="아이디"
        onChange={(e) =>
          setSignupForm((form: any) => ({ ...form, userId: e.target.value }))
        }
        value={signupForm?.userId ?? ""}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        onChange={(e) =>
          setSignupForm((form: any) => ({ ...form, password: e.target.value }))
        }
        value={signupForm?.password ?? ""}
      />
      <Input
        type="text"
        placeholder="핸드폰번호"
        onChange={(e) =>
          setSignupForm((form: any) => ({
            ...form,
            phoneNumber: e.target.value,
          }))
        }
        value={signupForm?.phoneNumber ?? ""}
      />

      <Button>회원가입</Button>
    </Form>
  );
};

export default SignupForm;
