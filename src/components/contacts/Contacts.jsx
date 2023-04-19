import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import logo from "../../assets/images/logo.svg";
import { useEffect } from "react";
import "./Contacts.sass";

const Contacts = (props) => {
    const defaultState = {
        center: [55.82666922566204, 37.65504600859829],
        zoom: 18,
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="contacts">
            <div className="contacts__map">
                <YMaps>
                    <Map width="100%" height="535px" defaultState={defaultState}>
                        <Placemark geometry={[55.82666922566204, 37.65504600859829]} />
                    </Map>
                </YMaps>
            </div>
            <div className="contacts__wrap">
                <div className="contacts__block">
                    <div className="contacts__block-top">
                        <div>
                            <h2 className="title">Kонтакты</h2>
                            <h5 className="h5">Адрес :</h5>
                            <p className="text">
                                119296, г. Москва, муниципальный округ Гагаринский, ул. Молодёжная, д. 3, пом. XVII,
                                офис 6.
                            </p>
                            <div className="box">
                                <div className="wrap">
                                    <h6 className="h6">Электронная почта</h6>
                                    <a href="info@foreman-go.ru" className="email">
                                        info@foreman-go.ru
                                    </a>
                                </div>
                                <div className="wrap">
                                    <h6 className="h6">Для звонков по РФ</h6>
                                    <a href="tel:8-495-128-73-00" className="phone">
                                        8-495-128-73-00 (бесплатно)
                                    </a>
                                </div>
                            </div>
                        </div>
                        <img src={logo} alt="" className="logo" />
                    </div>
                </div>
                <div className="contacts__block">
                    <h2 className="title">Юридическая информация</h2>
                    <div className="box">
                        <div className="left">
                            <h6 className="h6">Полное наименование: </h6>
                            <p className="text"> ООО "МигоВеб".</p>
                            <h6 className="h6">Юридический адрес:</h6>
                            <p className="text">
                                119296, г. Москва, муниципальный округ Гагаринский, ул. Молодёжная, д. 3, пом. XVII,
                                офис 6.
                            </p>
                            <h6 className="h6">Фактический адрес местонахождения: </h6>
                            <p className="text">
                                119296, г. Москва, муниципальный округ Гагаринский, ул. Молодёжная, д. 3, пом. XVII,
                                офис 6.
                            </p>
                        </div>
                        <div className="right">
                            <h6 className="h6">ИНН: </h6>
                            <p className="text">0411167510/041101001</p>
                            <h6 className="h6">ОГРН:</h6>
                            <p className="text">1140411000124</p>
                            <p className="text">Код ОКВЭД: 73.12</p>
                            <h6 className="h6">Банк: </h6>
                            <p className="text">АО "АЛЬФА-БАНК"</p>
                            <p className="text">БИК: 044525593</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacts;
