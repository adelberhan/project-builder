interface IProps {
  msg: string;
}
const ErrorMsg = ({ msg }: IProps) => {
  return <div>{msg ? <span className="black text-red-700  font-semibold text-sm">{msg}</span> : null}</div>;
};

export default ErrorMsg;
