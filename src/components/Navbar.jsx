import navbarIcon from "../assets/navbar-icon.svg"
import navbarCart from "../assets/navbar-cart.svg"
import NavbarItem from "./NavbarItem"
import secureLocalStorage from "react-secure-storage";
import { Context } from "../Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const navbarItems = [
    {
        title: "Home",
        path: "*"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    }
];



const Navbar = () => {
    // for search
    const [searchTerm, setSearchTerm] = useState('');

    const { setProducts, isLoggedIn, setTrigger } = useContext(Context);
    const navigate = useNavigate();


    const handleSearch = async (term) => {
        const url = term
            ? `http://localhost:4000/product/search/${encodeURIComponent(term)}`
            : 'http://localhost:4000/product';
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    
    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);


    return (
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {navbarItems.map((item) => (
                        <NavbarItem title={item.title} path={item.path} key={item.title} />
                    ))}
                </ul>

                <div
                    className="items-center justify-between flex w-full md:hidden md:w-auto md:order-1"
                    id="navbar-search"
                >
                    {/* <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div> */}
                </div>

                {/* <a href="https://flowbite.com/">
                    <img src={navbarIcon} className="h-8" alt="Flowbite Logo" />
                </a> */}



                <div className="flex md:order-2">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate('/cart')}
                                className=" px-3 py-1 rounded-lg text-green-600 ml-4 flex items-center"
                            >
                                <img src={navbarCart} className="size-7"></img>
                            </button>
                        </>
                    ) : (
                        <>
                        </>
                    )}

                    <button
                        type="button"
                        data-collapse-toggle="navbar-search"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>








                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-400 focus:border-green-400"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>

                    <button
                        data-collapse-toggle="navbar-search"
                        type="button"
                        onClick={handleSearch}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>

                    </button>
                    {isLoggedIn ? (
                        <>
                            <button
                                className="border-[1px] border-red-600 px-3 py-1 rounded-lg text-red-600 ml-4"
                                onClick={() => {
                                    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                                    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                                    setTrigger((prevState) => !prevState);
                                }}>Log out</button>
                        </>
                    ) : (
                        <>
                            <button
                                className="border-[1px] border-green-600 px-3 py-1 rounded-lg text-green-600 ml-4"
                                onClick={() => {
                                    navigate("/login");
                                }}>Log in</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;