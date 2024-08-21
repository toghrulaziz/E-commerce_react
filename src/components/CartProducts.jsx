import React, { useState } from 'react'
import CartItem from './CartItem'

const CartProducts = ({ products }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);

    const handleCheckboxChange = (productId, price, isChecked) => {
        if (isChecked) {
            setSelectedItems((prevItems) => [...prevItems, productId]);
            setTotal((prevTotal) => prevTotal + price);
        } else {
            setSelectedItems((prevItems) => prevItems.filter(id => id !== productId));
            setTotal((prevTotal) => prevTotal - price);
        }
    };

    return (
        <section className="h-screen bg-gray-100 text-gray-600 antialiased overflow-hidden">
            <div className="flex h-full flex-col justify-center">
                {/* Table */}
                <div className="mx-auto w-full max-w-4xl rounded-sm border border-gray-200 bg-white shadow-lg">
                    <header className="border-b border-gray-100 px-5 py-4">
                        <div className="font-semibold text-gray-800">Manage Carts</div>
                    </header>

                    <div className="overflow-x-auto p-3">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                <tr>
                                    <th></th>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Product Name</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Quantity</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Total</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="text-center font-semibold">Action</div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-sm">
                                {products.map((product) => (
                                    <CartItem
                                        key={product._id}
                                        product={product}
                                        onCheckboxChange={handleCheckboxChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
                        <div>Total</div>
                        <div className="text-green-600">AZN {total.toFixed(2)}</div>
                    </div>

                    {/* Hidden input for selected items */}
                    <div className="flex justify-end">
                        <input type="hidden" value={selectedItems.join(',')} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartProducts;