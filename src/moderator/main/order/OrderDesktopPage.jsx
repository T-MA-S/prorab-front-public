import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import style from "./style.module.sass";
import OrderBites from "./OrderBites";

const OrderDesktopPage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <div className={style.container}>
                <OrderBites loading={ctx.loading} data={ctx.currentObj} />
            </div>
            <OnPublic isCorrect={ctx.isCorrectOrder.about && ctx.isCorrectOrder.address} />
        </>
    );
};
export default OrderDesktopPage;
