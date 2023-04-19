import { LogoutIcon } from "../../components/icons/LogoutIcon";
import s from "./style.module.sass";

export const Logout = () => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.replace("/");
    };
    return (
        <button className={`admin__btn-blue ${s.logout}`} onClick={logout}>
            <LogoutIcon />
            Выйти
        </button>
    );
};
