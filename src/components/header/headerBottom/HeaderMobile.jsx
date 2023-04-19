import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import categories_icon from "../../../assets/images/top2.svg";
import ModalsContext from "../../../store/modals-context";
import SelectsDrop from "../headerTop/headerSelects/selects";
import AuthContext from "../../../store/auth-context";
import { LogoIcon } from "../../icons/LogoIcon";
import { isAppstore } from "../../../App";
import LinkMobile from "./LinkMobile";
import "./../header.sass";

import adminitrantsImg from "../../../assets/images/mobMenu/top4.svg";
import partnersImg from "../../../assets/images/mobMenu/partners.svg";
import customersImg from "../../../assets/images/mobMenu/top5.svg";
import privacyImg from "../../../assets/images/mobMenu/privacy.svg";
import accountImg from "../../../assets/images/mobMenu/top1.svg";
import contactImg from "../../../assets/images/mobMenu/bot2.svg";
import charityImg from "../../../assets/images/mobMenu/bot4.svg";
import supportImg from "../../../assets/images/mobMenu/bot6.svg";
import aboutImg from "../../../assets/images/mobMenu/top3.svg";
import blogImg from "../../../assets/images/mobMenu/bot1.svg";
import docsImg from "../../../assets/images/mobMenu/bot3.svg";
import termImg from "../../../assets/images/mobMenu/bot5.svg";
import appImg from "../../../assets/images/mobMenu/top6.svg";
import faqImg from "../../../assets/images/mobMenu/bot7.svg";
import refImg from "../../../assets/images/mobMenu/ref.svg";

const HeaderMobile = ({ toggleMenu }) => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);

    const [changeCity, setChangeCity] = useState(false);

    const mobileLinks = [
        {
            id: 1,
            to: ctx.isUserId ? "/lc/" : "/login",
            src: accountImg,
            title: ctx.isUserId ? "Профиль" : "Войти в аккаунт",
        },
        {
            id: 3,
            to: "/about",
            src: aboutImg,
            title: "О проекте",
        },
        {
            id: 4,
            to: "/administrants-info",
            src: adminitrantsImg,
            title: "Информация для исполнителей",
        },
        {
            id: 5,
            to: "/customers-info",
            src: customersImg,
            title: "Информация для заказчиков",
        },
        {
            id: 6,
            to: "/application",
            src: appImg,
            title: "Мобильное приложение",
        },
        {
            id: 7,
            to: "/",
            src: refImg,
            title: "Реферальная программа",
        },
        {
            id: 8,
            to: "/partners",
            src: partnersImg,
            title: "Наши партнеры",
        },
        {
            id: 9,
            to: "/charity",
            src: charityImg,
            title: "Благотворительность",
        },
        {
            id: 10,
            to: "/blog",
            src: blogImg,
            title: "Блог",
        },
        {
            id: 11,
            to: "/",
            src: supportImg,
            title: "Служба поддержки",
        },
        {
            id: 12,
            to: "/faq",
            src: faqImg,
            title: "Часто задаваемые вопросы",
        },
        {
            id: 13,
            to: "/contacts",
            src: contactImg,
            title: "Контакты",
        },

        {
            id: 14,
            to: "/docs",
            src: docsImg,
            title: "Правовые документы",
        },

        {
            id: 15,
            to: "/userTerm",
            src: termImg,
            title: "Пользовательское соглашение",
        },
        {
            id: 16,
            to: "/privacy",
            src: privacyImg,
            title: "Политика конфиденциальности",
        },
    ];

    return (
        <div className={`header_mobile active`}>
            <div className="header_mobile_top">
                <div className="header_mobile_top__top_side">
                    <div className="header_mobile_logo">
                        <LogoIcon />
                    </div>
                    <div className="header_mobile_close" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                            <path
                                fill="#6FE1B8"
                                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.19 12.75a1 1 0 0 1 0 1.41 1 1 0 0 1-.7.3 1.001 1.001 0 0 1-.71-.3L12 13.41l-2.78 2.78a1 1 0 0 1-.71.3 1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.41L10.59 12 7.81 9.22a1 1 0 0 1 1.41-1.41L12 10.59l2.78-2.78a1 1 0 0 1 1.41 1.41L13.41 12l2.78 2.75Z"
                            />
                        </svg>
                    </div>
                </div>

                <nav className="mobile_navigation">
                    <NavLink
                        to={`${ctx.isUserId ? "/lc/advertisement/create" : "/login"}`}
                        className="header_mobile_top__create-adv"
                        onClick={toggleMenu}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#546EDB" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.35504 10C4.35504 9.52661 4.7388 9.14286 5.21218 9.14286L8.79971 9.14286L8.79971 5.55533C8.79971 5.08194 9.18347 4.69819 9.65685 4.69819C10.1302 4.69819 10.514 5.08194 10.514 5.55533V9.14286H14.1015C14.5749 9.14286 14.9587 9.52661 14.9587 10C14.9587 10.4734 14.5749 10.8571 14.1015 10.8571H10.514V14.4447C10.514 14.9181 10.1302 15.3018 9.65685 15.3018C9.18347 15.3018 8.79971 14.9181 8.79971 14.4447L8.79971 10.8571L5.21218 10.8571C4.7388 10.8571 4.35504 10.4734 4.35504 10Z"
                                fill="#6FE1B8"
                            />
                        </svg>
                        Разместить объявление
                    </NavLink>
                    {changeCity ? (
                        <SelectsDrop />
                    ) : (
                        <p
                            className="header_mobile_bottom_city"
                            onClick={() => {
                                setChangeCity(true);
                            }}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#6FE1B8" />
                                <path
                                    d="M10 4C9.34338 4 8.69319 4.13258 8.08655 4.39016C7.47992 4.64774 6.92872 5.02529 6.46442 5.50124C6.00013 5.97718 5.63183 6.54221 5.38057 7.16407C5.1293 7.78592 4.99998 8.45241 5 9.1255C5.00041 10.43 5.48605 11.6853 6.35796 12.6355L8.76902 15.4112C9.45098 16.1963 10.549 16.1963 11.231 15.4112L13.6412 12.6363C14.5136 11.686 14.9996 10.4304 15 9.1255C15 8.45241 14.8707 7.78592 14.6194 7.16407C14.3682 6.54221 13.9999 5.97718 13.5356 5.50124C13.0713 5.02529 12.5201 4.64774 11.9134 4.39016C11.3068 4.13258 10.6566 4 10 4ZM10 7.45103C10.4332 7.45103 10.8487 7.62745 11.1551 7.94147C11.4614 8.25549 11.6335 8.6814 11.6335 9.1255C11.6335 9.56959 11.4614 9.9955 11.1551 10.3095C10.8487 10.6235 10.4332 10.8 10 10.8C9.56677 10.8 9.15127 10.6235 8.84493 10.3095C8.53859 9.9955 8.36648 9.56959 8.36648 9.1255C8.36648 8.6814 8.53859 8.25549 8.84493 7.94147C9.15127 7.62745 9.56677 7.45103 10 7.45103Z"
                                    fill="#4F68CF"
                                />
                            </svg>
                            г. {ctx.location.city}
                        </p>
                    )}
                    <ul>
                        <li onClick={modal.toggleCategories}>
                            <div className="svg_mobile">
                                <img src={categories_icon} alt="" />
                            </div>
                            <p>Все категории</p>
                        </li>
                        {mobileLinks.reduce((mappedArray, item, index) => {
                            if (index < 7) {
                                if (!isAppstore) {
                                    mappedArray.push(
                                        <LinkMobile onClick={toggleMenu} key={index} item={item}></LinkMobile>
                                    );
                                } else {
                                    if (index !== 4) {
                                        mappedArray.push(
                                            <LinkMobile onClick={toggleMenu} key={index} item={item}></LinkMobile>
                                        );
                                    }
                                }
                            }
                            return mappedArray;
                        }, [])}
                    </ul>
                </nav>
            </div>

            <div className="header_mobile_bottom">
                <nav className="mobile_navigation">
                    <ul>
                        {mobileLinks.reduce((mappedArray, item, index) => {
                            if (index > 6) {
                                mappedArray.push(
                                    <LinkMobile onClick={toggleMenu} key={index} item={item}></LinkMobile>
                                );
                            }
                            return mappedArray;
                        }, [])}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HeaderMobile;
