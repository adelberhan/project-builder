import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
const Button = ({ children, className,...rest }: IProps) => {
  return <button {...rest} className={`${className}  text-white rounded-md w-full p-2`}>{children}</button>;
};

export default Button;
