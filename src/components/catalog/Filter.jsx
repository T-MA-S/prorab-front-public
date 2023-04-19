import "./catalog.sass";
import React, { useState } from "react";

const Filter = ({
    selectedManufacturer,
    onManufacturerSelect,
    pricePlaceholder,
    setFilterMobile,
    manufacturer,
    filterMobile,
    setHoursFrom,
    setHoursTo,
    setDayFrom,
    setDayTo,
    types,
}) => {
    const [isActivePrice, setActivePrice] = useState(false);
    const [isActiveManufacturer, setActiveManufacturer] = useState(false);

    const activeClickPrice = () => {
        setActivePrice(!isActivePrice);
    };

    const activeClickManufacturer = () => {
        setActiveManufacturer(!isActiveManufacturer);
    };

    const changePriceHourFrom = (event) => {
        setHoursFrom(event.target.value);
    };

    const changePriceHourTo = (event) => {
        setHoursTo(event.target.value);
    };

    const changePriceShiftFrom = (event) => {
        setDayFrom(event.target.value);
    };

    const changePriceShiftTo = (event) => {
        setDayTo(event.target.value);
    };

    const clickCheckboxManufacturer = (item) => {
        if (selectedManufacturer.includes(item)) {
            onManufacturerSelect(selectedManufacturer.filter((name) => name !== item));
        } else {
            onManufacturerSelect([...selectedManufacturer, item]);
        }
    };

    const onOpenFilter = () => {
        setFilterMobile("");
    };

    return (
        <div className={`equipment__aside ${filterMobile}`}>
            <h5 className="title_menu">Меню</h5>

            <button className="close_filter" onClick={onOpenFilter}></button>

            <div className="wrap">
                <div className="box">
                    <button className={isActivePrice ? "btn_open active" : "btn_open"} onClick={activeClickPrice}>
                        <div className="arrow-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none">
                                <path
                                    d="M10.5517 1.72412L5.99997 6.27585L1.44824 1.72412"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        Цена
                    </button>

                    <div className="block_open">
                        <div className="block_title__price">
                            Цена за<span className="marker">&nbsp;час</span>
                        </div>
                        <div className="price">
                            <div className="input">
                                <input
                                    className="price__length"
                                    type="number"
                                    placeholder={pricePlaceholder[0].min}
                                    onChange={changePriceHourFrom}
                                />
                            </div>
                            <div className="input">
                                <input
                                    className="price__length1"
                                    type="number"
                                    placeholder={pricePlaceholder[0].max}
                                    onChange={changePriceHourTo}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="block_open">
                        <div className="block_title__price">
                            Цена за<span className="marker">&nbsp;смену</span>
                        </div>
                        <div className="price">
                            <div className="input">
                                <input
                                    className="price__length2"
                                    type="number"
                                    placeholder={pricePlaceholder[1].min}
                                    onChange={changePriceShiftFrom}
                                />
                            </div>
                            <div className="input">
                                <input
                                    className="price__length3"
                                    type="number"
                                    placeholder={pricePlaceholder[1].max}
                                    onChange={changePriceShiftTo}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {types === 0 && (
                    <div className="box">
                        <button
                            className={isActiveManufacturer ? "btn_open active" : "btn_open"}
                            onClick={activeClickManufacturer}>
                            <div className="arrow-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="8"
                                    viewBox="0 0 12 8"
                                    fill="none">
                                    <path
                                        d="M10.5517 1.72412L5.99997 6.27585L1.44824 1.72412"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            Производитель
                        </button>

                        <div className="block_open">
                            {manufacturer.map((item) => (
                                <div className="checkbox" key={item}>
                                    <input type="checkbox" id={item} onClick={() => clickCheckboxManufacturer(item)} />
                                    <label htmlFor={item}>{item}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
