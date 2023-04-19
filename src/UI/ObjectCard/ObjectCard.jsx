import { useContext } from "react";

import { RatingIcon } from "../../components/icons/RatingIcon";
import { RatingZero } from "../../components/icons/RatingZero";
import object from "../../assets/images/stubs/object-mob.png";
import { LikeIcon } from "../../components/icons/LikeIcon";
import AuthContext from "../../store/auth-context";
import { url } from "../../store/host-store";
import { NavLink } from "react-router-dom";
import s from "./style.module.sass";

const ObjectCard = ({
    id,
    mark,
    name,
    about,
    image,
    status_busy,
    price_1,
    price_1_name,
    price_2,
    price_2_name,
    toggleFav, //устанавливаем функцию выше, добавить или удалить
    isFavorite, //проверка, добавлено ли объявление в избранное
    favId, //id объвления
}) => {
    const ctx = useContext(AuthContext);
    return (
        <div className={s.card}>
            <div className={s.card__rating}>
                {mark !== null ? (
                    <>
                        <RatingIcon />
                        {mark}
                    </>
                ) : (
                    <>
                        <RatingZero />
                        <span>0.0</span>
                    </>
                )}
            </div>

            {/* кнопка избранное отображается только при авторизации */}
            {ctx.userData?.id && (
                <button
                    className={`${s.card__like} ${isFavorite ? s.active : ""}`}
                    onClick={() => toggleFav(favId ? favId : id)}>
                    <LikeIcon />
                </button>
            )}

            <NavLink to={`/cart/${id}`} className={s.img_wrapper}>
                {image === null ? <img src={object} alt="object" /> : <img src={url + image.filename} alt="object" />}
            </NavLink>
            <div className={s.content}>
                <div className={s.title_box}>
                    <NavLink to={`/cart/${id}`}>
                        <h3 className={s.title}>{name}</h3>
                    </NavLink>

                    {status_busy === 0 ? (
                        <div className={`${s.status} ${s.free}`}>Свободно&nbsp;сегодня</div>
                    ) : status_busy === 1 ? (
                        <div className={`${s.status} ${s.busy}`}>Занят</div>
                    ) : (
                        <div className={`${s.status} ${s.soon}`}>Скоро&nbsp;освободится</div>
                    )}
                </div>
                <div>
                    <div className={s.prices}>
                        <div className={s.prices__left}>
                            <input type="radio" name={"radio" + id} id={"radio" + id} defaultChecked />
                            <label htmlFor={"radio" + id}>
                                <h5>{price_1} ₽</h5>
                                <span>{price_1_name}</span>
                            </label>
                        </div>
                        <div className={s.prices__right}>
                            <input type="radio" id={"radioSub" + id} name={"radio" + id} />
                            <label htmlFor={"radioSub" + id}>
                                <h5>{price_2} ₽</h5>
                                <span>{price_2_name}</span>
                            </label>
                        </div>
                    </div>
                    <h5 className={s.character}>Описание</h5>
                    <p className={s.descr}>{about}</p>
                    <NavLink to={`/cart/${id}`} className={s.btn}>
                        Подать заявку
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ObjectCard;
