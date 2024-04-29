import { Route } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./Home/Navbar";
import Sidebar from "./Home/Sidebar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80  ">
        <Sidebar />
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        ></Route>
      </div>
    </Fragment>
  );
};

export default ProtectedRoute;