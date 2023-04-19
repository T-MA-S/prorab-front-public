import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import ObjCounter from "../object/components/ObjCounter";
import OnPublic from "../../buttons/OnPublic";
import s from "../style.module.sass";
import OrderBites from "./OrderBites";

const OrderMobilePage = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            <ObjCounter />
            <div className="container">
                <div className={s.wrapper}>
                    <div className={s.grid_container}>
                        <OrderBites loading={ctx.loading} data={ctx.currentObj} />
                    </div>
                </div>
            </div>
            <OnPublic isCorrect={ctx.isCorrectOrder.address && ctx.isCorrectOrder.about} />
        </>
    );
};
export default OrderMobilePage;
