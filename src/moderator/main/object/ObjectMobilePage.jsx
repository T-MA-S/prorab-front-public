import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjectBites from "./components/ObjectBites";
import ObjCounter from "./components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import s from "../style.module.sass";

const ObjectMobilePage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.grid_container}>
                        <ObjectBites />
                    </div>
                </div>
            </div>
            <OnPublic isCorrect={ctx.isCorrectAdv.img && ctx.isCorrectAdv.category && ctx.isCorrectAdv.descr} />
        </>
    );
};

export default ObjectMobilePage;
