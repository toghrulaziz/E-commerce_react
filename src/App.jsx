import Navbar from "./components/Navbar"
import Products from "./components/Products"

function App() {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar/>
      <Products/>
    </div>
  )
}

export default App