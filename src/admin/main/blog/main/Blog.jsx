import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { DeleteIcon } from "../../../../components/icons/DeleteIcon";
import object from "../../../../assets/images/stubs/object-mob.png";
import { CloseIcon } from "../../../../components/icons/CloseIcon";
import { EditIcon } from "../../../../components/icons/EditIcon";
import PaginationPattern from "../../../../UI/PaginationPattern";
import { AddIcon } from "../../../../components/icons/AddIcon";
import getHost, { url } from "../../../../store/host-store";
import ModalsContext from "../../../../store/modals-context";
import Loader from "../../../../components/loader/Loader";
import AuthContext from "../../../../store/auth-context";
import { token } from "../../../../App";
import s from "./style.module.sass";

const Blog = () => {
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(null); // Страница пагинации
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const modal = useContext(ModalsContext);
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
        //получить категории и статьи
        window.scrollTo(0, 0);

        if (page !== null) {
            fetch(
                getHost({
                    controller: "blog-section",
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
                    console.log(result);
                    if (result.success) {
                        setCategories(result.data);
                    }
                });

            fetch(
                getHost({
                    controller: "blog-article",
                    expand: "articles",
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
                    console.log(result.data.data);
                    setLoading(false);
                    if (result.data.success) {
                        setArticles(result.data.data);
                        setPageCount(parseInt(result.headers.get("X-Pagination-Page-Count")));
                    }
                });
        }
    }, [page, ctx.rerender]);

    const onDelete = (id) => {
        console.log("delete", id);

        fetch(
            getHost({
                controller: "blog-article",
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
                console.log(result);
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
                    <div className={s.categories}>
                        <div>
                            <h3>Разделы</h3>
                            <div className={s.categories_wrapper}>
                                <div onClick={modal.adminBlogNewCategory} className={s.category_add}>
                                    <AddIcon />
                                    <p>Добавить</p>
                                </div>
                                {categories.map((el) => {
                                    return (
                                        <div key={el.id} className={s.category}>
                                            <p>{el.title}</p>
                                            <button onClick={() => modal.adminBlogDeleteCategory(el.id, el.title)}>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <NavLink className="admin__btn-blue" to="create">
                            Создать статью
                        </NavLink>
                    </div>

                    <div className={s.articles}>
                        <h3>Статьи</h3>
                        <div className={`${s.articles_titles} admin__list-titles`}>
                            <p>Фото</p>
                            <p>Название</p>
                            <p>Дата создания</p>
                        </div>
                        {articles.map((el) => {
                            return (
                                <div className={s.article} key={el.id}>
                                    {el.image === null ? (
                                        <img src={object} alt="object" />
                                    ) : (
                                        <img src={url + el.image} alt="object" />
                                    )}
                                    <p>{el.title}</p>
                                    <span>{el.created}</span>
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
                    <PaginationPattern setChange={(e, value) => setChange(value)} pageCount={pageCount} page={page} />
                </>
            )}
        </div>
    );
};

export default Blog;
