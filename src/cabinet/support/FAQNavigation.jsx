import { NavLink } from "react-router-dom";
import style from "./style.module.sass";

const FAQNavigation = () => {
    return (
        <div className={style.FAQNavigation}>
            <p className={style.FAQNavigation__text}>
                Ответы на часто задаваемые вопросы, мы собрали для вас в специальном разделе сайта:
            </p>
            <div className={style.FAQNavigation__tabs_wrapper}>
                <NavLink to="/faq" className={style.tab}>
                    Общие вопросы
                </NavLink>
                <NavLink to="/faq" className={style.tab}>
                    Для Исполнителя
                </NavLink>
                <NavLink to="/faq" className={style.tab}>
                    Для Заказчика
                </NavLink>
            </div>
        </div>
    );
};

export default FAQNavigation;
