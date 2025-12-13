import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "../Components/Navbar/Navbar.jsx"
import Home from "../Pages/Home/Home.jsx"
import Auth from "../Pages/Auth.jsx"
import Login from "../Pages/Auth/Login/Login.jsx"
import Register from "../Pages/Auth/Register/Register.jsx"
import Error from "../Pages/Error/Error.jsx"
import AuthCheck from "../AuthCheck/AuthCheck.jsx"
import Footer from "../Components/Footer/Footer.jsx"


const MainLayout = () => {
  return (
  
  <BrowserRouter>
    {/* Navbar */}
    <Navbar/>
    <Routes>
      <Route path="/" element={
        <AuthCheck>
          <Home/>
        </AuthCheck>
        }/> 
      <Route path="/auth" element={<Auth />}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/register" element={<Register/>}/>
      {/* not found route */}
      <Route path="*" element={<Error/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>

  );
};

export default MainLayout;