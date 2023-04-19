import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import FeedbackCard from "./FeedbackCard";

const FeedbackDesktopPage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <FeedbackCard
                isActive={ctx.isCorrectFeedback.text}
                text={ctx.currentObj.comment}
                correctClick={ctx.correctClick}
                incorrectClick={ctx.incorrectClick}
            />
            <OnPublic isCorrect={ctx.isCorrectFeedback.text} />
        </>
    );
};

export default FeedbackDesktopPage;
