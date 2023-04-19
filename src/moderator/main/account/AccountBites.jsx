import Loader from "../../../components/loader/Loader";
import AccountAvatar from "./AccountAvatar";
import AccountName from "./AccountName";
import style from "./style.module.sass";

const AccountBites = ({ data, isActive, correctClick, loading }) => {
    return loading ? (
        <Loader />
    ) : Object.keys(data).length > 0 ? (
        <>
            <AccountAvatar />
            <AccountName data={data} isActive={isActive} correctClick={correctClick} />
        </>
    ) : (
        <div className={style.container__empty}>Нет объявлений для модерации</div>
    );
};

export default AccountBites;
