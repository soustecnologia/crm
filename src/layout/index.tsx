import { ReactNode } from "react";
import Header from "./components/Header";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Layout = ({ children, showHeader = true }: LayoutProps) => (
  <>
    {showHeader && <Header />}
    {children}
  </>
);

export default Layout;
