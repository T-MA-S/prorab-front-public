import { PencilIcon } from "../../components/icons/PencilIcon";
import s from "./style.module.sass";

const OnChangeBtn = ({ toggle, title }) => {
    return (
        <button className={`${s.wrapper} ${s.wrapper_change}`} onClick={toggle}>
            <p className={s.text}>{title}</p>
            <span className={s.change}>
                <PencilIcon />
            </span>
        </button>
    );
};

export default OnChangeBtn;
