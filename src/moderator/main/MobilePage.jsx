import { useContext } from "react";

import FeedbackMobilePage from "./feedback/FeedbackMobilePage";
import ModeratorContext from "../../store/moderator-context";
import AccountMobilePage from "./account/AccountMobilePage";
import ObjectMobilePage from "./object/ObjectMobilePage";
import OrderMobilePage from "./order/OrderMobilePage";

const MobilePage = () => {
    const ctx = useContext(ModeratorContext);

    if (ctx.randomFetch === "advertisment") {
        return <ObjectMobilePage />;
    } else if (ctx.randomFetch === "feedback") {
        return <FeedbackMobilePage />;
    } else if (ctx.randomFetch === "account") {
        return <AccountMobilePage />;
    } else if (ctx.randomFetch === "order") {
        return <OrderMobilePage />;
    }
};

export default MobilePage;
