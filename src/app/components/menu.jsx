import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Main Page</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </>
    );
};

export default Menu;
