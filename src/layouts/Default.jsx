import { Outlet } from "react-router-dom";
import classes from "./Default.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Default() {
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Default;
