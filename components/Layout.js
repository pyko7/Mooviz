import Header from "./Navigation/Header";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
