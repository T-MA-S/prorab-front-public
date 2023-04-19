import avatar from "../../assets/images/cabinet/support/avatar.svg";
import style from "./style.module.sass";

const Header = () => {
    return (
        <div className={style.header}>
            <img src={avatar} alt="avatar"></img>
            <div>
                <p>Служба поддержки</p>
                <span>Сервиса Прораб</span>
            </div>
        </div>
    );
};

export default Header;
