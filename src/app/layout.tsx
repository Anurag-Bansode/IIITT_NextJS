import { ReactNode } from "react";
import Header from "../components/Header";
import Navbar from "../components/navbar/index";
import Footer from "../components/Footer"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
      <Header />
      <Navbar/>
      <main className="flex-grow p-4">{children}</main>
      <Footer />
      </body>
    </html>
  );
};

export default Layout;
