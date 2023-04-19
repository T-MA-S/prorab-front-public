import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.svg";

export const Logo = () => {
    return (
        <NavLink to="/moderator">
            <img src={logo} alt="logo" />
        </NavLink>
    );
};
