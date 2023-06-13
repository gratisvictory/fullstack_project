import { FC } from "react";
import { Alert } from "antd";

type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  } else {
    return <Alert message={message} type="error"/>
  }
};
