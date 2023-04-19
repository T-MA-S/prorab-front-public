import AsyncSelect from "react-select/async";
import { useContext, useEffect, useState } from "react";

import { customStyles, DropdownIndicator } from "../../../../cabinet/advertisement/createAds/CitySelects";
import ModeratorContext from "../../../../store/moderator-context";
import OnChangeBtn from "../../../buttons/OnChangeBtn";
import CorrectBtn from "../../../buttons/CorrectBtn";
import getHost from "../../../../store/host-store";
import { token } from "../../../../App";
import s from "./style.module.sass";

const CategoryAdv = ({ data, correctClick, isActive }) => {
    const ctx = useContext(ModeratorContext);
    const [isChangeState, setIsChangeState] = useState(false);

    const [type, setType] = useState({ value: null, label: "" });
    const [parentCategory, setParentCategory] = useState({ value: null, label: "" });
    const [category, setCategory] = useState({ value: null, label: "" });

    const types = [
        { value: 0, label: "Спецтехника" },
        { value: 1, label: "Бригады" },
        { value: 2, label: "Недвижимость" },
    ];

    function getLabelType(id) {
        return id === 1 ? "Спецтехника" : id === 2 ? "Бригады" : "Недвижимость";
    }

    const toggleChangeBtn = () => {
        ctx.setIsCorrectAdv({ ...ctx.isCorrectAdv, category: false });
        if (isChangeState) {
            setIsChangeState(false);
        } else {
            setIsChangeState(true);
        }
    };

    useEffect(() => {
        if (data.category === undefined) return;

        fetch(
            getHost({
                controller: "category",
                action: data.category.parent_id,
            }),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setParentCategory({ value: result.data.id, label: result.data.title });
                    setType({ value: result.data.parent_id, label: getLabelType(result.data.parent_id) });
                }
            });

        setCategory({ value: data.category.id, label: data.category.title });
    }, [data.category]);

    const loadCategoryParent = (inputValue, callback) => {
        if (type.value === null) return;

        fetch(
            getHost({
                controller: "category",
                filter: {
                    parent_id: type.value + 1,
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
                callback(
                    result.data
                        .map(({ title, id }) => ({
                            label: title,
                            value: id,
                        }))
                        .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
                );
            });
    };

    const loadCategory = (inputValue, callback) => {
        if (parentCategory.value === null) {
            return;
        }

        fetch(
            getHost({
                controller: "category",
                filter: {
                    parent_id: parentCategory.value,
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
                callback(
                    result.data
                        .map(({ title, id }) => ({
                            label: title,
                            value: id,
                        }))
                        .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
                );
            });
    };

    const loadType = (inputValue, callback) => {
        callback(
            types
                .map(({ label, value }) => ({
                    label,
                    value,
                }))
                .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
        );
    };

    const onTypeChange = (event) => {
        setType(event);
        setCategory({ value: null, label: "" });
        setParentCategory({ value: null, label: "" });
    };

    const onCategoryChange = (event) => {
        setParentCategory(event);
        setCategory({ value: null, label: "" });
    };

    return (
        <div className={`${s.card} ${s.card__category_wrapper} ${isActive && s.active}`}>
            <div className={s.card__category}>
                <h5>Категория</h5>
                {!isChangeState ? (
                    <>
                        <p>{type.label}</p>
                        <p>{parentCategory.label}</p>
                        <p>{category.label}</p>
                    </>
                ) : (
                    <div className={s.card__selects}>
                        <AsyncSelect
                            loadOptions={loadType}
                            onChange={onTypeChange}
                            value={type}
                            cacheOptions
                            defaultOptions
                            styles={customStyles}
                            noOptionsMessage={() => "Выбрать"}
                            components={{ DropdownIndicator }}
                            placeholder={"Выбрать"}
                        />
                        <AsyncSelect
                            key={type.value}
                            loadOptions={loadCategoryParent}
                            onChange={onCategoryChange}
                            cacheOptions
                            defaultOptions
                            value={parentCategory}
                            styles={customStyles}
                            noOptionsMessage={() => "Выбрать"}
                            components={{ DropdownIndicator }}
                            placeholder={"Выберите тип"}
                        />
                        {(type.value === 2 && parentCategory.label === "Аренда оборудования") || type.value !== 2 ? (
                            <AsyncSelect
                                key={parentCategory.value}
                                loadOptions={loadCategory}
                                onChange={setCategory}
                                cacheOptions
                                defaultOptions
                                value={category}
                                styles={customStyles}
                                noOptionsMessage={() => "Выбрать"}
                                components={{ DropdownIndicator }}
                                placeholder={"Выберите категорию"}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>
            <div>
                <CorrectBtn
                    isActive={isActive}
                    correctClick={() => {
                        setIsChangeState(false);
                        correctClick(
                            "category",
                            type.value,
                            (type.value === 2 && parentCategory.label === "Аренда оборудования") || type.value !== 2
                                ? category.value
                                : parentCategory.value
                        );
                    }}
                />
                <OnChangeBtn title={"Редактировать"} toggle={toggleChangeBtn} />
            </div>
        </div>
    );
};

export default CategoryAdv;
