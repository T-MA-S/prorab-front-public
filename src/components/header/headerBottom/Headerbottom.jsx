import { useContext } from "react";
import { NavLink } from "react-router-dom";

import ModalsContext from "../../../store/modals-context";
import logo from "../../../assets/images/logo.svg";
import HeaderMobile from "./HeaderMobile";
import Searching from "./Searching/Searching";
import AuthContext from "../../../store/auth-context";
import { useState } from "react";
import { SearchIcon } from "../../icons/SearchIcon";

const Headerbottom = () => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);
    const [openSearching, setOpenSearching] = useState(false);

    return (
        <div className="header__bottom">
            <div className="container">
                <NavLink to="/" onClick={modal.closeModal}>
                    <img src={logo} alt="logo"></img>
                </NavLink>

                <div className="header__bottom-nav">
                    <button className="header__bottom-categories" onClick={modal.toggleCategories}>
                        Все категории
                    </button>
                    <Searching />
                    <NavLink
                        to={`${ctx.isUserId ? "/lc/advertisement/create" : "/login"}`}
                        className="advanced_button"
                        onClick={modal.closeModal}>
                        Разместить объявление
                    </NavLink>
                </div>
                {openSearching && <Searching />}

                {window.innerWidth < 768 && (
                    <div className="header__btns-wrapper">
                        <div className="header__btns-search" onClick={() => setOpenSearching((prev) => !prev)}>
                            {openSearching ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path
                                        fill="#6FE1B8"
                                        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.19 12.75a1 1 0 0 1 0 1.41 1 1 0 0 1-.7.3 1.001 1.001 0 0 1-.71-.3L12 13.41l-2.78 2.78a1 1 0 0 1-.71.3 1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.41L10.59 12 7.81 9.22a1 1 0 0 1 1.41-1.41L12 10.59l2.78-2.78a1 1 0 0 1 1.41 1.41L13.41 12l2.78 2.75Z"
                                    />
                                </svg>
                            ) : (
                                <SearchIcon />
                            )}
                        </div>

                        <button className="header__burger" onClick={modal.toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                )}
            </div>
            {window.innerWidth < 768 && modal.openMobMenu && <HeaderMobile toggleMenu={modal.toggleMenu} />}
        </div>
    );
};

export default Headerbottom;
