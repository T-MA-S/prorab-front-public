import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import s from "../object/components/style.module.sass";
import Loader from "../../../components/loader/Loader";
import IncorrectBtn from "../../buttons/IncorrectBtn";
import CorrectBtn from "../../buttons/CorrectBtn";

const FeedbackCard = ({ isActive, text, correctClick, incorrectClick }) => {
    const ctx = useContext(ModeratorContext);

    return ctx.loading ? (
        <div className={s.cards_wrapper}>
            <Loader />
        </div>
    ) : Object.keys(ctx.currentObj).length > 0 ? (
        <div className={`${s.card} ${isActive && s.active}`}>
            <div>
                <h5>Текст отзыва</h5>
                <p className={s.card__about}>{text}</p>
            </div>
            <div>
                <CorrectBtn isActive={isActive} correctClick={() => correctClick("text")} />
                <IncorrectBtn incorrectClick={incorrectClick} />
            </div>
        </div>
    ) : (
        <div className={s.cards_wrapper_empty}>Нет объявлений для модерации</div>
    );
};

export default FeedbackCard;
