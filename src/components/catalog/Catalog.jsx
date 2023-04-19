import React, { useEffect, useState, useMemo, useContext } from "react";
import { useLocation, useNavigate } from "react-router";

import ProductsList from "./ProductsList/ProductsList";
import getHost, { link } from "../../store/host-store";
import AuthContext from "../../store/auth-context";
import Categories from "./Categories/Categories";
import SubCategories from "./SubCategories";
import PaginationBot from "./paginatonBot";
import { isAppstore, token } from "../../App";
import Filter from "./Filter";
import Sorter from "./Sorter";
import "./catalog.sass";
import ArrowBack from "../../cabinet/request/svg/ArrowBack";

export let paginationMaxPageCount = 0;

const Catalog = (props) => {
    console.log(props.types)
    const ctx = useContext(AuthContext);
    const [allSubCategories, setAllSubCategories] = useState([]); // все категории глубной > 1 с бэка

    const location = useLocation();
    const locationState = location.state;

    const [selectedCategories, setSelectedCategories] = useState(() => {
        if (locationState) {
            return [{ id: locationState.from }];
        }
        return [];
    });

    useEffect(() => {
        if (location.state !== null) {
            if (location.state.item.depth === 1) {
                setBubleCategories([]);
                setSelectedCategories([{ id: location.state.from }]);
            }
            if (location.state.item.depth === 2) {
                setSelectedCategories([]);
                setBubleCategories([{ id: location.state.from }]);
            }
        } else {
            setSelectedCategories([]);
            setBubleCategories([]);
        }
    }, [location]);

    const [products, setProducts] = useState([]); // Массив Продуктов
    const [favList, setFavList] = useState([]); // Избранные уведомления
    const [selectedBubleCategories, setBubleCategories] = useState([]); // список выбранных баблов категорий

    const [manufacturer, setManufacturer] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);

    const handleCategoriesSelected = (selectedCategories) => {
        // при изменении категории сбрасываем фильтры баблов
        setBubleCategories([]);
        setSelectedManufacturer([]);
        setSelectedCategories(selectedCategories);
    };

    const [sortType, setSortType] = useState(0);
    const filteredSubCategories = useMemo(() => {
        if (location.state !== null && location.state.item.depth === 2) {
            return [];
        }
        return allSubCategories.filter((subCategory) => {
            if (selectedCategories.length === 0) {
                return true;
            }
            return selectedCategories.find(({ id }) => id === subCategory.parent_id) !== undefined;
        });
    }, [selectedCategories, allSubCategories, location]);

    const [page, setPage] = useState(1); // Страница пагинации

    const [pricePlaceholder, setPricePlaceholder] = useState([{}, {}]);
    // Часы/Смена Фильтр
    const [hoursFrom, setHoursFrom] = useState(0);
    const [hoursTo, setHoursTo] = useState(0);
    const [dayFrom, setDayFrom] = useState(0);
    const [dayTo, setDayTo] = useState(0);

    const [filterMobile, setFilterMobile] = useState(""); //фильтрв для мобилных

    const [isDisplayed, setIsDisplayed] = useState(false);

    const pagination = "pagination[pageSize]=9";

    let openFilter = "";

    const onOpenFilter = () => {
        openFilter = "active";
        setFilterMobile(openFilter);
    };

    const getPage = (page) => {
        setPage(page);
    };

    // Вывод товаров
    useEffect(() => {
        let urlMainFetch = `${link}/object${ctx.isUserId ? "/all" : ""}?filter[type]=${+props.types}&filter[city_id]=${
            ctx.location?.city_id
        }`;

        if (selectedBubleCategories.length !== 0) {
            selectedBubleCategories.forEach(({ id }) => {
                urlMainFetch += "&filter[category_id][in][]=" + id;
            });
        }
        if (selectedCategories.length > 0) {
            selectedCategories.forEach(({ id }) => {
                urlMainFetch += "&filter[category_id][in][]=" + id;
            });
        }

        selectedManufacturer.forEach((item) => (urlMainFetch += "&filter[model][in][]=" + item));
        if (hoursFrom > 0) {
            urlMainFetch += `&filter[price_1][gte]=${hoursFrom}`;
        }
        if (hoursTo > 0) {
            urlMainFetch += `&filter[price_1][lte]=${hoursTo}`;
        }
        if (dayFrom > 0) {
            urlMainFetch += `&filter[price_2][gte]=${dayFrom}`;
        }
        if (dayTo > 0) {
            urlMainFetch += `&filter[price_2][lte]=${dayTo}`;
        }
        if (sortType === 1) {
            urlMainFetch += `&sort=-mark`;
        }
        if (sortType === 2) {
            urlMainFetch += `&sort=-updated`;
        }
        urlMainFetch += "&" + pagination + `&page=${page}`;
        fetch(urlMainFetch + "&expand=user", {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json().then((data) => ({ data, headers: res.headers })))
            .then((result) => {
                setProducts(result.data.data);
                console.log(result.data.data);
                console.log(urlMainFetch);
                paginationMaxPageCount = +result.headers.get("X-Pagination-Page-Count");
            });
    }, [
        selectedBubleCategories,
        filteredSubCategories,
        selectedManufacturer,
        ctx.location,
        ctx.rerender,
        selectedCategories,
        ctx.isUserId,
        props.types,
        pagination,
        sortType,
        hoursFrom,
        hoursTo,
        dayFrom,
        dayTo,
        page,
    ]);

    //Фильтр модели
    useEffect(() => {
        let urlFilterModels = `${link}/object/get-model-list?`;
        if (selectedBubleCategories.length !== 0) {
            selectedBubleCategories.forEach(({ id }) => {
                urlFilterModels += "&filter[category_id][in][]=" + id;
            });
        } else {
            filteredSubCategories.forEach(({ id }) => {
                urlFilterModels += "&filter[category_id][in][]=" + id;
            });
        }
        fetch(urlFilterModels, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setManufacturer(result.data);
            });
    }, [selectedBubleCategories, filteredSubCategories]);

    //Цены фильтра минимум-максимум
    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                action: "get-price-ranges",
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
                setPricePlaceholder(Object.values(result.data));
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        setInterval(() => {
            setIsDisplayed(true);
        }, 700);
    }, []);

    const navigate = useNavigate();

    return (
        <section className="equipment">
            {isAppstore && (
                <div className="container">
                    <button className="app__back_btn" onClick={() => navigate(-1)}>
                        <ArrowBack />
                        Вернуться назад
                    </button>
                </div>
            )}
            <Categories
                h1={props.h1}
                types={props.types}
                selectedCategories={selectedCategories}
                onCategoriesSelect={handleCategoriesSelected}
                onAllSubCategoriesLoad={setAllSubCategories}
                onRealtyFilter={setBubleCategories}
                locationState={locationState}
            />
            <SubCategories
                sortType={sortType}
                onSortChange={setSortType}
                selectedBubles={selectedBubleCategories}
                onBublesChange={setBubleCategories}
                subCategories={filteredSubCategories}
                onClick={onOpenFilter}
            />

            <div className="container">
                <div className="equipment__wrap">
                    <Filter
                        manufacturer={manufacturer}
                        selectedManufacturer={selectedManufacturer}
                        onManufacturerSelect={setSelectedManufacturer}
                        pricePlaceholder={pricePlaceholder}
                        filterMobile={filterMobile}
                        setFilterMobile={setFilterMobile}
                        types={props.types}
                        setHoursFrom={setHoursFrom}
                        setHoursTo={setHoursTo}
                        setDayFrom={setDayFrom}
                        setDayTo={setDayTo}
                    />

                    <div className="equipment__content">
                        <Sorter className="nav_link" selected={sortType} setSelected={setSortType} />
                        <ProductsList
                            categoryProd={products}
                            setProducts={setProducts}
                            favList={favList}
                            setFavList={setFavList}
                        />
                        {isDisplayed && <PaginationBot getPage={getPage} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;
