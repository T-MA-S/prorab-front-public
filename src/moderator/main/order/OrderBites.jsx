import Loader from "../../../components/loader/Loader";
import OrderAbout from "./OrderAbout";
import OrderCity from "./OrderCity";
import s from "./style.module.sass";

const OrderBites = ({ loading, data }) => {
    return loading ? (
        <Loader />
    ) : Object.keys(data).length > 0 ? (
        <>
            <OrderAbout />
            <OrderCity />
        </>
    ) : (
        <div className={s.container__empty}>Нет объявлений для модерации</div>
    );
};

export default OrderBites;
