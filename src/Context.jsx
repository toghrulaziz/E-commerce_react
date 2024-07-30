// Context.js
import React, { useState, createContext, useEffect } from "react";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const authorized = document.cookie.split("=")[1];
        setIsLoggedIn(Boolean(authorized));
    }, [trigger]);

    return (
        <Context.Provider value={{ isLoggedIn, setIsLoggedIn, trigger, setTrigger }}>
            {children}
        </Context.Provider>
    );
};
