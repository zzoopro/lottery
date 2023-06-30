import { styled } from "styled-components";

const InputTag = styled.input``;

interface InputProps {
  register: any;
  placeholder?: string;
}

const Input = ({ register, placeholder }: InputProps) => {
  return <InputTag placeholder={placeholder} {...register} />;
};

export default Input;
