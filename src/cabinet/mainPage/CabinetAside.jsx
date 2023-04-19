import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { NotificationIcon } from "../../components/icons/NotificationIcon";
import { FavoritesIcon } from "../../components/icons/FavoritesIcon";
import { AsideFeedback } from "../../components/icons/AsideFeedback";
import { AsideCalendar } from "../../components/icons/AsideCalendar";
import { SettingsIcon } from "../../components/icons/SettingsIcon";
import { ResponseIcon } from "../../components/icons/ResponseIcon";
import { SupportIcon } from "../../components/icons/SupportIcon";
import { RequestIcon } from "../../components/icons/RequestIcon";
import { RatingIcon } from "../../components/icons/RatingIcon";
import { ObjectIcon } from "../../components/icons/ObjectIcon";
import { AsideUser } from "../../components/icons/AsideUser";
import { TermsIcon } from "../../components/icons/TermsIcon";
import { ExitIcon } from "../../components/icons/ExitIcon";
import avatar from "../../assets/images/stubs/avatar.svg";
import DeviceContext from "../../store/device-context";
import AuthContext from "../../store/auth-context";
import { url } from "../../store/host-store";

const CabinetAside = (props) => {
    const ctx = useContext(AuthContext);
    const [active, setActive] = useState(true);
    const device = useContext(DeviceContext);

    const exitAccount = () => {
        localStorage.removeItem("token");
        window.location.replace("/");
    };
    return (
        <div className="cabinet__aside">
            {device.isMobile && <button className="cabinet__aside_close" onClick={device.toggleAside}></button>}
            <div className="cabinet__person">
                {props.data.avatar === null ? (
                    <div className="cabinet__img no_img">
                        <img src={avatar} alt="" />
                    </div>
                ) : (
                    <div className="cabinet__img">
                        <img src={url + props.data.avatar} alt="" />
                    </div>
                )}
                <div>
                    <p className="cabinet__name">{props.data.name}</p>
                    <span>ID 634823990</span>
                    <p className="cabinet__grade">
                        {props.data.mark === null ? "Нет рейтинга" : props.data.mark}
                        <RatingIcon />
                    </p>
                </div>
            </div>
            <div className="cabinet__nav">
                <NavLink
                    to="/lc/"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <AsideUser />
                    </div>
                    Главная
                </NavLink>
                <NavLink
                    to="/lc/advertisement"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <ObjectIcon />
                    </div>
                    Мои объявления
                    <span className="cabinet__item_counter">{ctx.adsNumber}</span>
                </NavLink>
                <NavLink
                    to="/lc/request"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <RequestIcon />
                    </div>
                    Заявки
                    <span className="cabinet__item_counter">{ctx.requestsCount}</span>
                </NavLink>
                <NavLink
                    to="/lc/responses"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <ResponseIcon />
                    </div>
                    Отклики
                    <span className="cabinet__item_counter">{ctx.responseCount}</span>
                </NavLink>
                <NavLink
                    to="/lc/notifications"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <NotificationIcon />
                    </div>
                    Уведомления
                    {ctx.notificationsCount > 0 && (
                        <span className="cabinet__item_counter cabinet__item_notif">{ctx.notificationsCount}</span>
                    )}
                </NavLink>
                <NavLink
                    to="/lc/favorites"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <FavoritesIcon />
                    </div>
                    Избранное
                </NavLink>
                {/* <NavLink*/}
                {/*    to="/lc/calendar"*/}
                {/*    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}*/}
                {/*    onClick={() => {*/}
                {/*        device.toggleAside();*/}
                {/*        ctx.setRerender((prev) => !prev);*/}
                {/*    }}>*/}
                {/*    <div className="icon">*/}
                {/*        <AsideCalendar />*/}
                {/*    </div>*/}
                {/*    Календарь работы*/}
                {/*</NavLink>*/}
                <NavLink
                    to="/lc/feedback"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <AsideFeedback />
                    </div>
                    Отзывы
                </NavLink>
                <NavLink
                    to="/lc/support"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <SupportIcon />
                    </div>
                    Служба поддержки
                </NavLink>
                <NavLink
                    to="/lc/term"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <TermsIcon />
                    </div>
                    Условия использования
                </NavLink>
                {/* <NavLink
                    to="/lc/settings"
                    className={(navData) => (navData.isActive ? "cabinet__item active" : "cabinet__item")}
                    onClick={() => {
                        device.toggleAside();
                        ctx.setRerender((prev) => !prev);
                    }}>
                    <div className="icon">
                        <SettingsIcon />
                    </div>
                    Настройки
                </NavLink> */}
            </div>
            <div className="exit_link" onClick={exitAccount}>
                <ExitIcon />
                Выйти
            </div>
        </div>
    );
};

export default CabinetAside;
