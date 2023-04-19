import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import objImg from "../../../assets/images/stubs/object-mob.png";
import noAvatar from "../../../assets/images/stubs/avatar.svg";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";
import moment from "moment";

const OneObject = () => {
    const params = useParams();
    const id = params.id;
    const [currentUser, setCurrentUser] = useState({});
    const [currentObjects, setCurrentObjects] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
                action: id,
                expand: "account",
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                setCurrentUser(result.data);
            });
    }, []);

    const onDelete = () => {
        fetch(
            getHost({
                controller: "user",
                action: id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    window.location.replace("/admin/users");
                }
            });
    };

    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                filter: {
                    user_id: id,
                },
                expand: "city, category",
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                setCurrentObjects(result.data);
            });
    }, []);

    if (Object.keys(currentUser).length > 0) {
        return (
            <div className="admin_one-user_container">
                <div className="admin_one-user_card">
                    <div className="admin_one-user_card-top">
                        <div>
                            <div className="admin_one-user_back">
                                <button className="admin__back-arrow" onClick={() => history(-1)}>
                                    <ArrowLeftIcon />
                                </button>
                                <h3>{currentUser.name}</h3>
                                {currentUser.mark === null ? (
                                    <span className="admin__rating  no-rating">Нет рейтинга</span>
                                ) : (
                                    <span className="admin__rating">{currentUser.mark}</span>
                                )}
                            </div>
                            {/* падает ошибка андефайнд <p>Дата регистрации: {currentUser.account.created}</p> */}
                        </div>
                        <div className="admin_one-user_btns">
                            <button className="admin__btn-transparent" onClick={onDelete}>
                                Удалить
                            </button>
                            <button className="admin__btn-blue">Сохранить</button>
                        </div>
                    </div>
                    {currentUser.avatar === null ? (
                        <div className="admin_one-user_photo">
                            <img src={noAvatar} alt="user" />
                        </div>
                    ) : (
                        <div className="admin_one-user_photo">
                            <img src={url + currentUser.avatar} alt="user" />
                        </div>
                    )}
                    <div className="admin_one-user_card-bottom">
                        <div className="admin_one-user_data-left">
                            <span>Имя / ИП / ООО</span>
                            <p className="admin_data-user">{currentUser.name}</p>
                        </div>
                        {/* <div className="admin_one-user-contacts admin_data-wa">
                            <p>{currentUser.phone}</p>
                        </div> */}

                        <div className="admin_one-user_data-left">
                            <span>E-mail</span>
                            <p className="admin_data-user">{currentUser.email}</p>
                        </div>
                        {/* <div className="admin_one-user-contacts admin_data-tg">
                            <p>{currentUser.phone}</p>
                        </div> */}

                        <div className="admin_one-user_data-left">
                            <span>Номер телефона</span>
                            <p className="admin_data-user">{currentUser.phone}</p>
                        </div>
                        {/* <div className="admin_one-user-contacts admin_data-vb">
                            <p>{currentUser.phone}</p>
                        </div> */}
                    </div>
                </div>
                {currentObjects.length > 0 && (
                    <div className="admin_one-user_posters">
                        <div className="admin_one-user_obj-container">
                            <div className="admin__list-titles admin__list-titles_obj">
                                <p>ID</p>
                                <p>Фото</p>
                                <p>Категория</p>
                                <p>Название</p>
                                <p>Статус</p>
                            </div>
                            <div className="admin_objects_wrapper">
                                {currentObjects.map((el) => (
                                    <div className="admin__objects_object" key={el.id}>
                                        <span>#{el.id}</span>
                                        {el.image === null ? (
                                            <img src={objImg} alt="object" />
                                        ) : (
                                            <img src={url + el.image.filename} alt="object" />
                                        )}
                                        <p>{el.category.title}</p>
                                        <p>{el.name}</p>
                                        {el.status === 0 ? (
                                            <p className="admin_waiting">Ожидает подтверждения</p>
                                        ) : el.status === 1 ? (
                                            <p className="admin_done">Подтверждено</p>
                                        ) : (
                                            <p className="admin_rejected">Отклонено</p>
                                        )}
                                        <NavLink to={`/admin/objects/${el.id}`}>
                                            <EyeIcon />
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="admin__layout">
                <Loader />
            </div>
        );
    }
};

export default OneObject;
