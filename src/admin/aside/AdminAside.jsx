import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { PromocodesIcon } from "../../components/icons/PromocodesIcon";
import { UserWhiteIcon } from "../../components/icons/UserWhiteIcon";
import { StatisticIcon } from "../../components/icons/StatisticIcon";
import { CategoryIcon } from "../../components/icons/CategoryIcon";
import { SettingsIcon } from "../../components/icons/SettingsIcon";
import { ReportsIcon } from "../../components/icons/ReportsIcon";
import { SupportIcon } from "../../components/icons/SupportIcon";
import { CharityIcon } from "../../components/icons/CharityIcon";
import { QuestionIcon } from "../../components/icons/QuestionIcon";
import { RatingIcon } from "../../components/icons/RatingIcon";
import { RolesIcon } from "../../components/icons/RolesIcon";
import { MailIcon } from "../../components/icons/MailIcon";
import { ExitIcon } from "../../components/icons/ExitIcon";
import noAvatar from "../../assets/images/stubs/avatar.svg";
import { BlogIcon } from "../../components/icons/BlogIcon";
import DeviceContext from "../../store/device-context";
import AuthContext from "../../store/auth-context";
import { url } from "../../store/host-store";

const AdminAside = () => {
    const device = useContext(DeviceContext);
    const { userData } = useContext(AuthContext);

    const exitAccount = () => {
        localStorage.removeItem("token");
        window.location.replace("/");
    };

    return (
        <div className="cabinet__aside">
            <button className="cabinet__aside_close" onClick={device.toggleAside}></button>
            <NavLink className="cabinet__person" to="/admin/" onClick={device.toggleAside}>
                {userData.avatar === null ? (
                    <div className="cabinet__img">
                        <img src={noAvatar} alt="" />
                    </div>
                ) : (
                    <div className="cabinet__img">
                        <img src={url + userData.avatar} alt="" />
                    </div>
                )}
                <div>
                    <p className="cabinet__name">{userData.name}</p>
                    <p className="cabinet__grade">
                        <RatingIcon />
                        {userData.mark == null ? "Нет рейтинга" : userData.mark}
                    </p>
                </div>
            </NavLink>
            <div className="cabinet__nav">
                <NavLink to="objects" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <SettingsIcon />
                    </div>
                    Объявления
                </NavLink>
                <NavLink to="users" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <UserWhiteIcon />
                    </div>
                    Пользователи
                </NavLink>
                <NavLink to="category" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <CategoryIcon />
                    </div>
                    Категории
                </NavLink>
                <NavLink to="support" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <SupportIcon />
                    </div>
                    Поддержка
                </NavLink>
                <NavLink to="blog" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <BlogIcon />
                    </div>
                    Блог
                </NavLink>
                <NavLink to="charity" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <CharityIcon />
                    </div>
                    Благотворительность
                </NavLink>
                <NavLink to="faq" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <QuestionIcon />
                    </div>
                    FAQ
                </NavLink>
                {/* <NavLink to="promo" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <PromocodesIcon />
                    </div>
                    Промокоды
                </NavLink> */}
                {/* <NavLink to="reports" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <ReportsIcon />
                    </div>
                    Жалобы
                </NavLink> */}
                {/* <NavLink to="mailing" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <MailIcon />
                    </div>
                    Рассылка
                </NavLink> */}
                <NavLink to="roles" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <RolesIcon />
                    </div>
                    Роли
                </NavLink>
                {/* <NavLink to="statistic" className="cabinet__item" onClick={device.toggleAside}>
                    <div className="icon">
                        <StatisticIcon />
                    </div>
                    Статистика работы менеджеров
                </NavLink> */}
            </div>
            <button className="exit_link admin__exit_link" onClick={exitAccount}>
                <ExitIcon />
                Выйти
            </button>
        </div>
    );
};

export default AdminAside;
