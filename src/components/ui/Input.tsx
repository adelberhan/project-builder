import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input
      {...rest}
      type="text"
      className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500
       focus:border-outline-none focus:ring-4
        focus:ring-indigo-500
        rounded-md px-3 py-3 text-lg"
    />
  );
};

export default Input;
