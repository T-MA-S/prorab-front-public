import { useContext } from "react";
import CorrectBtn from "../../buttons/CorrectBtn";
import IncorrectBtn from "../../buttons/IncorrectBtn";
import s from "../object/components/style.module.sass";
import ModeratorContext from "../../../store/moderator-context";

const OrderAbout = () => {
    const ctx = useContext(ModeratorContext);
    let isActive = ctx.isCorrectOrder.about;

    return (
        <div className={`${s.card} ${isActive && s.active}`}>
            <div>
                <h5>Текст заявки</h5>
                <p className={s.card__about}>{ctx.currentObj.about}</p>
            </div>
            <div>
                <CorrectBtn isActive={isActive} correctClick={() => ctx.correctClick("orderAbout")} />
                <IncorrectBtn incorrectClick={ctx.incorrectClick} />
            </div>
        </div>
    );
};

export default OrderAbout;
