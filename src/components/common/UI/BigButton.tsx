import { ReactNode } from "react";
import { styled } from "styled-components";
import { Struct } from "../../../utils/type";

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 68px;
  padding: 16px 114px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #5571ee;

  color: var(--white, #fff);
  text-align: center;
  font-size: 24px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

interface BigButtonProps {
  children: ReactNode;
  style?: Struct<any>;
}
const BigButton = ({ children, style }: BigButtonProps) => {
  return <Button style={style}>{children}</Button>;
};

export default BigButton;
