import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  secureLocalStorage  from  "react-secure-storage";
import { Context } from "./Context";



const Login = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const {setTrigger} = useContext(Context);
    const [rememberMe, setRememberMe] = useState(false);

    const login = async () => {
        const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok){
            toast.success("Login successfully");
            navigate("/home");
            const data = await response.json();
            document.cookie = `accessToken=${data.accessToken}`;
            document.cookie = `refreshToken=${data.refreshToken}`;
            rememberMe && secureLocalStorage.setItem("accessToken", data.accessToken);
            setTrigger((prevState) => !prevState);
        } else{
            toast.error("Login failed");
        }
    };

    const handleInput = (keyname, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [keyname]: value,
        }));
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-green-900 dark:text-white">Sign in to our platform</h5>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                onChange={(e) => {
                                    handleInput("email", e.target.value);
                                }}
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                onChange={(e) => {
                                    handleInput("password", e.target.value);
                                }}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                    onChange={(e) => {
                                        setRememberMe(e.target.value);
                                    }}
                                    id="remember" 
                                    type="checkbox" 
                                    value={rememberMe} 
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            {/* <a href="#" className="ms-auto text-sm text-green-700 hover:underline dark:text-green-500">Lost Password?</a> */}
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <button
                                onClick={() => {
                                    navigate("/register");
                                }}
                                href="#"
                                className="text-green-700 hover:underline dark:text-green-500">
                                Create account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login