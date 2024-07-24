const NavbarItem = ({ title }) => {
    return (
        <li>
            <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-400 md:p-0"
            >
                {title}
            </a>
        </li>
    );
};

export default NavbarItem;