import { useContext, useEffect } from "react";
import { Context } from "./Context";
import Navbar from "./components/Navbar"
import Products from "./components/Products"

const Homepage = () => {
  const { products, setProducts } = useContext(Context);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:4000/product");

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        alert("Error while fetching data")
      }
    };

    getProducts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <Products products={products}/>
    </div>
  )
}

export default Homepage