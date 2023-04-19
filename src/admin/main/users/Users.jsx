import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { RatingZero } from "../../../components/icons/RatingZero";
import { RatingIcon } from "../../../components/icons/RatingIcon";
import noAvatar from "../../../assets/images/stubs/avatar.svg";
import { LockIcon } from "../../../components/icons/LockIcon";
import PaginationPattern from "../../../UI/PaginationPattern";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

const Users = () => {
    const [page, setPage] = useState(null);
    const [dataUsers, setDataUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0); //количество страниц с бэка для пагинации

    //необходимо для передачи параметра страницы в url
    const navigate = useNavigate();
    //получаем параметры текущей страницы
    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        //проверяем попали ли на страницу по кнопке назад, и есть ли в параметрах ?page=
        const isPageParam = params.get("page");
        //если есть (!null) то переопределяем
        if (isPageParam !== null) {
            setPage(Number(isPageParam));
        } else {
            setPage(1);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (page !== null) {
            fetch(
                getHost({
                    controller: "user",
                    expand: "account",
                    pagination: {
                        pageSize: 10,
                        page,
                    },
                }),
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
                .then((res) => res.json().then((data) => ({ data, headers: res.headers })))
                .then((result) => {
                    console.log(result);
                    if (result.data.success) {
                        setDataUsers(result.data.data);
                        setPageCount(Number(result.headers.get("X-Pagination-Page-Count")));
                    }
                });
        }
    }, [page]);

    const setChange = (value) => {
        setPage(value);
        //передаем значение страницы в url
        navigate(`?page=${value}`);
    };

    if (dataUsers.length > 0) {
        return (
            <div className="admin__layout">
                <h3>Пользователи</h3>
                <div className="admin__list-titles admin__list-titles_users">
                    <p>ID</p>
                    <p>Фото</p>
                    <p>Имя</p>
                    <p>Зарегистрирован</p>
                    <p>Телефон</p>
                    <p>Рейтинг</p>
                </div>
                <div>
                    {dataUsers.map((el) => (
                        <div className="admin__content-card admin__content-card_users" key={el.id}>
                            <span>#{el.id}</span>
                            {el.avatar === null ? (
                                <img src={noAvatar} alt="avatar" />
                            ) : (
                                <img src={url + el.avatar} alt="avatar" />
                            )}
                            <p>{el.name}</p>
                            <p>{el.account.created.split(" ")[0]}</p>
                            <p>{el.phone}</p>
                            {el.mark === null || el.mark === 0 ? (
                                <span className="admin__content-card_rating zero">
                                    <RatingZero />
                                    <p>0.0</p>
                                </span>
                            ) : (
                                <span className="admin__content-card_rating">
                                    <RatingIcon />
                                    <p>{el.mark}</p>
                                </span>
                            )}
                            <div className="admin__content-card-icons">
                                <NavLink to={`${el.id}`}>
                                    <EyeIcon />
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
                <PaginationPattern setChange={(e, value) => setChange(value)} pageCount={pageCount} page={page} />
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

export default Users;
