import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjectBites from "./components/ObjectBites";
import ObjCounter from "./components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";

const ObjectDesktopPage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <ObjectBites />
            <OnPublic isCorrect={ctx.isCorrectAdv.img && ctx.isCorrectAdv.category && ctx.isCorrectAdv.descr} />
        </>
    );
};

export default ObjectDesktopPage;
