import brigades from "../../../assets/images/index/brigades.png";
import realty from "../../../assets/images/index/realty.png";
import cars from "../../../assets/images/index/cars.png";
import { NavLink } from "react-router-dom";
import s from "../style.module.scss";

const Hero = () => {
    return (
        <section className={s.hero}>
            <div className={s.hero__bg}>
                <div className="container">
                    <h1>Прораб – это онлайн-сервис по поиску исполнителей или заказчиков в строительной сферы</h1>
                    <p>Здесь вы найдете все необходимое для строительных работ: спецтехника, бригады, недвижимость.</p>
                </div>
            </div>
            <div className={`${s.hero__categories} container`}>
                <ul>
                    <li>
                        <NavLink to="/catalog/brigady">
                            <img src={brigades} alt="brigades"></img>
                            <div>
                                <h5>Бригады</h5>
                                <button>перейти</button>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/spetsialnaya-tehnika">
                            <img src={cars} alt="cars"></img>
                            <div>
                                <h5>Спецтехника</h5>
                                <button>перейти</button>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/nedvizhimost">
                            <img src={realty} alt="realty"></img>
                            <div>
                                <h5>Недвижимость</h5>
                                <button>перейти</button>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Hero;
