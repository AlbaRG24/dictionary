import React, { ReactNode } from "react";
import { Nav } from "./nav";
import styles from "./layout.module.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session: Session;
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ session,  children }) => {
  return (
    <div>
      <SessionProvider session={session}>
        <Nav />
        <div>{children}</div>
        <footer className={styles.footer}>Slangopedia(v1) 2024</footer>
      </SessionProvider>
    </div>
  );
};

export default Layout;
