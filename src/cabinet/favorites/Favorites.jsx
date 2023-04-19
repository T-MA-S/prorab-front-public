import { useState, useEffect, useContext } from "react";

import Loader from "../../components/loader/Loader";
import AuthContext from "../../store/auth-context";
import PaginationUtil from "./PaginationUtil";
import FavoritesTypes from "./FavoritesTypes";
import getHost from "../../store/host-store";
import FavoritesList from "./FavoritesList";
import style from "./style.module.sass";
import { token } from "../../App";

const FavoritesAds = () => {
    const ctx = useContext(AuthContext);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);
    const [type, setType] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1); // Страница пагинации
    const [loading, setLoading] = useState(true);
    const [rerender, setRerender] = useState(false);

    const fetchLink = getHost({
        controller: "favourites",
        expand: "object, object.user",
        filter: {
            "object.type": type,
            "favourites.user_id": ctx.isUserId,
        },
        pagination: {
            pageSize: 6,
            page,
        },
    });

    // Первый запрос на подгрузку
    useEffect(() => {
        window.scrollTo(0, 0);
        //получили типы главных категорий(type0
        fetch(
            getHost({
                controller: "category",
                filter: {
                    depth: 0,
                },
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
                if (result.success) {
                    setCategory(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, []);

    // Запросы на подгрузку при смене категории или страницы
    const toggleCategory = (type) => {
        setLoading(true);
        setType(type);
        setPage(1);
    };
    useEffect(() => {
        fetch(fetchLink, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json().then((data) => ({ data, headers: res.headers })))
            .then((result) => {
                setLoading(false);
                if (result.data.success) {
                    setData(result.data.data);
                    setPageCount(parseInt(result.headers.get("X-Pagination-Page-Count")));
                }
            });
    }, [fetchLink, rerender]);

    return (
        <div className="cabinet__redesign_container">
            <h3 className="cabinet__redesign_title">Избранное</h3>

            <div className={style.favorites}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <FavoritesTypes toggleCategory={toggleCategory} type={type} category={category} />
                        <div className={style.favorites__list_wrapper}>
                            <FavoritesList
                                type={type}
                                data={data}
                                toggleCategory={toggleCategory}
                                setRerender={setRerender}
                            />
                        </div>
                        <PaginationUtil count={pageCount} setPage={setPage} />
                    </>
                )}
            </div>
        </div>
    );
};

export default FavoritesAds;
