import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CartProducts from './components/CartProducts';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [accessToken, setAccessToken] = useState('');


  const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  };


  useEffect(() => {
    const token = getCookieValue('accessToken');
    setAccessToken(token);
  }, []);


  useEffect(() => {
    const getProducts = async () => {
      console.log('Fetching products with token:', accessToken);
      if (!accessToken) return;

      try {
        const response = await fetch('http://localhost:4000/basket', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched products data:', data);
        setProducts(data); // Veriyi burada güncelliyoruz
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, [accessToken]); // accessToken değiştiğinde fetch et


  console.log('Current products:', products);

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar setProducts={setProducts} />
      <div className="flex-1 overflow-auto">
        <CartProducts products={products}/>
      </div>
    </div>
  );
};

export default Cart;
