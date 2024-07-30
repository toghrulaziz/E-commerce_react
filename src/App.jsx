import Homepage from "./Homepage"
import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import { useNavigate } from "react-router-dom"
import secureLocalStorage from "react-secure-storage";
import { useContext, useEffect } from "react"
import { Context } from "./Context";


function App() {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);


  return (
    <Routes>
      {/* <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Homepage />} /> */}

      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Homepage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  )
}

export default App