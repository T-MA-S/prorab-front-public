import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { DeleteIcon } from "../../../../components/icons/DeleteIcon";
import stub from "../../../../assets/images/stubs/object-mob.png";
import { EditIcon } from "../../../../components/icons/EditIcon";
import PaginationPattern from "../../../../UI/PaginationPattern";
import getHost, { url } from "../../../../store/host-store";
import Loader from "../../../../components/loader/Loader";
import AuthContext from "../../../../store/auth-context";
import { token } from "../../../../App";
import s from "./style.module.sass";

const Funds = () => {
    const [funds, setFunds] = useState([]);
    const [page, setPage] = useState(null); // Страница пагинации
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const ctx = useContext(AuthContext);

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
                    controller: "charity-fund",
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
                    setLoading(false);
                    if (result.data.success) {
                        setFunds(result.data.data);
                        setPageCount(parseInt(result.headers.get("X-Pagination-Page-Count")));
                    }
                });
        }
    }, [page, ctx.rerender]);

    const onDelete = (id) => {
        fetch(
            getHost({
                controller: "charity-fund",
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
                    ctx.setRerender((prev) => !prev);
                }
            });
    };

    const setChange = (value) => {
        setPage(value);
        //передаем значение страницы в url
        navigate(`?page=${value}`);
    };

    return (
        <div className="admin__layout">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={s.funds}>
                        <div className={s.funds_top}>
                            <h3>Фонды</h3>
                            <NavLink className="admin__btn-blue" to="create">
                                Новый фонд
                            </NavLink>
                        </div>

                        <div className={`${s.funds_titles} admin__list-titles`}>
                            <p>Фото</p>
                            <p>Название</p>
                        </div>
                        {funds.map((el) => {
                            return (
                                <div className={s.fund} key={el.id}>
                                    {el.image === null ? (
                                        <img src={stub} alt="object" />
                                    ) : (
                                        <img src={url + el.image} alt="object" />
                                    )}
                                    <p>{el.title}</p>
                                    <NavLink to={`edit/${el.id}`} state={{ id: el.id }}>
                                        <EditIcon />
                                    </NavLink>
                                    <button className={s.delete} onClick={() => onDelete(el.id)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className={s.pagination}>
                        <PaginationPattern
                            setChange={(e, value) => setChange(value)}
                            pageCount={pageCount}
                            page={page}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Funds;
