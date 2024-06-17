import React, { useState } from "react";
import styles from "./header.module.css";
import { Layout, Menu, Button, ConfigProvider, MenuProps } from "antd";
import { MenuOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/interface";

export const Header = () => {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState("Search");

  const items: ItemType[] = [
    {
      label: <a href="/">Search</a>,
      key: "1",
    },
    {
      label: <a href="/idioms">A-Z</a>,
      key: "2",
    },
    {
      label: "Contribute",
      key: "3",
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            collapsedWidth: 0,
            itemColor: "white",
            activeBarBorderWidth: 0,
          },
          Layout: {
            headerBg: "#164773"
          }
        },
      }}
    >
      <Header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.navItem}>
            <Button
              icon={
                <MenuOutlined
                  className={`${styles.icon} ${styles.paddedIcon}`}
                  style={{ fontSize: "22px" }}
                />
              }
              onClick={() => setCollapsed(!collapsed)}
              className={`${styles.btn} ${styles.navItem}`}
              type="text"
            ></Button>
            <Menu
              items={items}
              mode="vertical"
              inlineCollapsed={collapsed}
              className={styles.menu}
              onClick={onClick}
              selectedKeys={[current]}
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
