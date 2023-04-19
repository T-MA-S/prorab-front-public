import { useContext, useEffect } from "react";

import mini_mobile from "../assets/images/app-preview-mob.png";
import ApplicationMobile from "../store/app-mobile-context";
import gallery from "../assets/images/huawei-icon.svg";
import mobile from "../assets/images/app-preview.png";
import google from "../assets/images/google-icon.svg";
import apple from "../assets/images/apple-icon.svg";
import qr from "../assets/images/open-qr.png";
import style from "./style.module.scss";

const MobileAppPage = () => {
    const ctx = useContext(ApplicationMobile);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <div className={style.mobile_app_page}>
                <div className={style.left_side}>
                    <h2>
                        <b>Мобильное приложение</b>
                        <br></br>
                        <span>будь всегда на связи</span>
                    </h2>
                    <p className={`${style.text} ${style.text_first}`}>
                        Теперь вы можете сдать в аренду, а также найти и заказать любую спецтехнику, грузовой транспорт,
                        объекты недвижимости или нанять бригаду людей для выполнения работ за считанные минуты прямо со
                        своего смартфона или планшета.
                    </p>
                    <p className={style.text}>
                        Приложение работает без посредников в России и на территории стран СНГ. Услуга доступна на
                        разный срок: несколько часов, день, неделя, месяц.
                    </p>
                    <p className={style.text}>
                        <b>Наша цель – максимально упростить процесс поиска и аренды спецтехники для вас.</b>
                    </p>
                    <div className={style.platforms}>
                        <a
                            className={style.platform}
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=ru.foreman.go">
                            <img src={google} alt="google" />
                            <div>
                                <p>загрузите на</p>
                                <span>Google Play</span>
                            </div>
                        </a>
                        <a
                            className={style.platform}
                            target="_blank"
                            href="https://apps.apple.com/us/app/%D0%BF%D1%80%D0%BE%D1%80%D0%B0%D0%B1-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9/id6445844643">
                            <img src={apple} alt="apple" />
                            <div>
                                <p>загрузите в</p>
                                <span>App Store</span>
                            </div>
                        </a>
                        <a
                            className={style.platform}
                            target="_blank"
                            href="https://appgallery.huawei.com/app/C107725959">
                            <img src={gallery} alt="huawei" />
                            <div>
                                <p>загрузите в</p>
                                <span>AppGallery</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className={style.img_container}>
                    <img className={style.mobile_img} src={mobile}></img>
                    <img className={style.open_popup} src={qr} onClick={ctx.handleAppPopup}></img>
                    <img src={mini_mobile} className={style.mini_mobile}></img>
                </div>
            </div>
        </div>
    );
};

export default MobileAppPage;
