import { MyInput } from "../../components/MyInput/MyInput";
import { useState } from "react";
import { MyPasswordInput } from "../../components/MyPasswordInput/MyPasswordInput";
import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { MyButton } from "../../components/myButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (e) {
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError("Unknown Error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <MyInput type="text" name="name" placeholder="Имя" />
            <MyInput type="email" name="email" placeholder="Email" />
            <MyPasswordInput name="password" placeholder="Пароль" />
            <MyPasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
            <MyButton type="primary" htmlType="submit">
              Регистрация
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Есть аккаунт?{" "}
              <Link to={Paths.login} style={{ color: "orange" }}>
                Войдите
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
