import { IncorrectIcon } from "../../components/icons/IncorrectIcon";
import s from "./style.module.sass";

const IncorrectBtn = ({ incorrectClick }) => {
    return (
        <button className={`${s.wrapper} ${s.wrapper_incorrect}`} onClick={incorrectClick}>
            <p className={s.text}>Не соответствует</p>
            <span className={s.incorrect}>
                <IncorrectIcon />
            </span>
        </button>
    );
};

export default IncorrectBtn;
