import { useContext } from "react";

import ModeratorContext from "../../../../store/moderator-context";
import Loader from "../../../../components/loader/Loader";
import CategoryAdv from "./CategoryAdv";
import s from "./style.module.sass";

import ImageAdv from "./ImageAdv";
import DescrAdv from "./DescrAdv";

const ObjectBites = () => {
    const ctx = useContext(ModeratorContext);

    return ctx.loading ? (
        <div className={s.cards_wrapper}>
            <Loader />
        </div>
    ) : Object.keys(ctx.currentObj).length > 0 ? (
        <div className={s.cards_wrapper}>
            <ImageAdv
                data={ctx.currentObj}
                incorrectClick={ctx.incorrectClick}
                correctClick={ctx.correctClick}
                isActive={ctx.isCorrectAdv.img}
            />
            <DescrAdv
                about={ctx.currentObj?.about}
                incorrectClick={ctx.incorrectClick}
                correctClick={ctx.correctClick}
                isActive={ctx.isCorrectAdv.descr}
            />
            <CategoryAdv data={ctx.currentObj} correctClick={ctx.correctClick} isActive={ctx.isCorrectAdv.category} />
        </div>
    ) : (
        <div className={s.cards_wrapper_empty}>Нет объявлений для модерации</div>
    );
};

export default ObjectBites;
