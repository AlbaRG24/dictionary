import React, { useState } from "react";
import styles from "./header.module.css";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import { MenuOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";

export const Header = () => {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const items = [
    {
      label: "Search",
      key: "home",
    },
    {
      label: "A-Z",
      key: "definitions",
    },
    {
      label: "Add an idiom",
      key: "contribute",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            collapsedWidth: 0,
            itemColor: "white",
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      <Header className={styles.header}>
        <nav className={styles.navbar}>
          <div>
            <Button
              icon={<MenuOutlined className={`${styles.icon} ${styles.paddedIcon}`} style={{ fontSize: "22px"}}/>}
              onClick={() => setCollapsed(!collapsed)}
              className={`${styles.btn} ${styles.navItem}`}
              type="text"
            ></Button>
            <Menu
              items={items}
              mode="vertical"
              inlineCollapsed={collapsed}
              className={styles.menu}
            />
          </div>
          <div className={styles.navItem}>
            <HeartOutlined className={styles.icon}></HeartOutlined>
            <UserOutlined
              className={`${styles.icon} ${styles.paddedIcon}`}
            ></UserOutlined>
          </div>
        </nav>
      </Header>
    </ConfigProvider>
  );
};
