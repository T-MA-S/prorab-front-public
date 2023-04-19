import google from "../../../assets/images/google-icon.svg";
import huawei from "../../../assets/images/huawei-icon.svg";
import apple from "../../../assets/images/apple-icon.svg";
import iphone from "../../../assets/images/iphone.png";
import s from "../style.module.scss";

const Application = () => {
    return (
        <section className={s.app}>
            <div className={`container ${s.app__wrapper}`}>
                <div className={s.container}>
                    <div className={s.app__text}>
                        <h2>О сервисе</h2>
                        <p>
                            ПРОРАБ – это агрегатор услуг в строительной отрасли в России и странах СНГ, разработан для
                            частных лиц и компаний, которые пользуются строительными услугами.
                        </p>
                        <p>
                            Услуги через наш сервис предоставляются без посредников. В каталоге указана цена за каждый
                            вид работы. Подача заявок возможна круглосуточно – для этого вам лишь требуется пройти
                            простую регистрацию через смс. Если у вас возникли вопросы, наши специалисты всегда на связи
                            и готовы дать ответ.
                        </p>
                        <h6>Наша цель – максимально упростить процесс поиска и аренды спецтехники для вас.</h6>
                        <p className={s.special}>Скачать мобильное приложение</p>
                    </div>
                    <div className={s.app__links}>
                        <a
                            target="_blank"
                            href="https://apps.apple.com/us/app/%D0%BF%D1%80%D0%BE%D1%80%D0%B0%D0%B1-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9/id6445844643">
                            <img src={apple} alt="" />
                            <p>
                                загрузите в<br></br>
                                <span> App Store</span>
                            </p>
                        </a>
                        <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.foreman.go">
                            <img src={google} alt="" />
                            <p>
                                загрузите на<br></br>
                                <span> Google Play</span>
                            </p>
                        </a>
                        <a target="_blank" href="https://appgallery.huawei.com/app/C107725959">
                            <img src={huawei} alt="" />
                            <p>
                                загрузите в<br></br>
                                <span> AppGallery</span>
                            </p>
                        </a>
                    </div>
                </div>
                <img src={iphone} className={s.phone} alt="" />
            </div>
        </section>
    );
};

export default Application;
