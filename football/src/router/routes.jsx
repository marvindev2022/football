import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signin from "../pages/Signin/Signin.jsx";
import Home from "../pages/Home/Home.jsx";

function ProtectedRoutes() {
  const token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
}

function MainRoutes() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<Home/>} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
