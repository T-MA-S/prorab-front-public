import { useContext } from "react";

import ModeratorContext from "../../../../store/moderator-context";
import s from "./style.module.sass";

const ObjCounter = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <div className={s.counter}>
            <div className={s.counter__queue}>
                <h4>В очереди на модерацию: </h4>
                <p className={s.counter__queue_count}>
                    {ctx.objectsAmount} <span>позиций</span>
                </p>
            </div>
            <div className={s.counter__created}>
                <h4>Выполнено</h4>
                <div className={s.counter__tabs}>
                    <span>114 сутки</span>
                    <span>3 450 неделя</span>
                </div>
            </div>
        </div>
    );
};

export default ObjCounter;
