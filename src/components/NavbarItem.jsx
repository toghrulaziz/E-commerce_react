import { useNavigate } from 'react-router-dom';

const NavbarItem = ({ title, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path === "*") {
            navigate("/"); 
        } else {
            navigate(path);
        }
    };

    return (
        <li>
            <button
                onClick={handleClick}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-400 md:p-0"
            >
                {title}
            </button>
        </li>
    );
};

export default NavbarItem;
