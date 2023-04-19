import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import CustomScrollbar from "../../../../UI/Scrollbar/CustomScrollbar";
import { ArrowBlackIcon } from "../../../icons/ArrowBlackIcon";
import ModalsContext from "../../../../store/modals-context";
import { link } from "../../../../store/host-store";
import Loader from "../../../loader/Loader";
import { token } from "../../../../App";
import style from "./style.module.sass";

const SearchingResults = ({ value, setInput }) => {
    const modal = useContext(ModalsContext);
    const [searchCategoriesResults, setSearchCategoriesResults] = useState([]);
    const [searchObjectsResults, setSearchObjectsResults] = useState([]);
    const [voidInput, setVoidInput] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSearchObjectsResults([]);
        setSearchCategoriesResults([]);

        const timeout = setTimeout(() => onSearch(value), 200);
        return () => clearTimeout(timeout);
    }, [value]);

    function onSearch(value) {
        if (value.length > 0) {
            setLoading(true);
            setVoidInput(false);

            fetch(`${link}/category/search?CategorySearch[query]=${value}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.success) {
                        setSearchCategoriesResults(result.data);
                    }
                })
                .then(
                    fetch(`${link}/object/search?ObjectsSearch[query]=${value}`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: token,
                        },
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            if (result.success) {
                                setSearchObjectsResults(result.data);
                                setLoading(false);
                            }
                        })
                        .catch((err) => console.log(err))
                )
                .catch((err) => console.log(err));
        }
        if (value.length < 1) {
            setVoidInput(true);
        }
    }

    const onLink = (inputValue) => {
        modal.closeModal();
        setInput(inputValue);
    };

    return (
        <div className={style.searching__results}>
            {voidInput ? (
                <p>Введите запрос</p>
            ) : loading ? (
                <Loader />
            ) : searchObjectsResults.length > 0 || searchCategoriesResults.length > 0 ? (
                <CustomScrollbar style={{ height: "300px" }}>
                    {searchCategoriesResults.map((item) => {
                        return item.depth === 0 ? (
                            <NavLink
                                key={item.id}
                                onClick={() => onLink(item.name)}
                                to={{
                                    pathname: `/catalog/${
                                        item.type === 0
                                            ? "spetsialnaya-tehnika"
                                            : item.type === 1
                                            ? "brigady"
                                            : "nedvizhimost"
                                    }`,
                                }}>
                                <div className={style.parent}>
                                    <p className={style.parent__title}>{item.title}</p>
                                    <span>{item.amountOfChildren}</span>
                                </div>
                            </NavLink>
                        ) : item.depth === 1 ? (
                            <NavLink
                                key={item.id}
                                onClick={() => onLink(item.name)}
                                state={{ from: item.id, title: item.title, item }}
                                to={{
                                    pathname: `/catalog/${
                                        item.type === 0
                                            ? "spetsialnaya-tehnika"
                                            : item.type === 1
                                            ? "brigady"
                                            : "nedvizhimost"
                                    }`,
                                }}>
                                <div className={style.subcategory}>
                                    <div className={style.subcategory__title}>
                                        <p className={style.subcategory__title}>{item.title}</p>
                                        {item.type !== 2 && <span>{item.amountOfChildren}</span>}
                                    </div>
                                    <div className={style.subcategory__parent}>
                                        <ArrowBlackIcon />
                                        <p>{item.parent.title}</p>
                                    </div>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink
                                key={item.id}
                                className={style.children}
                                onClick={() => onLink(item.name)}
                                state={{ from: item.id, title: item.title, item }}
                                to={{
                                    pathname: `/catalog/${
                                        item.type === 0
                                            ? "spetsialnaya-tehnika"
                                            : item.type === 1
                                            ? "brigady"
                                            : "nedvizhimost"
                                    }`,
                                }}>
                                <p>{item.title}</p>
                            </NavLink>
                        );
                    })}
                    {searchObjectsResults.map((item) => {
                        return (
                            <NavLink
                                key={item.name}
                                onClick={() => onLink(item.name)}
                                to={{ pathname: `search`, search: `q=${item.name}` }}>
                                <div className={style.parent}>
                                    <p className={style.parent__title}>{item.name}</p>
                                </div>
                            </NavLink>
                        );
                    })}
                </CustomScrollbar>
            ) : (
                <p>Ничего не найдено</p>
            )}
        </div>
    );
};
export default SearchingResults;
