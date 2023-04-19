import { CorrectIcon } from "../../components/icons/CorrectIcon";
import s from "./style.module.sass";

const CorrectBtn = ({ correctClick, isActive }) => {
    return (
        <button className={`${s.wrapper} ${s.wrapper_correct} ${isActive && s.active}`} onClick={correctClick}>
            <p className={s.text}>соответствует</p>
            <span className={s.correct}>
                <CorrectIcon />
            </span>
        </button>
    );
};

export default CorrectBtn;
