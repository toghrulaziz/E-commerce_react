import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../Context';
import { ToastContainer, toast } from 'react-toastify';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(Context);

    const getCookieValue = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    };


    const handleAddToCart = async () => {
        if (isLoggedIn) {
            try {
                //const accessToken = document.cookie.split("=")[1];    problem var 
                const accessToken = getCookieValue('accessToken');
                console.log(accessToken);
                const response = await fetch(`http://localhost:4000/basket/add/${product._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // alert('Product added to basket');
                    toast.success("Product added to basket")
                } else {
                    console.error('Failed to add product to basket');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <div onClick={() => {
                navigate(`/product/${product._id}`)
            }} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="p-8 rounded-t-lg" src={product.images[0]} alt="product image" />
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price} {product.currency}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default ProductItem