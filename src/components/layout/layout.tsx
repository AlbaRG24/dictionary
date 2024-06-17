import React, { ReactNode } from "react";
import { Header } from "./header";
import styles from "./layout.module.css"

type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <footer className={styles.footer}>Slangopedia(v1) 2024</footer>
    </div>
  );
};

export default Layout;
