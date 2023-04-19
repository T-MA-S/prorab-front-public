import { useContext } from "react";

import ModeratorContext from "../../store/moderator-context";
import s from "./style.module.sass";

const OnPublic = ({ isCorrect }) => {
    const ctx = useContext(ModeratorContext);

    return (
        <div className={s.onPublic}>
            {isCorrect ? (
                <button onClick={ctx.onPublicObject}>Опубликовать</button>
            ) : (
                <button className={s.disabled} disabled>
                    Опубликовать
                </button>
            )}
        </div>
    );
};

export default OnPublic;
