import { useContext } from "react";

import avatar from "../../../assets/images/stubs/avatar.svg";
import AuthContext from "../../../store/auth-context";
import { url } from "../../../store/host-store";
import s from "./style.module.sass";

const ModeratorCard = () => {
    const ctx = useContext(AuthContext);

    const data = {
        name: "Test",
        role: "moderator",
        balance: 10000,
    };

    return (
        <div className={s.card}>
            <div className={s.card__info}>
                {ctx.userData.avatar === null ? <img src={avatar}></img> : <img src={url + ctx.userData.avatar}></img>}
                <div className={s.card__info_user}>
                    <p>{ctx.userData.name}</p>
                    <span className={s.role}>Модератор объявлений</span>
                </div>
            </div>
            <div className={s.card__balance}>
                <div className={s.card__balance_top}>
                    <p className={s.card__balance_title}>Баланс</p>
                    <p className={s.card__balance_summ}>{data.balance} ₽</p>
                </div>
                <div className={s.card__balance_bottom}>
                    <p>
                        График вывода денег: <br></br>
                        <span>1 раз в 2 недели.</span>
                    </p>
                    <p>
                        Дата ближайшего вывода денег: <br></br>
                        <span>14 февраля 2023 года.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModeratorCard;
