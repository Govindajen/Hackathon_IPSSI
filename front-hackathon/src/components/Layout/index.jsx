import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
