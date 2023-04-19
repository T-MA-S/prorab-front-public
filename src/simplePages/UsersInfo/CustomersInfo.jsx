import { useEffect, useContext } from "react";

import profile from "../../assets/images/usersInfo/cust-register.png";
import rating1 from "../../assets/images/usersInfo/rating-stars.png";
import email from "../../assets/images/usersInfo/register-email.png";
import form from "../../assets/images/usersInfo/register-form.png";
import rating2 from "../../assets/images/usersInfo/rating-num.png";
import terms1 from "../../assets/images/usersInfo/terms1.png";
import terms2 from "../../assets/images/usersInfo/terms2.png";
import terms3 from "../../assets/images/usersInfo/terms3.png";
import terms4 from "../../assets/images/usersInfo/terms4.png";
import video1 from "../../assets/images/usersInfo/video1.png";
import video2 from "../../assets/images/usersInfo/video.png";
import ModalsContext from "../../store/modals-context";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";

const CustomersInfo = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const modal = useContext(ModalsContext);

    return (
        <div className={style.users_info}>
            <section className={`${style.hero} ${style.hero__cust}`}>
                <div className="container">
                    <h1>Информация для заказчиков</h1>
                    <p>В данном разделе Вы можете узнать всю подробную информацию для заказчика сервиса Прораб.</p>
                </div>
            </section>

            <section className={style.video}>
                <div className={style.container}>
                    <img alt="content" src={video1}></img>
                    <div className={style.content_block} onClick={modal.videoModal}>
                        <span></span>
                        <h2>Жмите, чтобы смотреть видео</h2>
                        <p>Вся информация о сервисе в 2-ух минутах</p>
                    </div>
                </div>
                <div className={style.cust}></div>
            </section>

            <section className={style.register}>
                <div className="container">
                    <h2>Регистрация на прораб</h2>
                    <div className={style.register__container}>
                        <div className={style.card}>
                            <h4 className={style.first}>Зарегистрироваться</h4>
                            <img alt="content" src={form}></img>
                            <p>На сервисе очень простая регистрация. Просто заполните свои данные:</p>
                            <ul>
                                <li> Номер телефона</li>
                                <li>Электронная почта</li>
                            </ul>
                        </div>
                        <div className={style.card}>
                            <h4 className={style.second}>Подтвердите Email</h4>
                            <img alt="content" src={email}></img>
                            <p>
                                После регистрации вы получите письмо на электронную почту (для предоставления документов
                                (электронного чека)). <br></br>
                                <span className={style.special}>
                                    Пройдите по ссылке в письме и подтвердите почтовый ящик.
                                </span>
                            </p>
                        </div>
                        <div className={style.card}>
                            <h4 className={style.third}>Заполните профиль</h4>
                            <img alt="content" src={profile}></img>
                            <p>
                                Для более узнаваемости вашего бренда, рекомендуем заполнить профиль.
                                <br></br>
                                <span className={style.special}>
                                    Заполненный профиль поможет быстрее получить отклики на заявки.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.steps}>
                <div className="container">
                    <h2>Подача заявки</h2>
                    <div className={style.steps__container}>
                        <div className={style.steps__video}>
                            <img alt="content" src={video2}></img>
                            <div className={style.content_block}>
                                <a
                                    className={style.video_btn_wrapper}
                                    target="_blank"
                                    href="https://www.youtube.com/watch?v=GyX0IOysRW4">
                                    <span></span>
                                    <h2> смотреть видео</h2>
                                </a>
                                <NavLink to={`/`} className={style.create__advanced} onClick={modal.closeModal}>
                                    Подать заявку
                                </NavLink>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <span className={style.num}>01</span>
                                <p>
                                    После завершения регистрации зайдите во вкладку
                                    <span className={style.special}>&nbsp;«Каталог»</span>
                                </p>
                            </li>
                            <li>
                                <span className={style.num}>02</span>
                                <p>
                                    Выберите необходимую категорию, нажмите кнопку
                                    <span className={style.special}>&nbsp;«Подать заявку»</span>
                                </p>
                            </li>
                            <li>
                                <span className={style.num}>03</span>
                                <p>
                                    В заявке
                                    <span className={style.special}>
                                        &nbsp;опишите детали и требования к выполнению работ.&nbsp;
                                    </span>
                                    Если цена, указанная исполнителем, кажется вам неподходящей, предложите встречную
                                    стоимость.
                                </p>
                            </li>
                            <li>
                                <span className={style.num}>04</span>
                                <p>
                                    Нажмите <span className={style.special}> «Отправить».</span>&nbsp;После прохождения
                                    модерации, ваша заявка будет доступна для просмотра другим пользователям.
                                </p>
                            </li>
                        </ul>

                        <div className={style.btns_mob}>
                            <a
                                className={style.view}
                                target="_blank"
                                href="https://www.youtube.com/watch?v=GyX0IOysRW4">
                                смотреть видео
                            </a>
                            <NavLink to={`/`} className={style.ads} onClick={modal.closeModal}>
                                Подать заявку
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.customersInfo}>
                <div className="container">
                    <div className={style.customersInfo__container}>
                        <h2>Много полезной информации Вы можете посмотреть на нашем YouTube</h2>
                        <p>
                            За более подробной информацией о сервисе Прораб, Вы можете перейти на наш YouTube – канал.
                        </p>
                        <p>
                            На нашем канале мы рассказываем, как зарегистрироваться и подать объявление, как
                            откликнуться на заказ и открыть контакт, как выбрать специалиста или заказчика по рейтингу и
                            отзыву, как удалить аккаунт и много другой полезной информации, вы найдете на нашем канале.
                            Переходите!
                        </p>
                        <a href="https://www.youtube.com/@migoweb2014" target="_blank">
                            Перейти на канал
                        </a>
                    </div>
                </div>
            </section>
            <section className={style.terms}>
                <div className={`container ${style.container__cust}`}>
                    <div className={style.terms__notifications}>
                        <h2>Уведомления</h2>
                        <p>
                            Для того, чтобы не пропустить отклик от исполнителя, необходимы уведомления. Это сообщение,
                            которое будет
                            <span className={style.special}>&nbsp;поступать на ваш телефон и электронную почту</span>,
                            как только исполнитель нажмет кнопку «Откликнуться» на вашу заявку. В разделе уведомления вы
                            всегда найдете поступившие вам отклики от исполнителя
                        </p>
                    </div>
                    <div className={style.terms__payment}>
                        <h2>Оплата</h2>
                        <p>
                            Сервис «Прораб» это агрегатор услуг, где заказчик может напрямую связаться с исполнителем и
                            договориться об услуге, цене и сроках выполнения работ, а исполнитель может добавить
                            объявление о сдаче в аренду транспорта, недвижимости или бригады работников.
                        </p>
                    </div>
                    <ul>
                        <li>
                            <img alt="content" src={terms1}></img>
                            <p>
                                Вы платите только за возможность
                                <span className={style.special}> получить контакты исполнителя</span> и приступить к
                                обсуждению заказа.
                            </p>
                        </li>
                        <li>
                            <img alt="content" src={terms2}></img>
                            <p>
                                Всю информацию об исполнителе вы можете изучить абсолютно
                                <span className={style.special}> бесплатно</span>, как и пользоваться другими функциями
                                сервиса.
                            </p>
                        </li>
                        <li>
                            <img alt="content" src={terms3}></img>
                            <p>
                                Оплата через сервис «Прораб» <span className={style.special}> безопасна</span>, так как
                                сервис «Прораб» не хранит данные платежных карт.
                            </p>
                        </li>
                        <li>
                            <img alt="content" src={terms4}></img>
                            <p>
                                Вся подробная информация есть в видео ролике.<br></br>
                                <span className={style.special}>Для просмотра просто нажмите.</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={style.rating}>
                <div className="container">
                    <div className={style.rating__container}>
                        <h2>Рейтинг</h2>
                        <p>Рейтинг помогает заказчику определиться с выбором исполнителя.</p>
                        <p>
                            Основную роль в формировании рейтинга играет отзыв или оценка. Рейтинг начинает
                            формироваться от первого отзыва или оценки. Чем выше ваш рейтинг, тем выше вероятность того,
                            что заказчик выберет именно Вас!
                        </p>

                        <ul>
                            <li>
                                <div className={style.img_container}>
                                    <img alt="content" src={rating1} />
                                </div>
                                <p>
                                    1. Все оценки, полученные в разных категориях, суммируются в один показатель и
                                    отображаются в карточки пользователя. Рейтинг обновляется постоянно и отображается в
                                    вашем профиле.
                                </p>
                            </li>
                            <li>
                                <div className={style.img_container}>
                                    <img alt="content" src={rating2} />
                                </div>
                                <p>
                                    2. Отзывы могут оставлять только зарегистрированные пользователи сервиса «Прораб».
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomersInfo;
