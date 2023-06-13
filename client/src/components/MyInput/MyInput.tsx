import { FC } from "react";
import { Form, Input } from "antd";

type MyInputProps = {
  type?: string;
  name: string;
  placeholder: string;
};

export const MyInput: FC<MyInputProps> = ({ name, placeholder, type }) => {
  return (
    <Form.Item name={name} shouldUpdate={true} rules={[{required: true, message: 'Обязательное поле'}]}>
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
