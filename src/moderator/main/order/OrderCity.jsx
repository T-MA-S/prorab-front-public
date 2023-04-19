import { useContext } from "react";
import CorrectBtn from "../../buttons/CorrectBtn";
import IncorrectBtn from "../../buttons/IncorrectBtn";
import s from "../object/components/style.module.sass";
import ModeratorContext from "../../../store/moderator-context";

const OrderCity = () => {
    const ctx = useContext(ModeratorContext);
    let isActive = ctx.isCorrectOrder.address;

    return (
        <div className={`${s.card} ${isActive && s.active}`}>
            <div>
                <h5>Локация</h5>
                <p className={s.card__about}>{ctx.currentObj.address}</p>
            </div>
            <div>
                <CorrectBtn isActive={isActive} correctClick={() => ctx.correctClick("orderAddress")} />
                <IncorrectBtn incorrectClick={ctx.incorrectClick} />
            </div>
        </div>
    );
};

export default OrderCity;
