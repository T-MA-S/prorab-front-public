import intermediary from "../../../assets/images/index/intermediary.png";
import location from "../../../assets/images/index/location.png";
import contact from "../../../assets/images/index/contact.png";
import helmet from "../../../assets/images/index/helmet.png";
import clock from "../../../assets/images/index/clock.png";
import bd from "../../../assets/images/index/bd.png";
import s from "../style.module.scss";

const data = [
    { img: clock, p: "Мы осуществляем доступ к заказам 24/7" },
    { img: helmet, p: "Поиск спецтехники, недвижимости и бригад под любые задачи" },
    { img: contact, p: "Прямой контакт между заказчиком  и исполнителем" },
    { img: bd, p: "База данных, которая постоянно обновляется" },
    { img: intermediary, p: "Отсутствие посредников между заказчиком и исполнителем" },
    { img: location, p: "Вы можете искать исполнителя или заказчика в нужном месторасположении" },
];

function Advantages() {
    return (
        <section className={s.advantages}>
            <div className="container">
                <h2>Наши преимущества</h2>
                <p className={s.text}>
                    Мы предлогаем наиболее выгодные условия для сдачи и взятия в аренду спецтехники, недвижимости и наём
                    специалистов для выполнения строительных работ любой сложности
                </p>
                <ul>
                    {data.map((el) => {
                        return (
                            <li key={el.p}>
                                <img src={el.img}></img>
                                <p>{el.p}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Advantages;
