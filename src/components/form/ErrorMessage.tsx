interface ErrorMessageProps {
  message: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="p-error error-text">{message}</div>;
};

export default ErrorMessage;
