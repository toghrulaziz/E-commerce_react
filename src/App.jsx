import Homepage from "./Homepage"
import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import { useNavigate } from "react-router-dom"
import secureLocalStorage from "react-secure-storage";
import { useContext, useEffect } from "react"
import { Context } from "./Context";
import Product from "./Product"
import Cart from "./Cart"


function App() {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/home");
  //   } else {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);


  return (
    <Routes>
      <Route path="*" element={<Homepage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isLoggedIn && <Route path="/cart" element={<Cart />} />}
    </Routes>
  )
}

export default App