import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
