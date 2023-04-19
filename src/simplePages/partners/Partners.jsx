import { useContext, useEffect } from "react";
import Slider from "react-slick";
import "../../styles/sliders.sass";

import s from "./style.module.sass";
import oper1 from "../../assets/images/partners/mts.png";
import oper2 from "../../assets/images/partners/beeline.png";
import oper3 from "../../assets/images/partners/tele2.png";
import oper4 from "../../assets/images/partners/yota.png";
import oper5 from "../../assets/images/partners/megaphone.png";

import int1 from "../../assets/images/partners/migo.png";
import int2 from "../../assets/images/partners/event-services.png";
import int3 from "../../assets/images/partners/go-beauty.png";
import int4 from "../../assets/images/partners/startup.png";
import int5 from "../../assets/images/partners/in-travel.png";
import int6 from "../../assets/images/partners/kontur.png";
import int7 from "../../assets/images/partners/cloudpayments.png";
import int8 from "../../assets/images/partners/smscenter.png";
import int9 from "../../assets/images/partners/1c.png";
import int10 from "../../assets/images/partners/diadok.png";

import adv1 from "../../assets/images/partners/tg.png";
import adv2 from "../../assets/images/partners/vk.png";
import adv3 from "../../assets/images/partners/yadirect.png";
import adv4 from "../../assets/images/partners/mail.png";
import adv5 from "../../assets/images/partners/yandex.png";
import adv6 from "../../assets/images/partners/elama.png";

import shop1 from "../../assets/images/partners/marrusha.png";
import shop2 from "../../assets/images/partners/savar.png";
import shop3 from "../../assets/images/partners/kid-fitness.png";
import shop4 from "../../assets/images/partners/art-lovely.png";
import shop5 from "../../assets/images/partners/cookday.png";
import shop6 from "../../assets/images/partners/medic-inform.png";
import shop7 from "../../assets/images/partners/mama-inform.png";
import shop8 from "../../assets/images/partners/worldwoman.png";
import shop9 from "../../assets/images/partners/kripto.png";
import shop10 from "../../assets/images/partners/worldnews.png";
import shop11 from "../../assets/images/partners/news-live.png";
import shop12 from "../../assets/images/partners/informburo.png";
import shop13 from "../../assets/images/partners/massmedia.png";
import shop14 from "../../assets/images/partners/informburo24.png";
import DeviceContext from "../../store/device-context";

const data = [
    {
        operators: [
            { id: 1, image: oper1, href: "#", title: "МТС" },
            { id: 2, image: oper2, href: "#", title: "Билайн" },
            { id: 3, image: oper3, href: "#", title: "Теле2" },
            { id: 4, image: oper4, href: "#", title: "Yota" },
            { id: 5, image: oper5, href: "#", title: "Мегафон" },
        ],
    },
    {
        internet: [
            { id: 1, image: int1, href: "#", title: "Migo.ru" },
            { id: 2, image: int2, href: "#", title: "Event-services.su" },
            { id: 3, image: int3, href: "#", title: "Go-beauty.su" },
            { id: 4, image: int4, href: "#", title: "Startup-max.ru" },
            { id: 5, image: int5, href: "#", title: "In-travel.su" },
            { id: 6, image: int6, href: "#", title: "Kontur" },
            { id: 7, image: int7, href: "#", title: "СloudPayments" },
            { id: 8, image: int8, href: "#", title: "SMSЦентр" },
            { id: 9, image: int9, href: "#", title: "1C" },
            { id: 10, image: int10, href: "#", title: "Контур Диадок" },
        ],
    },
    {
        adv: [
            { id: 1, image: adv1, href: "#", title: "Телеграмм" },
            { id: 2, image: adv2, href: "#", title: "ВКонтакте" },
            { id: 3, image: adv3, href: "#", title: "Яндекс Директ" },
            { id: 4, image: adv4, href: "#", title: "Mail.ru" },
            { id: 5, image: adv5, href: "#", title: "Яндекс" },
            { id: 6, image: adv6, href: "#", title: "eLama" },
        ],
    },
    {
        shops: [
            { id: 1, image: shop1, href: "#", title: "Marrusha shop" },
            { id: 2, image: shop2, href: "#", title: "Savar-shop" },
            { id: 3, image: shop3, href: "#", title: "Kid-fitness" },
            { id: 4, image: shop4, href: "#", title: "Art-lovely" },
            { id: 5, image: shop5, href: "#", title: "Cookday" },
            { id: 6, image: shop6, href: "#", title: "Medic-inform.ru" },
            { id: 7, image: shop7, href: "#", title: "Mama-inform.ru" },
            { id: 8, image: shop8, href: "#", title: "World-woman" },
            { id: 9, image: shop9, href: "#", title: "Kriptovaluti-news" },
            { id: 10, image: shop10, href: "#", title: "World-news.su" },
            { id: 11, image: shop11, href: "#", title: "News-live" },
            { id: 12, image: shop12, href: "#", title: "Informburo24" },
            { id: 13, image: shop13, href: "#", title: "Massmedianews" },
            { id: 14, image: shop14, href: "#", title: "Новости24" },
        ],
    },
];

const Partners = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const device = useContext(DeviceContext);

    const operators_sett = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const all_settings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                },
            },
        ],
    };

    return (
        <div className={`${s.partners} partners`}>
            <section className={s.hero}>
                <div className="container">
                    <h1>Наши партнеры</h1>
                    <p className={s.descr}>
                        Мы рады работе со многими компаниями и всегда открыты к взаимовыгодному сотрудничеству.
                    </p>
                </div>
            </section>
            <section className={s.operators}>
                <div className="container">
                    <h2>Сотовые операторы</h2>

                    {device.isMobile ? (
                        <Slider {...operators_sett}>
                            {data[0].operators.map((el) => (
                                <li key={el.id}>
                                    <a href="#">
                                        <img src={el.image} alt=""></img>
                                        <p>{el.title}</p>
                                    </a>
                                </li>
                            ))}
                        </Slider>
                    ) : (
                        <ul>
                            {data[0].operators.map((el) => {
                                return (
                                    <li key={el.id}>
                                        <a href="#">
                                            <img src={el.image} alt="partner"></img>
                                            <p>{el.title}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>
            <section className={s.internet}>
                <div className="container">
                    <h2>Интернет сервисы</h2>

                    {device.isMobile ? (
                        <Slider {...all_settings}>
                            {data[1].internet.map((el) => (
                                <li key={el.id}>
                                    <a href="#">
                                        <img src={el.image} alt="partner"></img>
                                        <p>{el.title}</p>
                                    </a>
                                </li>
                            ))}
                        </Slider>
                    ) : (
                        <ul>
                            {data[1].internet.map((el) => {
                                return (
                                    <li key={el.id}>
                                        <a href="#">
                                            <img src={el.image} alt="partner"></img>
                                            <p>{el.title}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>
            <section className={s.adv}>
                <div className="container">
                    <h2>Рекламные площадки</h2>

                    {device.isMobile ? (
                        <Slider {...all_settings}>
                            {data[2].adv.map((el) => (
                                <li key={el.id}>
                                    <a href="#">
                                        <img src={el.image} alt="partner"></img>
                                        <p>{el.title}</p>
                                    </a>
                                </li>
                            ))}
                        </Slider>
                    ) : (
                        <ul>
                            {data[2].adv.map((el) => {
                                return (
                                    <li key={el.id}>
                                        <a href="#">
                                            <img src={el.image} alt="partner"></img>
                                            <p>{el.title}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>
            <section className={s.shops}>
                <div className="container">
                    <h2>Интернет магазины и информационные ресурсы</h2>

                    {device.isMobile ? (
                        <Slider {...all_settings}>
                            {data[3].shops.map((el) => (
                                <li key={el.id}>
                                    <a href="#">
                                        <img src={el.image} alt="partner"></img>
                                        <p>{el.title}</p>
                                    </a>
                                </li>
                            ))}
                        </Slider>
                    ) : (
                        <ul>
                            {data[3].shops.map((el) => {
                                return (
                                    <li key={el.id}>
                                        <a href="#">
                                            <img src={el.image} alt="partner"></img>
                                            <p>{el.title}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Partners;
