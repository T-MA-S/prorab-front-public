import "../cabinet.sass";
import { useContext, useEffect, useState } from "react";
import getHost, { url } from "../../store/host-store";
import moment from "moment";
import telegram from "../../assets/images/telegram.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import viber from "../../assets/images/viber.svg";
import AuthContext from "../../store/auth-context";
import { NavLink } from "react-router-dom";
import { token } from "../../App";
import avatar from "../../assets/images/stubs/avatar.svg";
import object from "../../assets/images/stubs/object-mob.png";
import style from "./style.module.sass";
import { RatingIcon } from "../../components/icons/RatingIcon";
import { DottsIcon } from "../../components/icons/DottsIcon";
import { BucketIcon } from "../../components/icons/BucketIcon";
import { BlueStarIcon } from "../../components/icons/BlueStarIcon";
import ModalsContext from "../../store/modals-context";

const ResponseItem = ({ responses, openSettings, setOpenSettings, setRerender, status }) => {
    const modal = useContext(ModalsContext);
    const toggleSettings = (id) => {
        if (openSettings === -1) {
            setOpenSettings(id);
        } else {
            setOpenSettings(-1);
        }
    };

    console.log(responses)
    return (
        <>
            {responses.map((item) => {
                return (
                    <div key={item.id} className={style.response__item}>
                        {status === 1 ? (
                            <>
                                <div className={style.response__item_top_wrapper}>
                                    <div className={style.user_info}>
                                        {item.user.avatar === null ? (
                                            <img src={avatar} alt="user"></img>
                                        ) : (
                                            <img src={url + item.user.avatar} alt="user"></img>
                                        )}
                                        <p>{item.user.name}</p>
                                        {item.user.mark === null ? (
                                            <span className={style.norating}>
                                                <RatingIcon />
                                                0.0
                                            </span>
                                        ) : (
                                            <span>
                                                <RatingIcon />
                                                {item.user.mark}
                                            </span>
                                        )}
                                    </div>

                                    <div className={`${style.object_photo} ${style.disabled}`}>
                                        {item.object.image === null ? (
                                            <img src={object} alt="object"></img>
                                        ) : (
                                            <img src={url + item.object.image.filename} alt="object"></img>
                                        )}
                                        <span>Ваш заказ завершен</span>
                                    </div>
                                </div>

                                <div className={style.object_info}>
                                    <div className={`${style.object_info__title_wrapper} ${style.disabled}`}>
                                        <p>{item.object.name}</p>
                                        <span>
                                            <svg
                                                width="7"
                                                height="9"
                                                viewBox="0 0 7 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M3.5 0C2.57206 0.00107198 1.68243 0.380711 1.02628 1.05563C0.370126 1.73054 0.00104217 2.64562 0 3.60009C0 5.06488 1.03381 6.28126 2.12888 7.56875C2.47538 7.97646 2.83413 8.39812 3.1535 8.82473C3.19437 8.87927 3.24686 8.92343 3.30693 8.95381C3.36701 8.9842 3.43306 9 3.5 9C3.56694 9 3.63299 8.9842 3.69307 8.95381C3.75314 8.92343 3.80563 8.87927 3.8465 8.82473C4.16587 8.39812 4.52462 7.97646 4.87112 7.56875C5.96619 6.28126 7 5.06488 7 3.60009C6.99896 2.64562 6.62987 1.73054 5.97372 1.05563C5.31757 0.380711 4.42794 0.00107198 3.5 0ZM3.5 4.95013C3.24041 4.95013 2.98665 4.87095 2.77081 4.72261C2.55497 4.57426 2.38675 4.36342 2.28741 4.11673C2.18807 3.87004 2.16208 3.5986 2.21272 3.33671C2.26336 3.07483 2.38837 2.83428 2.57192 2.64547C2.75548 2.45667 2.98934 2.32809 3.24394 2.276C3.49854 2.22391 3.76244 2.25064 4.00227 2.35282C4.2421 2.455 4.44708 2.62804 4.5913 2.85005C4.73552 3.07207 4.8125 3.33308 4.8125 3.60009C4.8125 3.95815 4.67422 4.30153 4.42808 4.55471C4.18194 4.80789 3.8481 4.95013 3.5 4.95013Z"
                                                    fill="#B6BFE7"
                                                />
                                            </svg>
                                            {item.object.city.name}
                                        </span>
                                    </div>
                                    <p className={style.descr}>{item.object.about}</p>
                                    <div className={`${style.response__info} ${style.disabled}`}>
                                        <div className={style.response__info_time}>
                                            <span className={style.clock}>Время</span>
                                            <p>
                                                {item.time_from}-{item.time_from}
                                            </p>
                                        </div>
                                        <div className={style.response__info_date}>
                                            <span className={style.date}>Дата работы</span>
                                            <p>
                                                {item.time_from}-{item.time_from}
                                            </p>
                                        </div>
                                        <div className={style.response__info_paid}>
                                            <span className={style.paid}>Оплата</span>
                                            <p>
                                                {item.payment_from}-{item.payment_to} ₽
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.contact} ${style.contact_disabled}`}>
                                    <div className={style.contact__call}>
                                        <a>Позвонить</a>
                                        <div className={style.contact__settings}>
                                            <DottsIcon />
                                        </div>
                                    </div>

                                    {/*<div className={style.contact__messangers}>*/}
                                    {/*    <span>Связаться в месседжере:</span>*/}
                                    {/*    <div className={style.links}>*/}
                                    {/*        <a>*/}
                                    {/*            <img src={whatsapp} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*        <a>*/}
                                    {/*            <img src={telegram} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*        <a>*/}
                                    {/*            <img src={viber} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </>
                        ) : (
                            <>
                                <div className={style.response__item_top_wrapper}>
                                    <div className={style.user_info}>
                                        {item.object?.user?.avatar === null ? (
                                            <img src={avatar} alt="user"></img>
                                        ) : (
                                            <img src={url + item.object?.user?.avatar} alt="user"></img>
                                        )}
                                        <p>{item.object?.user?.name}</p>
                                        {item.object?.user?.mark === null ? (
                                            <span className={style.norating}>
                                                <RatingIcon />
                                                0.0
                                            </span>
                                        ) : (
                                            <span>
                                                <RatingIcon />
                                                {item.object?.user?.mark}
                                            </span>
                                        )}
                                    </div>

                                    <div className={style.object_photo}>
                                        {item.object?.image === null ? (
                                            <img src={object} alt="object"></img>
                                        ) : (
                                            <img src={url + item.object?.image?.filename} alt="object"></img>
                                        )}
                                    </div>
                                </div>

                                <div className={style.object_info}>
                                    <div className={style.object_info__title_wrapper}>
                                        <p>{item.object?.name}</p>
                                        <span>
                                            <svg
                                                width="7"
                                                height="9"
                                                viewBox="0 0 7 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M3.5 0C2.57206 0.00107198 1.68243 0.380711 1.02628 1.05563C0.370126 1.73054 0.00104217 2.64562 0 3.60009C0 5.06488 1.03381 6.28126 2.12888 7.56875C2.47538 7.97646 2.83413 8.39812 3.1535 8.82473C3.19437 8.87927 3.24686 8.92343 3.30693 8.95381C3.36701 8.9842 3.43306 9 3.5 9C3.56694 9 3.63299 8.9842 3.69307 8.95381C3.75314 8.92343 3.80563 8.87927 3.8465 8.82473C4.16587 8.39812 4.52462 7.97646 4.87112 7.56875C5.96619 6.28126 7 5.06488 7 3.60009C6.99896 2.64562 6.62987 1.73054 5.97372 1.05563C5.31757 0.380711 4.42794 0.00107198 3.5 0ZM3.5 4.95013C3.24041 4.95013 2.98665 4.87095 2.77081 4.72261C2.55497 4.57426 2.38675 4.36342 2.28741 4.11673C2.18807 3.87004 2.16208 3.5986 2.21272 3.33671C2.26336 3.07483 2.38837 2.83428 2.57192 2.64547C2.75548 2.45667 2.98934 2.32809 3.24394 2.276C3.49854 2.22391 3.76244 2.25064 4.00227 2.35282C4.2421 2.455 4.44708 2.62804 4.5913 2.85005C4.73552 3.07207 4.8125 3.33308 4.8125 3.60009C4.8125 3.95815 4.67422 4.30153 4.42808 4.55471C4.18194 4.80789 3.8481 4.95013 3.5 4.95013Z"
                                                    fill="#B6BFE7"
                                                />
                                            </svg>
                                            {item.object?.city?.name}
                                        </span>
                                    </div>
                                    <p className={style.descr}>{item.object?.about}</p>
                                    <div className={style.response__info}>
                                        <div className={style.response__info_time}>
                                            <span className={style.clock}>Время</span>
                                            <p>
                                                {item.time_from}-{item.time_from}
                                            </p>
                                        </div>
                                        <div className={style.response__info_date}>
                                            <span className={style.date}>Дата работы</span>
                                            <p>
                                                {item.time_from}-{item.time_from}
                                            </p>
                                        </div>
                                        <div className={style.response__info_paid}>
                                            <span className={style.paid}>Оплата</span>
                                            <p>
                                                {item.payment_from}-{item.payment_to} ₽
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.contact}>
                                    <div className={style.contact__call}>
                                        <a href={`tel:${item.object?.user?.phone}`}>Позвонить</a>
                                        <div
                                            className={style.contact__settings}
                                            onClick={() => toggleSettings(item.id)}>
                                            <DottsIcon />
                                            {openSettings === item.id && (
                                                <div className={style.contact__settings_btns}>
                                                    {/* <button onClick={() => onDeleteResponse(item.id)}>
                                                        <BucketIcon />
                                                        Удалить
                                                    </button> */}
                                                    <button onClick={() => modal.feedbackModal(item.object.user.id)}>
                                                        <BlueStarIcon />
                                                        Оставить отзыв
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/*<div className={style.contact__messangers}>*/}
                                    {/*    <span>Связаться в месседжере:</span>*/}
                                    {/*    <div className={style.links}>*/}
                                    {/*        <a href={`tel:${item.object?.user?.whatsapp}`}>*/}
                                    {/*            <img src={whatsapp} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*        <a href={`tel:${item.object?.user?.telegram}`}>*/}
                                    {/*            <img src={telegram} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*        <a href={`tel:${item.object?.user?.viber}`}>*/}
                                    {/*            <img src={viber} alt="wa"></img>*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default ResponseItem;
