import { NavLink } from "react-router-dom";

import "../header.sass";

const LinkMobile = (props) => {
    return (
        <li onClick={props.onClick}>
            <div className="svg_mobile">
                <img src={props.item.src} alt="" />
            </div>
            <NavLink to={props.item.to}>{props.item.title}</NavLink>
        </li>
    );
};

export default LinkMobile;
