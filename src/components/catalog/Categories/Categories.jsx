import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import s from "./style.module.sass";
import { token } from "../../../App";
import getHost, { url } from "../../../store/host-store";
import { ChooseIcon } from "../../icons/ChooseIcon";
import DeviceContext from "../../../store/device-context";

const Categories = (props) => {
    const { selectedCategories, onCategoriesSelect, onAllSubCategoriesLoad, types, onRealtyFilter, locationState } = props;
    const location = useLocation();
    const { state } = location;
    const [categories, setCategories] = useState([]);

    const device = useContext(DeviceContext);

    useEffect(() => {

        // if (locationState !== null && locationState.depth === 2) {
        //     onAllSubCategoriesLoad([])
        // } else {
        fetch(
            getHost({
                controller: "category",
                filter: {
                    type: types,
                },
                pagination: 0,
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then(({ data }) => {
                setCategories(data.filter((item) => item.depth === 1));
                //if (types !== 2) {
                    onAllSubCategoriesLoad(data.filter((item) => item.depth > 1));
                //} else {
                    // onAllSubCategoriesLoad([])
                    //onRealtyFilter(data.filter((item) => item.depth > 1));
                //}
            });
        // }

    }, [types, onAllSubCategoriesLoad, onRealtyFilter]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCatalogClick = (item) => {
        if (selectedCategories.find(({ id }) => item.id === id)) {
            onCategoriesSelect(selectedCategories.filter(({ id }) => id !== item.id));
        } else {
            onCategoriesSelect([...selectedCategories, item]);
        }
    };

    return (
        <div className="container">
            <h2 className="title_h2">
                {state === null && props.h1}
                {state !== null && state.title}
            </h2>

            {device.isMobile
                ? state === null && (
                    // написать скрытие элементов
                    <div className={s.categories}>
                        {categories.map((item) => {
                            const active = selectedCategories.find(({ id }) => item.id === id);
                            return (
                                <label className={`${s.categories__card} ${active ? s.active : ""}`} key={item.id}>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCatalogClick(item)}
                                        id={item.id}
                                        className={active ? "checked" : ""}
                                    />

                                    <p className={s.title}>{item.title}</p>
                                    <div className={s.img_wrapper}>
                                        <img src={url + item.image} alt="" />
                                    </div>
                                    <span className={s.choose}>
                                        <ChooseIcon />
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )
                : state === null && (
                    <div className={s.categories}>
                        {categories.map((item) => {
                            const active = selectedCategories.find(({ id }) => item.id === id);
                            return (
                                <label className={`${s.categories__card} ${active ? s.active : ""}`} key={item.id}>
                                    <input type="checkbox" onChange={(e) => handleCatalogClick(item)} id={item.id} />

                                    <p className={s.title}>{item.title}</p>
                                    <div className={s.img_wrapper}>
                                        <img src={url + item.image} alt="" />
                                    </div>
                                    <span className={s.choose}>
                                        <ChooseIcon />
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
        </div>
    );
};

export default Categories;
