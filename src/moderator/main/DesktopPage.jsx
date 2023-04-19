import { useContext } from "react";

import FeedbackDesktopPage from "./feedback/FeedbackDesktopPage";
import AccountDesktopPage from "./account/AccountDesktopPage";
import ModeratorContext from "../../store/moderator-context";
import ObjectDesktopPage from "./object/ObjectDesktopPage";
import OrderDesktopPage from "./order/OrderDesktopPage";
import ModeratorCard from "./moderInfo/ModeratorCard";
import s from "./style.module.sass";

const DesktopPage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <div className="container">
            <div className={s.wrapper}>
                <ModeratorCard />
                <div className={s.grid_container}>
                    {ctx.randomFetch === "advertisment" && <ObjectDesktopPage />}
                    {ctx.randomFetch === "feedback" && <FeedbackDesktopPage />}
                    {ctx.randomFetch === "account" && <AccountDesktopPage />}
                    {ctx.randomFetch === "order" && <OrderDesktopPage />}
                </div>
            </div>
        </div>
    );
};

export default DesktopPage;
