import { useState } from "react";
import { MyInput } from "../../components/MyInput/MyInput";
import { MyPasswordInput } from "../../components/MyPasswordInput/MyPasswordInput";
import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { MyButton } from "../../components/myButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, userData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage";

export const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');

  const login = async (data: userData) => {
    try {
      await loginUser(data).unwrap();
      navigate('/')
    } catch (e) {
      const maybeError = isErrorWithMessage(e);
      if (maybeError) {
        setError(e.data.message) 
      } else {
        setError('Unknown Error')
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <MyInput type="email" name="email" placeholder="Email" />
            <MyPasswordInput name="password" placeholder="Пароль" />
            <MyButton type="primary" htmlType="submit">
              Войти
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register} style={{color: 'orange'}}>Зарегистрироваться</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row> 
    </Layout>
  );
};
