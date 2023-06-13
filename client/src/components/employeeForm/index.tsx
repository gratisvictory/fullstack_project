import { FC } from "react";
import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { MyInput } from "../MyInput/MyInput";
import { ErrorMessage } from "../errorMessage";
import { MyButton } from "../myButton";

type EmployeeFormProps = {
  onFinish: (value: Employee) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: Employee;
};

export const EmployeeForm: FC<EmployeeFormProps> = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="EmployeeAdd" onFinish={onFinish} initialValues={employee}>
        <MyInput type="text" name="firstName" placeholder="Имя" />
        <MyInput type="text" name="lastName" placeholder="Фамилия" />
        <MyInput type="number" name="age" placeholder="Возраст" />
        <MyInput type="text" name="address" placeholder="Адрес" />
        <Space>
          <ErrorMessage message={error} />
          <MyButton htmlType="submit">{btnText}</MyButton>
        </Space>
      </Form>
    </Card>
  );
};
