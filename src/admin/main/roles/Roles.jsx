import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import noAvatar from "../../../assets/images/stubs/avatar.svg";
import PaginationPattern from "../../../UI/PaginationPattern";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

const Roles = () => {
    const [page, setPage] = useState(null);
    const [dataRoles, setDataRoles] = useState([]);
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
                    filter: "",
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
                        setDataRoles(result.data.data);
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

    if (dataRoles.length > 0) {
        return (
            <div className="admin__layout">
                <div className="admin__roles_top">
                    <h3>Роли</h3>
                    <NavLink className="admin__btn-blue" to={"create"}>
                        Создать
                    </NavLink>
                </div>
                <div className="admin__list-titles admin__list-titles_roles">
                    <p>Фото</p>
                    <p>Имя</p>
                    <p>E-mail</p>
                    <p>Дата создания</p>
                    <p>Роль</p>
                </div>
                <div>
                    {dataRoles.map((el) => (
                        <div className="admin__content-card admin__content-card_roles" key={el.id}>
                            {el.avatar === null ? (
                                <img src={noAvatar} alt="avatar" />
                            ) : (
                                <img src={url + el.avatar} alt="avatar" />
                            )}
                            <p>{el.name}</p>
                            <p>{el.email}</p>
                            <p>{el.account.created.split(" ")[0]}</p>

                            <p>
                                {el.account.role === "admin"
                                    ? "Администратор"
                                    : el.account.role === "user"
                                    ? "Пользователь"
                                    : el.account.role === "moderator"
                                    ? "Модератор"
                                    : "Техподдержка"}
                            </p>
                            <div className="admin__content-card-icons">
                                <NavLink to={`edit/${el.id}`}>
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

export default Roles;
