import Navbar from "./components/Navbar"
import Products from "./components/Products"

const Homepage = () => {
  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />
        <Products />
    </div>
  )
}

export default Homepage