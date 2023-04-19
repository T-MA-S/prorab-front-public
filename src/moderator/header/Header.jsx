import { useContext } from "react";

import DeviceContext from "../../store/device-context";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import s from "./style.module.sass";

const Header = () => {
    const device = useContext(DeviceContext);
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__container}>{device.isMobile ? <HeaderMobile /> : <HeaderDesktop />}</div>
            </div>
        </header>
    );
};

export default Header;
