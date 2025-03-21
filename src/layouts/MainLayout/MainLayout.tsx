import Header from "../../component/shared/Header/Header";
import Footer from "../../component/shared/Footer/Footer";
import { Outlet } from "react-router-dom";

function MainLayOut() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default MainLayOut;
