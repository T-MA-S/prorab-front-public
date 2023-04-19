import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import AccountBites from "./AccountBites";
import s from "../style.module.sass";

const AccountMobilePage = () => {
    const ctx = useContext(ModeratorContext);
    let isActive = ctx.isCorrectAccount.name;

    return (
        <>
            <ObjCounter />
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.grid_container}>
                        <AccountBites
                            data={ctx.currentObj}
                            isActive={isActive}
                            correctClick={ctx.correctClick}
                            loading={ctx.loading}
                        />
                    </div>
                </div>
            </div>
            <OnPublic isCorrect={ctx.isCorrectAccount.avatar && ctx.isCorrectAccount.name} />
        </>
    );
};

export default AccountMobilePage;
