import { NavLink } from "react-router-dom";

import { useContext } from "react";

import whatsapp from "./../../assets/images/whatsapp.svg";
import telegram from "./../../assets/images/telegram.svg";
import ModalsContext from "../../store/modals-context";
import google from "./../../assets/images/google.jpg";
import huawei from "./../../assets/images/huawei.png";
import vk from "./../../assets/images/footer-vk.svg";
import tg from "./../../assets/images/footer-tg.svg";
import yt from "./../../assets/images/footer-yt.svg";
import viber from "./../../assets/images/viber.svg";
import apple from "./../../assets/images/apple.jpg";
import AuthContext from "../../store/auth-context";
import logo from "./../../assets/images/logo.svg";
import age from "./../../assets/images/age.svg";
import s from "./style.module.scss";
import { isAppstore } from "../../App";

const Footer = () => {
    const ctx = useContext(AuthContext);
    const modal = useContext(ModalsContext);

    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footer__top}>
                    <div className={s.socials}>
                        <a href="#" className={s.logo_link}>
                            <img alt="logo" src={logo}></img>
                        </a>
                        <div>
                            {/* <p>Поделиться:</p> */}
                            <div className={s.links_wrapper}>
                                {/* <a href="#">
                                    <img alt="icon" src={whatsapp}></img>
                                </a>
                                <a href="#">
                                    <img alt="icon" src={telegram}></img>
                                </a>
                                <a href="#">
                                    <img alt="icon" src={viber}></img>
                                </a> */}
                                <img alt="age" src={age}></img>
                            </div>
                        </div>
                    </div>
                    <div className={s.nav_left}>
                        <NavLink className="item" to="/about">
                            О нас
                        </NavLink>
                        <NavLink className="item" to="/blog">
                            Блог
                        </NavLink>
                        <NavLink to="/administrants-info" className="item">
                            Информация для исполнителей
                        </NavLink>
                        <NavLink to="/customers-info" className="item">
                            Информация для заказчиков
                        </NavLink>
                        {!isAppstore && (
                            <NavLink to="/application" className="item">
                                Мобильное приложение
                            </NavLink>
                        )}
                        <NavLink to="/partners" target="_blank" className="item">
                            Наши партнеры
                        </NavLink>
                    </div>
                    <div className={s.nav_right}>
                        {ctx.userData?.id ? (
                            <NavLink className="item" to="/lc/support">
                                Служба поддержки
                            </NavLink>
                        ) : (
                            <NavLink className="item" onClick={modal.unauthModal}>
                                Служба поддержки
                            </NavLink>
                        )}

                        <NavLink className="item" to="/faq">
                            Часто задаваемые вопросы
                        </NavLink>
                        <NavLink to="/docs" className="item">
                            Правовые документы
                        </NavLink>
                        <NavLink to="/charity" className="item">
                            Благотворительность
                        </NavLink>
                        <NavLink to="/contacts" target="_blank" className="item">
                            Контакты
                        </NavLink>
                    </div>
                    <div className={s.apps}>
                        <div className={s.contacts}>
                            <span>E-mail для связи:</span>
                            <a href="mailto:info@foreman-go.ru">info@foreman-go.ru</a>
                        </div>
                        <div className={s.links}>
                            <a
                                target="_blank"
                                href="https://apps.apple.com/us/app/%D0%BF%D1%80%D0%BE%D1%80%D0%B0%D0%B1-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9/id6445844643">
                                <img src={apple} alt="" />
                            </a>
                            <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.foreman.go">
                                <img src={google} alt="" />
                            </a>
                            <a target="_blank" href="https://appgallery.huawei.com/app/C107725959">
                                <img src={huawei} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.footer__bottom}>
                <div className={`container ${s.container}`}>
                    <div className={s.docs}>
                        <p>(с) 2022-2023 ООО «Миговеб»</p>
                        <NavLink to="/rules" target="_blank" className="item">
                            Правила сервиса
                        </NavLink>
                        <NavLink to="/userTerm" target="_blank" className="item">
                            Пользовательское соглашение
                        </NavLink>
                        <NavLink to="/privacy" target="_blank" className="item">
                            Политика конфиденциальности
                        </NavLink>
                        <NavLink to="/agreement" target="_blank" className="item">
                            Согласие на обработку персональных данных
                        </NavLink>
                        <NavLink to="/personalData" target="_blank" className="item">
                            Правила политики обработки персональных данных
                        </NavLink>
                    </div>
                    <div className={s.icons}>
                        <a href="https://vk.com/public218647080" target="_blank">
                            <img alt="icon" src={vk}></img>
                        </a>
                        <a href="#" target="_blank">
                            <img alt="icon" src={yt}></img>
                        </a>
                        <a href="https://t.me/servisProrab" target="_blank">
                            <img alt="icon" src={tg}></img>
                        </a>
                    </div>
                </div>
                <p className={s.register_num}>
                    Регистрационный номер 22-23-008374 ООО "Миговеб" в реестре операторов персональных данных
                </p>
            </div>
        </footer>
    );
};

export default Footer;
