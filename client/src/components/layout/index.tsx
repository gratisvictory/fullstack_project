import { Layout as AntLayout } from "antd";
import React, { FC } from "react";
import styles from "./index.module.scss";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
  <div className={styles.main}>
    <Header/>
    <AntLayout.Content style={{height: '100%'}}>
    {children}
    </AntLayout.Content>
    </div>
  );
};
