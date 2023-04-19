import "../../cabinet.sass";
import { useEffect, useState, useRef, useContext } from "react";
import InputPhoto from "./InputPhoto";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { token } from "../../../App";
import { customStyles2 } from "../../../components/header/headerTop/headerSelects/selects";
import CitySelects from "./CitySelects";
import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import Input from "../../../UI/Input";
import { CalendarIcon } from "../../../components/icons/CalendarIcon";
import AuthContext from "../../../store/auth-context";
import { link } from "../../../store/host-store";
import CabinetSocToggle from "../../cabinetInfo/CabinetSocToggle";
import ruble from "../../../assets/images/ruble.svg";
import DeviceContext from "../../../store/device-context";
import ModalsContext from "../../../store/modals-context";
import {useDispatch, useSelector} from "react-redux";
import calendar from "../../../store/redux/calendar";
import {calendarAction} from "../../../store/redux";

const typeMap = {
    0: "спецтехнику",
    1: "бригаду",
    2: "недвижимость",
};
const typeInput = {
    0: "техники",
    1: "бригады",
    2: "недвижимости",
};
const convertTypeToString = (type) => typeMap[type];
const convertTypeInputToString = (type) => typeInput[type];

const CreateAdsForm = (props) => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);
    const device = useContext(DeviceContext);
    const { onSuccess, type } = props;
    const [images, setImages] = useState([]);
    const [cityId, setCityIid] = useState("");
    const [category, setCategory] = useState(null);
    const [categoryParent, setCategoryParent] = useState(null);
    const [haveSubCategories, setHaveSubCategories] = useState(0);
    const [getCategoryFetch, setCategoryFetch] = useState([]);
    const [weekend, setWeekend] = useState(false);

    const getCity = (city) => setCityIid(city.value);
    const dispatch = useDispatch();
    const dates = useSelector(state => state.calendar.calendarBack);
    console.log(dates)


    useEffect(() => {
        // Работаем в выходные boolean
        dispatch(calendar.actions.workOnWeekends(weekend));
    }, [weekend])

    console.log(dates)

    useEffect(() => {
        setCategoryParent(null);
        setHaveSubCategories(0);
    }, [type]);

    const loadCategoryParent = (inputValue, callback) => {
        // запрашиваем список для "Тип техники"
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
            .get(`category?filter[type]=${type}&filter[depth]=1&pagination=0&sort=title`)
            .then((response) => {
                // console.log('category?filter[type]', response.data.data);
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.title,
                        value: permission.id,
                    });
                    callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
                });
            });
    };

    const loadCategory = (inputValue, callback) => {
        // запрашиваем список для "вида техники"
        if (categoryParent == null) {
            return;
        }
        axios
            .create({
                baseURL: `${link}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .get(`category?filter[parent_id]=${categoryParent.value}&pagination=0&sort=title`)
            .then(({ data }) => {
                console.log("category?filter", data.data.length);
                setHaveSubCategories(data.data);
                console.log(data.data);
                callback(
                    data.data
                        .map(({ title, id }) => ({
                            label: title,
                            value: id,
                        }))
                        .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
                );
            });
    };

    const inputName = useRef();
    const inputModel = useRef();
    const inputPriceHour = useRef();
    const inputPriceDay = useRef();
    const inputAbout = useRef();
    const inputQuantity = useRef();

    const createAds = (event) => {
        event.preventDefault();

        const formData = new FormData();
        let category_id = category === null ? "" : category.value;
        let selected_images = images.length === 0 ? null : images;
        let city = cityId === undefined ? "" : cityId;

        if (+type === 2 && haveSubCategories.length === 0) {
            category_id = categoryParent.value;
        }

        console.log(images);

        formData.append("about", inputAbout.current.value);
        formData.append("type", type);
        formData.append("category_id", category_id);
        formData.append("model", inputModel.current.value);
        formData.append("name", inputName.current.value);
        formData.append("price_1", inputPriceHour.current.value);
        formData.append("price_2", inputPriceDay.current.value);
        formData.append("city_id", city);
        {
            selected_images === null
                ? formData.append("image", null)
                : selected_images.forEach((file) => {
                      formData.append("image[]", file);
                  });
        }
        formData.append("active", 1);
        formData.append("user_id", ctx.isUserId);
        formData.append("quantity", inputQuantity.current.value);
        formData.append("work_on_weekend", weekend ? 1 : 0);
        formData.append("schedule", JSON.stringify(dates));

        const sendRequest = async () => {
            await axios
                .post(`${link}/object`, formData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                })
                .then(({ data }) => {
                    if (data.success) {
                        console.log(data);
                        onSuccess();
                        props.onBack("MainPage");
                        dispatch(calendarAction.cancelCalendar());
                    } else {
                        console.error("не удалось");
                        console.log(data);
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    console.log('успех')
                });
            await ctx.setRerender((prev) => !prev);
            // bufferArr = [];
        };
        sendRequest();
    };

    useEffect(() => {
            let linkPrice;
            if(categoryParent?.value){
                linkPrice = `/category/${categoryParent?.value}`
            }else if(category?.value){
                linkPrice = `/category/${category?.value}`
            }else{
                linkPrice = `/category?filter[type]=${props.type}&filter[depth]=0`
            }
            // /category?filter[type]=0&filter[depth]=0
            fetch(`${link}${linkPrice}`, {
                method: "GET",
                headers: {
                    Accept: "application/json,",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        if(linkPrice.includes(`depth`)){
                            setCategoryFetch(res.data[0]);
                            console.log(res.data[0]);
                        }else{
                            console.log(res.data);
                            setCategoryFetch(res.data);
                        }
                    } else {
                        if (res.status === 401) {
                            localStorage.removeItem("token");
                            window.location.replace("/");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

    }, [category?.value, categoryParent?.value, props.type]);

    useEffect(() => {
        // Очистить значения если переключили на другой тип
        setCategoryParent(null);
        setCategory(null);
    }, [props.type])

    return (
        <form className="form_cabinet_create">
            <div className="create_ads__center">
                <div className="create_ads__box">
                    <div className="create_ads_t_block create_ads_border">
                        <div className="advers___title">Характеристики:</div>
                        <div className="create__ads_top__block create__ads_block">
                            <div className={`input_wrap  ${type == 2 ? "input_wrap_100" : ""}`}>
                                <AsyncSelect
                                    key={type}
                                    components={{ DropdownIndicator }}
                                    placeholder={"Тип " + convertTypeInputToString(type)}
                                    cacheOptions
                                    defaultOptions
                                    onChange={setCategoryParent}
                                    value={categoryParent}
                                    styles={customStyles2}
                                    loadOptions={loadCategoryParent}
                                    noOptionsMessage={() => ""}
                                />
                            </div>

                            <div
                                className={`input_wrap ${haveSubCategories.length > 0 || +type !== 2 ? "" : "dn"} ${
                                    haveSubCategories.length > 0 && +type === 2 ? "input_wrap_100" : ""
                                }`}>
                                <AsyncSelect
                                    key={categoryParent?.value}
                                    components={{ DropdownIndicator }}
                                    placeholder={"Вид " + convertTypeInputToString(type)}
                                    cacheOptions
                                    onChange={setCategory}
                                    defaultOptions
                                    styles={customStyles2}
                                    loadOptions={loadCategory}
                                    noOptionsMessage={() => "Выберите тип " + convertTypeInputToString(type)}
                                />
                            </div>

                            <div className={`input_wrap input_wrap_100 ${type == 0 ? "" : "dn"}`}>
                                <Input className="input" type="text" placeholder="Модель" ref={inputModel}></Input>
                            </div>
                            <div className={`input_wrap  ${type == 1 ? "" : "dn"}`}>
                                <Input
                                    className="input"
                                    type="number"
                                    placeholder="Кол-во людей"
                                    ref={inputQuantity}></Input>
                            </div>
                        </div>
                    </div>

                    <div className="create_ads_m_block create_ads_border">
                        <div className="advers___title">Описание:</div>
                        <div className="create_ads_m_flex create__ads_block">
                            <div className="input_wrap">
                                <Input
                                    className="input"
                                    type="text"
                                    placeholder={"Название " + convertTypeInputToString(type)}
                                    ref={inputName}></Input>
                            </div>
                            {type == 0 && (
                                <div className="input_wrap input_wrap_100">
                                    <Input
                                        ref={inputAbout}
                                        className="textarea"
                                        placeholder="Технические характеристики"></Input>
                                </div>
                            )}
                            {type == 1 || type == 2 ? (
                                <div className="input_wrap input_wrap_100">
                                    <Input ref={inputAbout} className="textarea" placeholder="Описание"></Input>
                                </div>
                            ) : (
                                ""
                            )}
                            <InputPhoto
                                images={images}
                                onLoad={setImages}
                                onDelete={setImages}
                                maxCount={5}
                                limitText={"До 5-ти фото."}
                            />
                        </div>
                    </div>

                    <div className="create__ads_b create_ads_border">
                        <div className="advers___title">Стоимость и график услуги: </div>
                        <div className="create__ads_block create__ads_b_block">
                            <div className="input_wrap inp_wrap_price">
                                <Input
                                    className="input"
                                    type="text"
                                    src={ruble}
                                    placeholder="Введите стоимость"
                                    ref={inputPriceHour}></Input>
                                <span className="span">
                                    {getCategoryFetch.price_1_name === null ?
                                        getCategoryFetch.parent_price_1_name
                                        : getCategoryFetch.price_1_name}
                                </span>
                            </div>

                            <div className="input_wrap inp_wrap_price">
                                <Input
                                    className="input"
                                    type="text"
                                    src={ruble}
                                    placeholder="Введите стоимость"
                                    ref={inputPriceDay}></Input>
                                <span className="span">
                                    {getCategoryFetch.price_2_name === null ?
                                        getCategoryFetch.parent_price_2_name
                                        : getCategoryFetch.price_2_name}
                                </span>
                            </div>

                            <div className="input_wrap">
                                <div className="open_date" onClick={modal.calendarModal}>
                                    График работы
                                    <div className="icon_date">
                                        <CalendarIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="input_wrap input_wrap_toggle">
                                <CabinetSocToggle
                                    className="info_soc_advs"
                                    toggle={() =>
                                        setWeekend(prevState => !prevState)
                                    }
                                />
                                <span className="span_soc_text">Выходные дни работаю</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="create_ads_border">
                    <div className="advers___title">Место оказания услуги: </div>
                    <div className="create_ads__box">
                        <CitySelects getCity={getCity} />
                    </div>
                </div>

                {!device.isMobile && (
                    <div className="cabinet_ads__left">
                        <button onClick={createAds} className="btn_publish btn_save">
                            Разместить объявление
                        </button>
                    </div>
                )}
            </div>

            {device.isMobile && (
                <div className="cabinet_ads__left">
                    <button onClick={createAds} className="btn_publish btn_save">
                        Разместить объявление
                    </button>
                </div>
            )}
        </form>
    );
};

export default CreateAdsForm;
