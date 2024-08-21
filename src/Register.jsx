import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  secureLocalStorage  from  "react-secure-storage";
import { Context } from "./Context";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const {setTrigger} = useContext(Context);

    const register = async () => {
        console.log(formData.password);
        console.log(confirmPassword);

        if (formData.password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        };


        const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok){
            toast.success("Register successfully");
            const data = await response.json();
            console.log(data);
            document.cookie = `accessToken=${data.accessToken}`;
            document.cookie = `refreshToken=${data.refreshToken}`;
            secureLocalStorage.setItem("accessToken", data.accessToken);
            setTrigger((prevState) => !prevState);
            navigate("/home");
        } else{
            toast.error("Register failed");
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
                <form className="max-w-md mx-auto border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-medium text-green-900 dark:text-white py-5">Create a new account</h5>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                        onChange={(e) => {
                            handleInput("email", e.target.value);
                        }}
                        type="email" 
                        name="floating_email" 
                        id="floating_email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                        onChange={(e) => {
                            handleInput("password", e.target.value);
                        }}
                        type="password" 
                        name="floating_password" 
                        id="floating_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                        onClick={(e) => setConfirmPassword(e.target.value)}
                        type="password" 
                        name="repeat_password" 
                        id="floating_repeat_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                            onChange={(e) => {
                                handleInput("firstname", e.target.value);
                            }}
                            type="text" 
                            name="floating_first_name" 
                            id="floating_first_name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                            onChange={(e) => {
                                handleInput("lastname", e.target.value);
                            }}
                            type="text" 
                            name="floating_last_name" 
                            id="floating_last_name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                register();
                            }}
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Submit
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account? <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                                href="#"
                                className="text-green-700 hover:underline dark:text-green-500">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register