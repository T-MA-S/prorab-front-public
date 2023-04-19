import { NavLink } from "react-router-dom";

import notific from "../../assets/images/mailConfirm/notific.png";
import orders from "../../assets/images/mailConfirm/orders.png";
import user from "../../assets/images/mailConfirm/user.png";
import bg from "../../assets/images/mailConfirm/bg.png";
import s from "./style.module.sass";

const Confirm = () => {
    return (
        <>
            <h2>
                Поздравляем!<br></br>
                <span>Ваш e-mail подтвержден</span>
            </h2>
            <img className={s.confirm__bg} src={bg}></img>
            <p className={`${s.about} ${s.about__first}`}>Вам стали доступны все функции сервиса:</p>
            <ul>
                <li>
                    <img src={user}></img>
                    <p>Просмотр карточки исполнителя</p>
                </li>
                <li>
                    <img src={orders}></img>
                    <p>Размещение объявлений и заказов</p>
                </li>
                <li>
                    <img src={notific}></img>
                    <p>Получение уведомлений на e-mail</p>
                </li>
            </ul>
            <p className={`${s.about} ${s.about__last}`}>и многое другое! Мы рады, что Вы выбрали наш сервис.</p>
            <div className={s.btns}>
                <NavLink to="/" className={s.blue}>
                    Главная страница
                </NavLink>
                <NavLink to="/lc" className={s.green}>
                    Личный кабинет
                </NavLink>
            </div>
        </>
    );
};

export default Confirm;
