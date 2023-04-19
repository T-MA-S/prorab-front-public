import IncorrectBtn from "../../../buttons/IncorrectBtn";
import CorrectBtn from "../../../buttons/CorrectBtn";
import s from "./style.module.sass";

const DescrAdv = ({ about, incorrectClick, correctClick, isActive }) => {
    return (
        <div className={`${s.card} ${isActive && s.active}`}>
            <div>
                <h5>Описание</h5>
                <p className={s.card__about}>{about}</p>
            </div>
            <div>
                <CorrectBtn isActive={isActive} correctClick={() => correctClick("descr")} />
                <IncorrectBtn incorrectClick={incorrectClick} />
            </div>
        </div>
    );
};

export default DescrAdv;
