import UserCard from "../main/moderInfo/ModeratorCard";
import { Logout } from "./Logout";
import s from "./style.module.sass";

const MobileMenu = () => {
    return (
        <div className={s.menu_overlay}>
            <div className={s.menu}>
                <UserCard />
                <div className={s.logout_wrapper}>
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
