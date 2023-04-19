import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import objImg from "../../../assets/images/stubs/object-mob.png";
import PaginationPattern from "../../../UI/PaginationPattern";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

const Objects = () => {
    const [pageCount, setPageCount] = useState(0); //количество страниц с бэка для пагинации
    const [dataObjects, setDataObjects] = useState([]);
    const [page, setPage] = useState(null);

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
                    controller: "object",
                    action: "all",
                    expand: "user, city",
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
                    if (result.data.success) {
                        setDataObjects(result.data.data);
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

    if (dataObjects.length > 0) {
        return (
            <div className="admin__layout">
                <h3>Объявления</h3>
                <div className="admin__list-titles admin__list-titles_obj">
                    <p>ID</p>
                    <p>Фото</p>
                    <p>Название</p>
                    <p>Автор объявления</p>
                    <p>Статус</p>
                </div>
                <div>
                    {dataObjects.map((el) => (
                        <div className="admin__objects_object" key={el.id}>
                            <span>#{el.id}</span>
                            {el.image === null ? (
                                <img src={objImg} alt="object" />
                            ) : (
                                <img src={url + el.image.filename} alt="object" />
                            )}
                            <p className="admin__objects_object-name">{el.name}</p>
                            <div>
                                <p>{el.user?.name}</p>
                                <p>{el.user?.phone}</p>
                            </div>
                            {el.status === 0 ? (
                                <p className="admin__waiting">Ожидает</p>
                            ) : el.status === 1 ? (
                                <p className="admin__done">Подтверждено</p>
                            ) : el.status === 2 ? (
                                <p className="admin__rejected">Отклонено</p>
                            ) : el.status === 3 ? (
                                <p className="admin__deactive">Деактивировано пользователем</p>
                            ) : (
                                <p className="admin__delete">Удалено пользователем</p>
                            )}
                            <NavLink to={`${el.id}`}>
                                <EyeIcon />
                            </NavLink>
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

export default Objects;
