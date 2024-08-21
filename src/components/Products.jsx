import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem';

const Products = ( {products} ) => {
    return(
        <div className='w-full max-w-screen-xl grid grid-cols-3 gap-6 mt-[50px]'>
            {products.map((product) => (
                <ProductItem product={product} />
            ))}
        </div>
    )
}

export default Products