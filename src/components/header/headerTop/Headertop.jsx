import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import userIcon from "../../../assets/images/stubs/avatar.svg";
import ModalsContext from "../../../store/modals-context";
import AuthContext from "../../../store/auth-context";
import SelectsDrop from "./headerSelects/selects";
import { url } from "../../../store/host-store";
import { isAppstore } from "../../../App";
import "../header.sass";

const Headertop = () => {
    const ctx = useContext(AuthContext);
    const modal = useContext(ModalsContext);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handlePopup = (event) => {
        event._btnClick = true;
        setIsOpenPopup((prev) => !prev);
    };

    const cityLabel = ctx.location?.city ? ctx.location?.city : "Город не выбран";

    const personalHeader = ctx.userData?.id ? (
        <div className="personal__header">
            <div className="personal_header__img">
                {ctx.userData.avatar === null && <img src={userIcon} alt="avatar" />}
                {ctx.userData.avatar !== null && <img src={url + ctx.userData.avatar} alt="avatar" />}
            </div>
            <div className="personal_header__name">{ctx.userData.name}</div>
        </div>
    ) : (
        "Личный кабинет"
    );

    return (
        <div className="header__top">
            <div className="container">
                <div className="box">
                    <div className="left">
                        <NavLink to="/about" onClick={modal.closeModal} className="item">
                            О проекте
                        </NavLink>
                        <NavLink to="/administrants-info" onClick={modal.closeModal} className="item">
                            Информация для исполнителей
                        </NavLink>
                        <NavLink to="/customers-info" onClick={modal.closeModal} className="item">
                            Информация для заказчиков
                        </NavLink>
                        {!isAppstore && (
                            <NavLink to="/application" onClick={modal.closeModal} className="item">
                                Мобильное приложение
                            </NavLink>
                        )}
                    </div>
                    <div className="right">
                        <button className="city">
                            <p onClick={(event) => handlePopup(event)}>
                                <span>{cityLabel}</span>
                            </p>
                            {isOpenPopup && (
                                <OutsideAlerter>
                                    <SelectsDrop />
                                </OutsideAlerter>
                            )}
                        </button>
                        <NavLink
                            to={`${
                                ctx.userData?.id ? (ctx.userData.account.role === "admin" ? "/lc" : "/lc/") : "/login"
                            }`}
                            onClick={modal.closeModal}
                            className="link">
                            {personalHeader}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // не работает из-за разницы ивентов
                    if (!event._btnClick) {
                        setIsOpenPopup((prev) => !prev);
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function OutsideAlerter(props) {
        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef);

        return <div ref={wrapperRef}>{props.children}</div>;
    }
};

export default Headertop;
