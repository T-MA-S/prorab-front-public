import { useContext, useEffect, useReducer, useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import axios from "axios";

import AuthContext from "../../../../store/auth-context";
import { token } from "../../../../App";
import "../../header.sass";
import { link } from "../../../../store/host-store";
import DropDownIndicatorSvg from "../../../icons/DropDownIndicatorSvg";

export const customStyles = {
    control: () => ({
        width: "100%",
        display: "flex",
        background: "#F6F8F9",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        height: 60,
        paddingLeft: 12,
        paddingRight: 18,
    }),
    container: () => ({
        position: "relative",
    }),
    valueContainer: () => ({
        display: "flex",
        flexDirection: "row-reverse",
        overflow: "hidden",
        alignItems: "center",
    }),
    placeholder: () => ({
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "16px",
        color: "#414253",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

export const customStyles2 = {
    control: () => ({
        width: "100%",
        display: "flex",
        background: "#F6F7FE",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        height: 48,
        paddingLeft: 12,
        paddingRight: 18,
        border: "1px solid rgba(84, 110, 219, 0.2)",
    }),
    container: () => ({
        position: "relative",
    }),
    valueContainer: () => ({
        display: "flex",
        flexDirection: "row-reverse",
        overflow: "hidden",
        alignItems: "center",
    }),
    placeholder: () => ({
        fontFamily: "Roboto",
        fontSize: "15px",
        fontWeight: "400",
        lineHeight: "18px",
        color: "rgba(0, 0, 0, 0.4)",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};
export const DropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;
    const caretClass = menuIsOpen ? "caret-up" : "caret-down";
    return (
        <components.DropdownIndicator {...props}>
            <div className={`${caretClass}`}>
                <DropDownIndicatorSvg />
            </div>
        </components.DropdownIndicator>
    );
};

const initialCount = {
    city: 10000,
    region: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "plus":
            return { city: state.city + 1, region: state.region + 1 };
    }
};

const SelectsDrop = () => {
    const ctx = useContext(AuthContext);
    const dataLocation = ctx.location;

    const [state, dispatch] = useReducer(reducer, initialCount); // Нужно для ререндера селектов
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState({});
    const [selectedCity, setSelectedCity] = useState({});

    useEffect(() => {
        const data = {
            country: selectedCountry?.label,
            country_id: selectedCountry?.value,
            region: selectedRegion?.label,
            region_id: selectedRegion?.value,
            city: selectedCity?.label,
            city_id: selectedCity?.value,
        };

        if (selectedCity.value !== undefined) {
            localStorage.setItem("location", JSON.stringify(data));
        }
    }, [selectedCity.value]);

    useEffect(() => {
        setSelectedCountry({
            label: dataLocation.country,
            value: dataLocation.country_id,
        });
        setSelectedRegion({
            label: dataLocation.region,
            value: dataLocation.region_id,
        });
        setSelectedCity({
            label: dataLocation.city,
            value: dataLocation.city_id,
        });
    }, [dataLocation]);

    const handleCountry = (value) => {
        dispatch({ type: "plus" });
        setSelectedCountry(value);
        setSelectedRegion("");
        setSelectedCity("");
    };

    const handleRegion = (value) => {
        dispatch({ type: "plus" });
        setSelectedRegion(value);
        setSelectedCity("");
    };

    const handleCity = (value) => {
        setSelectedCity(value);
        window.location.reload();
    };

    const loadOptions = (inputValue, callback) => {
        const options = [];
        axios
            .create({
                baseURL: `${link}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .get(`country?pagination=0`)
            .then((response) => {
                setSelectedCountry({
                    label: dataLocation.country,
                    value: dataLocation.country_id,
                });
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id,
                    });
                });
                callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
            });
    };

    const loadOptions2 = (inputValue, callback) => {
        let options = [];
        axios
            .create({
                baseURL: `${link}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .get(`region?filter[country_id]=${selectedCountry.value}&pagination=0&sort=name`)
            .then((response) => {
                if (state.region === 0) {
                    setSelectedRegion({
                        label: dataLocation.region,
                        value: dataLocation.region_id,
                    });
                }
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id,
                    });
                });
                callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
            });
    };

    const loadOptions3 = (inputValue, callback) => {
        let options = [];
        axios
            .create({
                baseURL: `${link}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .get(`city?filter[region_id]=${selectedRegion.value}&pagination=0&sort=name`)
            .then((response) => {
                if (state.region === 0) {
                    setSelectedCity({
                        label: dataLocation.city,
                        value: dataLocation.city_id,
                    });
                }
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id,
                    });
                });
                callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
            });
    };

    return (
        <div className="city__select">
            <AsyncSelect
                className="dn"
                key={dataLocation.name}
                components={{ DropdownIndicator }}
                placeholder={"Выбор страны"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedCountry}
                onChange={handleCountry}
                loadOptions={loadOptions}
                noOptionsMessage={() => ""}
            />

            <AsyncSelect
                key={selectedCountry.label}
                components={{ DropdownIndicator }}
                placeholder={"Выбрать регион"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedRegion}
                onChange={handleRegion}
                loadOptions={loadOptions2}
                noOptionsMessage={() => "Выберите страну"}
            />

            <AsyncSelect
                key={selectedRegion.label}
                components={{ DropdownIndicator }}
                placeholder={"Город"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedCity}
                onChange={handleCity}
                loadOptions={loadOptions3}
                noOptionsMessage={() => "Выберите регион"}
            />
        </div>
    );
};
export default SelectsDrop;
