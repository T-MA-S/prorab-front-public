import { useContext } from "react";

import Headerbottom from "./headerBottom/Headerbottom";
import ModalsContext from "../../store/modals-context";
import Headertop from "./headerTop/Headertop";
import "./header.sass";

const Header = () => {
    const modal = useContext(ModalsContext);
    return (
        <header className={`header ${modal.isCategories || modal.openModal === "searching" ? "fixed" : ""}`}>
            <Headertop />
            <Headerbottom />
        </header>
    );
};

export default Header;
