import { Layout, Space, Typography } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MyButton } from "../../myButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../features/auth/authSlice";
import styles from "./index.module.scss";

export const Header = () => {
  
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <MyButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </MyButton>
        </Link>
      </Space>
      {user ? (
        <MyButton type="ghost" icon={<LoginOutlined />} onClick={onLogoutClick}>
          Выйти
        </MyButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <MyButton type="ghost" icon={<UserOutlined />}>
              Зарегистрироваться
            </MyButton>
          </Link>
          <Link to={Paths.login}>
            <MyButton type="ghost" icon={<LoginOutlined />}>
              Войти
            </MyButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
