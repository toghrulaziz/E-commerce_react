import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './Context';
import { ToastContainer, toast } from 'react-toastify';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState('');
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(
        `http://localhost:4000/product/${id}`,
      );

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
        console.log(data);
      }

    };
    getProductDetails();
  }, [id]);


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
        const response = await fetch(`http://localhost:4000/basket/add/${id}`, {
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

      <div className="container mx-auto p-6">
        <div className="flex flex-wrap -mx-6">
          {/* Image section */}
          <div className="w-full md:w-1/2 px-6 flex">
            {/* Small images */}
            <div className="flex flex-col space-y-4 mr-4">
              {product.images && product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product thumbnail ${index}`}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Product"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  style={{ maxHeight: '500px' }}
                />
              )}
            </div>
          </div>


          {/* Details section */}
          <div className="w-full md:w-1/2 px-6">
            <div className="sticky top-0">
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              <p className="mt-2 text-lg font-medium text-gray-600">Category: <span className="text-gray-800">{product.category}</span></p>
              <p className="mt-2 text-lg font-medium text-gray-600">Price: <span className="text-xl text-green-600">{product.currency}{product.price}</span></p>
              <p className="mt-2 text-lg font-medium text-gray-600">Stock: <span className={`text-xl ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Description:</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="mt-6 w-full md:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Product