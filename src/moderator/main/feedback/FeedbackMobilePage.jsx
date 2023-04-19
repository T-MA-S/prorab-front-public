import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import FeedbackCard from "./FeedbackCard";
import s from "../style.module.sass";

const FeedbackMobilePage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.grid_container}>
                        <FeedbackCard
                            isActive={ctx.isCorrectFeedback.text}
                            text={ctx.currentObj.comment}
                            correctClick={ctx.correctClick}
                            incorrectClick={ctx.incorrectClick}
                        />
                    </div>
                </div>
            </div>
            <OnPublic />
        </>
    );
};

export default FeedbackMobilePage;
