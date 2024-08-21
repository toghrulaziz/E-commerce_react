import React, { useState } from 'react'

const CartItem = ({ product, onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onCheckboxChange(product._id, product.price, e.target.checked);
    };


    const getCookieValue = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    };


    const handleRemove = async () => {
        const accessToken = getCookieValue('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/basket/remove/${product._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Product removed:', data);

            // problem
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    return (
        <tr>
            <td className="p-2">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span className={`w-5 h-5 flex items-center justify-center rounded border ${isChecked ? 'bg-green-500' : 'bg-white'} border-gray-300`}>
                        {isChecked && (
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        )}
                    </span>
                </label>
            </td>
            <td className="p-2">
                <div className="font-medium text-gray-800">{product.title}</div>
            </td>
            <td className="p-2">
                <div className="text-left">{product.title}</div>
            </td>
            <td className="p-2">
                <div className="text-left font-medium text-green-500">
                    AZN {product.price.toFixed(2)}
                </div>
            </td>
            <td className="p-2">
                <div className="flex justify-center">
                    <button onClick={handleRemove}>
                        <svg
                            className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CartItem;