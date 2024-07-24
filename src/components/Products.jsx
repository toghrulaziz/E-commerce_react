import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch("http://localhost:4000/product");

            if(response.ok){
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } else{
                alert("Error while fetching data")
            }
        };

        getProducts();
    }, []);

    return(
        <div className='w-full max-w-screen-xl grid grid-cols-3 gap-6 mt-[50px]'>
            {products.map((product) => (
                <ProductItem product={product} />
            ))}
        </div>
    )
}

export default Products