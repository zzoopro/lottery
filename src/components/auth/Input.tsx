import { styled } from "styled-components";
import { InputType } from "../../utils/type";

const InputTag = styled.input`
  display: flex;
  width: 100%;
  height: 68px;
  padding: 15px 15px 15px 24px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #c6c6c6;
  background: rgba(255, 255, 255, 0.14);

  color: rgba(255, 255, 255, 0.4);
  font-size: 20px;
  font-family: Noto Sans Kr;
  font-style: normal;
  font-weight: 500;
  line-height: 167.023%;
`;

interface InputProps {
  register: any;
  placeholder?: string;
  type?: InputType;
  [key: string]: any;
}

const Input = ({
  register,
  placeholder,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <InputTag type={type} placeholder={placeholder} {...register} {...props} />
  );
};

export default Input;
