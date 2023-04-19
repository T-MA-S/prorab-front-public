import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import AccountBites from "./AccountBites";
import style from "./style.module.sass";

const AccountDesktopPage = () => {
    const ctx = useContext(ModeratorContext);
    let isActive = ctx.isCorrectAccount.name;

    return (
        <>
            <ObjCounter />
            <div className={style.container}>
                <AccountBites
                    data={ctx.currentObj}
                    isActive={isActive}
                    correctClick={ctx.correctClick}
                    loading={ctx.loading}
                />
            </div>
            <OnPublic isCorrect={ctx.isCorrectAccount.avatar && ctx.isCorrectAccount.name} />
        </>
    );
};

export default AccountDesktopPage;
