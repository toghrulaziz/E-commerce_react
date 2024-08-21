import { useState, createContext, useEffect } from "react";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [products, setProducts] = useState([]);

    // const refreshTokens = async () => {
    //     const refreshToken = document.cookie.split("=")[1];

    //     const response = await fetch("http://localhost:4000/auth/refresh", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             refreshToken: refreshToken,
    //         }),
    //     });

    //     const status = response.ok;

    //     if (status){
    //         const data = await response.json();
    //         document.cookie = `accessToken=${data.accessToken}`;
    //     } else{
    //         document.cookie = "accessToken=";
    //     }

    //     setTrigger((prevState) => !prevState);

    //     return status;
    // };

    useEffect(() => {
        const authorized = document.cookie.split("=")[1];
        setIsLoggedIn(Boolean(authorized));
    }, [trigger]);

    return (
        <Context.Provider value={{ isLoggedIn, setIsLoggedIn, trigger, setTrigger, products, setProducts }}>
            {children}
        </Context.Provider>
    );
};
