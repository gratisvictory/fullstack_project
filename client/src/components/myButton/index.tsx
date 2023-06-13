import React, { FC } from "react";
import { Button, Form } from "antd";

type MyButtonProps = {
  children: React.ReactNode;
  htmlType?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  danger?: boolean | undefined;
  loading?:
    | boolean
    | {
        delay?: number | undefined;
      }
    | undefined;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
};

export const MyButton: FC<MyButtonProps> = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick
}) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
