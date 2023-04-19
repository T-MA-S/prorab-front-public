import "./City.sass";
import AsyncSelect from "react-select/async";
import { customStyles2, DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import { customStyles } from "../../../components/header/headerTop/headerSelects/selects";
import { useEffect, useReducer, useState } from "react";
import { token } from "../../../App";
import axios from "axios";
import getHost, { link } from "../../../store/host-store";

export const initialCount = {
    region: 0,
    category: 0,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "plus":
            return { region: state.region + 1 };
    }
};

const SelectCity = ({ id, getIdCity }) => {
    const [state, dispatch] = useReducer(reducer, initialCount);
    const [dataCity, setDataCity] = useState([]);
    const [country, setCountry] = useState(0);
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                action: id,
                expand: "category, city.region, city.region.country",
            }),
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then(({ data }) => {
                setDataCity(data);
            });
        getIdCity(city.value);
    }, [id, city.value]);

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
            .get(`country?pagination=0&sort=name`)
            .then((response) => {
                setCountry({
                    label: dataCity.city.region.country.name,
                    value: dataCity.city.region.country_id,
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
            .get(`region?filter[country_id]=${country.value}&pagination=0&sort=name`)
            .then((response) => {
                if (state.region === 0) {
                    setRegion({
                        label: dataCity.city.region.name,
                        value: dataCity.city.region_id,
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
            .get(`city?filter[region_id]=${region.value}&pagination=0&sort=name`)
            .then((response) => {
                if (state.region === 0) {
                    setCity({
                        label: dataCity.city.name,
                        value: dataCity.city.id,
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

    const onChangeCountry = (event) => {
        dispatch({ type: "plus" });
        setCountry(event);
        setRegion("");
        setCity("");
    };

    const onChangeRegion = (event) => {
        dispatch({ type: "plus" });
        setRegion(event);
        setCity("");
    };

    const onChangeCity = (event) => {
        setCity(event);
    };

    return (
        <div className="city__edit">
            <div className="city__block dn">
                <AsyncSelect
                    key={dataCity.city}
                    components={{ DropdownIndicator }}
                    placeholder={"Cтрана"}
                    cacheOptions
                    defaultOptions
                    styles={customStyles2}
                    value={country}
                    loadOptions={loadOptions}
                    onChange={onChangeCountry}
                />
            </div>
            <div className="city__block">
                <AsyncSelect
                    key={country.value}
                    components={{ DropdownIndicator }}
                    placeholder={"Регион"}
                    cacheOptions
                    defaultOptions
                    styles={customStyles2}
                    value={region}
                    loadOptions={loadOptions2}
                    onChange={onChangeRegion}
                />
            </div>
            <div className="city__block">
                <AsyncSelect
                    key={region.value}
                    components={{ DropdownIndicator }}
                    placeholder={"Город"}
                    cacheOptions
                    defaultOptions
                    styles={customStyles2}
                    value={city}
                    loadOptions={loadOptions3}
                    onChange={onChangeCity}
                />
            </div>
        </div>
    );
};

export default SelectCity;
