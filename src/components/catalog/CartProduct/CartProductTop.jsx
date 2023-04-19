import { useState, useContext } from "react";

import object from "../../../assets/images/stubs/object.png";
import avatar from "../../../assets/images/stubs/avatar.svg";
import ModalsContext from "../../../store/modals-context";
import { RatingIcon } from "../../icons/RatingIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { RatingZero } from "../../icons/RatingZero";
import { LikeIcon } from "../../icons/LikeIcon";
import s from "./style.module.sass";
import { isAppstore, token } from "../../../App";
import AuthContext from "../../../store/auth-context";
import getHost, { frontLink, url } from "../../../store/host-store";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBack from "../../../cabinet/request/svg/ArrowBack";

const CartProductTop = (props) => {
    const ctx = useContext(AuthContext);
    const modal = useContext(ModalsContext);

    const [priceType, setPriceType] = useState("час");

    const activeLike = (e) => {
        e.currentTarget.classList.toggle(s.active);
    };

    function dropToFav(e) {
        let data = {
            object_id: e.id,
            user_id: ctx.isUserId,
        };
        fetch(
            getHost({
                controller: "favourites",
            }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((res) => console.log(res));
        ctx.setRerender((prev) => !prev);
    }

    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    };

    function removeFromFav(e) {
        fetch(
            getHost({
                controller: "favourites",
                action: e.userFavourite[0].id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => console.log(res));
        ctx.setRerender((prev) => !prev);
    }

    const onShare = (id, name) => {
        const data = {
            url: `${frontLink}/contractor/${id}`,
            title: "Прораб",
            text: `Посмотри профиль "${name}" на Прораб`,
        };
        navigator.share(data);
    };

    const navigate = useNavigate();

    return (
        <section className={s.adv}>
            {isAppstore && (
                <div className="container">
                    <button className="app__back_btn" onClick={() => navigate(-1)}>
                        <ArrowBack />
                        Вернуться назад
                    </button>
                </div>
            )}
            <div className="container">
                <div className={s.adv__wrapper}>
                    <div className={s.adv__photo}>
                        {props?.product?.image === null && <img src={object} alt="object" />}

                        <Slider {...settings} className={`slick_List`}>
                            {props?.product?.images?.map((img, i) => {
                                return (
                                    <div key={i}>
                                        <img src={url + img.filename} alt="object" />
                                    </div>
                                );
                            })}
                        </Slider>

                        <div className={s.rating}>
                            {props?.user?.mark !== null ? (
                                <>
                                    <RatingIcon />
                                    {props?.product?.user?.mark}
                                </>
                            ) : (
                                <>
                                    <RatingZero />
                                    <span>0.0</span>
                                </>
                            )}
                        </div>

                        {ctx.userData?.id && (
                            <button
                                className={`${s.like} ${props?.product?.userFavourite?.length > 0 ? s.active : ""}`}
                                onClick={(e) => {
                                    activeLike(e);
                                    console.log(props.product);
                                    if (!e.currentTarget.classList.contains(s.active)) {
                                        removeFromFav(props?.product);
                                    } else {
                                        dropToFav(props?.product);
                                    }
                                }}>
                                <LikeIcon />
                            </button>
                        )}
                    </div>
                    <div className={s.adv__descr}>
                        <h3>{props?.product?.name}</h3>
                        <h5>Описание</h5>
                        <p>{props?.product?.about}</p>
                    </div>
                    <div className={s.adv__user}>
                        <div className={s.adv__user_wrapper}>
                            <NavLink to={`/contractor/${props?.product?.user?.id}`} className={s.info}>
                                {props?.product?.user?.avatar === null ? (
                                    <img src={avatar} alt="avatar" />
                                ) : (
                                    <img src={url + props?.product?.user?.avatar} alt="avatar" />
                                )}
                                <div className={s.status_wrapper}>
                                    <h4>{props?.product?.user?.name}</h4>
                                    {props?.product?.status_busy === 0 ? (
                                        <div className={`${s.status} ${s.free}`}>Свободно&nbsp;сегодня</div>
                                    ) : props?.product?.status_busy === 1 ? (
                                        <div className={`${s.status} ${s.busy}`}>Занят</div>
                                    ) : (
                                        <div className={`${s.status} ${s.soon}`}>Скоро&nbsp;освободится</div>
                                    )}
                                </div>
                            </NavLink>
                            <div
                                className={s.adv__user_share}
                                onClick={() => onShare(props?.product?.user?.id, props?.product?.user?.name)}>
                                <ShareIcon />
                            </div>
                        </div>
                        <div className={s.adv__radios}>
                            <input
                                type="radio"
                                name={"час"}
                                value={props?.product?.price_1}
                                checked={priceType === "час"}></input>
                            <label htmlFor={"час"} onClick={() => setPriceType("час")}>
                                <h5>{props?.product?.price_1}</h5>
                                <span>{props?.product?.price_1_name}</span>
                            </label>
                            <input
                                type="radio"
                                name={"смена"}
                                value={props?.product?.price_2}
                                checked={priceType === "смена"}></input>
                            <label htmlFor={"смена"} onClick={() => setPriceType("смена")}>
                                <h5>{props?.product?.price_2}</h5>
                                <span>{props?.product?.price_2_name}</span>
                            </label>
                        </div>
                        <div>
                            <button className={s.contacts} onClick={modal.contactsModal}>
                                Открыть контакты
                            </button>
                            <button onClick={modal.requestModal}>Подать заявку</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartProductTop;
