import { useEffect } from "react";

import history1 from "../../assets/images/history1.png";
import history2 from "../../assets/images/history2.png";
import history3 from "../../assets/images/history3.png";
import line from "../../assets/images/line.png";
import "./About.sass";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="history_company">
            <div className="history_company__banner">
                <div className="container">
                    <h2 className="title">История компании</h2>
                    <div className="box">
                        <div className="wrap">
                            <div className="year">
                                <h5>2020</h5>
                                <span>год</span>
                            </div>
                            <ul className="text">
                                <li>Формирование структуры сервиса</li>
                                <li>Разработка механизмов взаимодействия пользователя с сервисом</li>
                                <li>Формирование основных категорий развития</li>
                            </ul>
                        </div>
                        <div className="wrap">
                            <div className="year">
                                <h5>2021</h5>
                                <span>год</span>
                            </div>
                            <ul className="text">
                                <li>Разработка уникальной платформы</li>
                                <li>Формирование всех этапов взаимодействия исполнителя и заказчика</li>
                                <li>Бета-тестирование сайта Прораб</li>
                            </ul>
                        </div>
                        <div className="wrap">
                            <div className="year">
                                <h5>2022</h5>
                                <span>год</span>
                            </div>
                            <ul className="text">
                                <li>Развитие и улучшение сервиса</li>
                                <li>Активное привлечение исполнителей и заказчиков строительной сферы</li>
                                <li>Участие в благотворительных программах</li>
                            </ul>
                        </div>
                        <div className="wrap">
                            <div className="year">
                                <h5>Развитие</h5>
                                <span>Дальнейшее</span>
                            </div>
                            <ul className="text">
                                <li>Внедрение новых идей и принципов работы сервиса</li>
                                <li>Развитие в соответствии со всеми новыми тенденция строительного рынка</li>
                                <li>Помощь пользователям активно развивать свой бизнес</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="history_company__box">
                <div className="history_company__img">
                    <img src={history1} alt="" />
                </div>
                <div className="history_company__content">
                    <h5 className="title">О компании</h5>
                    <p className="text">
                        Многим организациям сегодня не выгодно покупать мощное оборудование, так как оно дорого стоит,
                        может иметь узкую сферу применения или редко используется. Кроме того, содержание автопарка
                        требует больших финансовых затрат, ремонта, гарантийного обслуживания, которое не целесообразно
                        при выполнении разовых работ.
                    </p>
                    <p className="text">
                        С другой стороны, если вы владеете строительной техникой, но длительный срок не пользуетесь ею,
                        может наблюдаться простой. Чтобы оборудование пребывало в хорошем состоянии, требуется плановый
                        осмотр. То же самое касается недвижимости и бригады профессиональных работников для выполнения
                        работ на площадке.
                    </p>
                    <p className="text">
                        Сервис ПРОРАБ создан для того, чтобы соединить между собой две стороны, дать возможность
                        заказчику и исполнителю встретиться. Мы анализируем актуальные запросы на рынке и помогаем
                        решить проблему. Ежедневно на сайте появляются новые объявления – у вас есть возможность сдать в
                        аренду или, наоборот, заказать любой дорожно-строительный транспорт, выбрать недвижимость,
                        нанять бригаду под запрос.
                    </p>
                </div>
            </div>
            <div className="history_company__box history_company__box2">
                <div className="history_company__content">
                    <h6 className="title">Преимущества для заказчиков:</h6>
                    <ul>
                        <li>-большой ассортимент оборудования для строительства;</li>
                        <li>-отсутствие расходов, связанных с его содержанием;</li>
                        <li>-возможная быстрая замена неисправных механизмов;</li>
                        <li>-экономия денежных средств на покупке техники.</li>
                    </ul>
                    <h6 className="title">Преимущества для исполнителей:</h6>
                    <ul>
                        <li>-существенное сокращение времени на поиск заказчика;</li>
                        <li>-отсутствие простоев спецтехники и основных фондов;</li>
                        <li>-максимальная загруженность рабочего персонала;</li>
                        <li>-как следствие – увеличение прибыльности бизнеса.</li>
                    </ul>
                </div>
                <div className="history_company__img">
                    <img src={history2} alt="" />
                </div>
            </div>
            <div className="history_company__box">
                <div className="history_company__img">
                    <img src={history3} alt="" />
                </div>
                <div className="history_company__content">
                    <p className="text">
                        Услуги через наш сервис предоставляются без посредников. Каждый контрагент проверен.
                    </p>
                    <p className="text">
                        Прием заявок осуществляется круглосуточно, через онлайн форму на сайте, каждое объявление перед
                        публикацией проверяется специалистом. Сервис стремится быть лучше и ближе к своим партнерам. Мы
                        имеем положительную репутацию, улучшаем качество своих услуг и стараемся создать максимально
                        комфортные условия, как для заказчиков, так и для исполнителей.
                    </p>
                    <p className="text">ПРОРАБ – это удобно и выгодно во всех отношениях.</p>
                </div>
            </div>
        </section>
    );
};

export default About;