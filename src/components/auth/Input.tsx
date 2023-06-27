import { ChangeEventHandler } from "react";
import { styled } from "styled-components";

const InputTag = styled.input``;

interface InputProps {
  type: "text" | "password" | "email";
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <InputTag
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
