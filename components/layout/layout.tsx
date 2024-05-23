import React, { ReactNode } from "react";
import { Header } from "./header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
