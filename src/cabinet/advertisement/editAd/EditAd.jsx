import { useEffect, useState, useRef, useContext, useReducer } from "react";
import InputPhoto from "../createAds/InputPhoto";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { token } from "../../../App";
import { customStyles2 } from "../../../components/header/headerTop/headerSelects/selects";
import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import Input from "../../../UI/Input";
import { CalendarIcon } from "../../../components/icons/CalendarIcon";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import AuthContext from "../../../store/auth-context";
import SelectCity, { initialCount, reducer } from "./SelectCity";
import getHost, { link, url } from "../../../store/host-store";
import ruble from "../../../assets/images/ruble.svg";
import CabinetSocToggle from "../../cabinetInfo/CabinetSocToggle";
import ModalsContext from "../../../store/modals-context";
import {useDispatch, useSelector} from "react-redux";
import {calendarAction} from "../../../store/redux";

const useFetchAd = (id) => {
    const [ad, setAd] = useState({});

    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                action: id,
                expand: "category, city.region, city.region.country, scheduleIsBusies, images",
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
            .then((res) => {
                if (res.success){
                    setAd(res.data);
                }else{
                    if(res.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
                console.log(res.data);
            }).catch(error => {
                console.log(error)
        });
    }, [id]);
    return ad;
};


const typeInput = {
    0: "техники",
    1: "бригады",
    2: "недвижимости",
};
const convertTypeInputToString = (type) => typeInput[type];

const EditAd = ({ id, onPageChange, onBack, setActiveToggle, type }) => {
    const ad = useFetchAd(id);
    const modal = useContext(ModalsContext);
    const [state, dispatch] = useReducer(reducer, initialCount);
    const [currentImages, setCurrentImages] = useState(null);
    const [downloadImages, setDownloadImages] = useState([]);
    const [weekend, setWeekend] = useState(0);
    const [getCategoryFetch, setCategoryFetch] = useState([]);

    const [category, setCategory] = useState(null);
    const [categoryParent, setCategoryParent] = useState(null);

    const [cityId, setCityId] = useState(null);
    const reduxDispatch = useDispatch();

    const dates = useSelector(state => state.calendar.calendarBack);

    useEffect(() => {
        setWeekend(ad.work_on_weekend);
    }, [ad]);

    useEffect(() => {
        reduxDispatch(calendarAction.fromBackToFront(ad?.scheduleIsBusies))
    }, [ad.scheduleIsBusies])


    useEffect(() => {
        reduxDispatch(calendarAction.workOnWeekends(weekend))
    }, [weekend]);

    const getIdCity = (cityId) => {
        setCityId(cityId);
    };

    const loadCategoryParent = (inputValue, callback) => {
        // запрашиваем список для "Тип техники"
        if (ad.type === undefined) {
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
            .get(`category?filter[type]=${ad.type}&filter[depth]=1&pagination=0`)
            .then(({ data }) => {
                let categoryParent;
                if (ad.category.type === 2 && ad.category.equipment === 0) {
                    categoryParent = data.data.find((parent) => parent.id === ad.category.id);
                } else {
                    categoryParent = data.data.find((parent) => parent.id === ad.category.parent_id);
                }
                setCategoryParent({
                    label: categoryParent?.title,
                    value: categoryParent?.id,
                });
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
            .get(`category?filter[parent_id]=${categoryParent.value}&pagination=0`)
            .then(({ data }) => {
                const category = data.data.find((item) => item.id === ad.category_id);
                if (state.category === 0) {
                    setCategory({
                        label: category?.title,
                        value: category?.id,
                    });
                }
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
    const ctx = useContext(AuthContext);
    const saveAds = (event) => {
        event.preventDefault();
        setActiveToggle((prev) => !prev);
        const formData = new FormData();
        let category_id = category === null ? "" : category.value;
        if (+type === 2 && ad.category.equipment === 0) {
            category_id = categoryParent.value;
        }
        let selected_images = downloadImages;
        let city = cityId;

        console.log({
            about: inputAbout.current.value,
            type: ad.type,
            category_id: category_id,
            model: inputModel.current.value,
            name: inputName.current.value,
            price_1: inputPriceHour.current.value,
            city_id: city,
            image: selected_images,
        });

        formData.append("about", inputAbout.current.value);
        // formData.append("type", type);
        formData.append("category_id", category_id);
        formData.append("model", inputModel.current.value);
        formData.append("name", inputName.current.value);
        formData.append("price_1", inputPriceHour.current.value);
        formData.append("price_2", inputPriceDay.current.value);
        formData.append("city_id", city);
        selected_images.forEach((file) => {
            formData.append("image[]", file);
        });
        formData.append("user_id", ctx.isUserId);
        formData.append("quantity", inputQuantity.current.value);
        formData.append("work_on_weekend", weekend ? 1 : 0);
        formData.append("schedule", JSON.stringify(dates));

        axios
            .put(
                getHost({
                    controller: "object",
                    action: id,
                }),
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                }
            )
            .then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    // onSuccess();
                    ctx.setRerender((prev) => !prev);
                } else {
                    console.log(data);
                    console.error("не удалось");
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                console.log('успех')
            });
        onBack("MainPage");
    };

    const inputName = useRef();
    const inputModel = useRef();
    const inputPriceHour = useRef();
    const inputPriceDay = useRef();
    const inputAbout = useRef();
    const inputQuantity = useRef();

    useEffect(() => {
        setCurrentImages(ad.images);
    }, [ad]);

    const deleteCurrentImage = (e, imgID) => {
        if (currentImages === undefined) {
            return;
        }
        e.preventDefault();

        setCurrentImages((prev) => prev.filter((id) => id.id !== imgID));
        console.log(currentImages);
        // setCurrentImages(null);

        fetch(
            getHost({
                controller: "image",
                action: imgID,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json,",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((resp) => resp.json())
            .then((json) => console.log(json));
    };

    const placeholderType = (event) => {
        setCategoryParent(event);
        setCategory("");
        console.log(categoryParent);
        dispatch({ type: "plus" });
    };

    useEffect(() => {
        console.log(category?.value)
        if(category?.value){
            fetch(`${link}/category/${category?.value}`, {
                method: "GET",
                headers: {
                    'Accept': "application/json,",
                    'Content-Type': "application/json",
                    Authorization: token,
                }
            }).then(res => res.json()).then(res => {
                console.log(res.data)
                setCategoryFetch(res.data)
            })
        }
    },[category?.value])

    return (
        <form className="form_cabinet_create">
            <div className="create_ads__center edit_ads__center create_ads">
                {/*<div className="create_ads__back" onClick={closeMiniModal}>*/}
                {/*    <ArrowLeftIcon />*/}
                {/*    <h6>Редактировать</h6>*/}
                {/*</div>*/}

                <div className="create_ads__box">
                    <div className="create_ads_t_block create_ads_border create_ads_border_none">
                        <div className="advers___title">Характеристики:</div>
                        <div className="create__ads_top__block create__ads_block">
                            <div className={`input_wrap  ${type == 2 ? "input_wrap_100" : ""}`}>
                                <AsyncSelect
                                    key={ad.type}
                                    components={{ DropdownIndicator }}
                                    placeholder={"Тип " + convertTypeInputToString(type)}
                                    cacheOptions
                                    defaultOptions
                                    value={categoryParent}
                                    onChange={placeholderType}
                                    styles={customStyles2}
                                    loadOptions={loadCategoryParent}
                                    noOptionsMessage={() => ""}
                                />
                            </div>

                            <div className={`input_wrap ${ad.category?.equipment === 1 || +type !== 2 ? "" : "dn"} ${ad.category?.equipment === 1 && +type === 2 ? "input_wrap_100" : ""}`}>
                                <AsyncSelect
                                    key={categoryParent?.value}
                                    components={{ DropdownIndicator }}
                                    placeholder={"Вид " + convertTypeInputToString(type)}
                                    cacheOptions
                                    value={category}
                                    onChange={setCategory}
                                    defaultOptions
                                    styles={customStyles2}
                                    loadOptions={loadCategory}
                                    noOptionsMessage={() => "Выберите тип " + convertTypeInputToString(type)}
                                />
                            </div>
                            <div className={`input_wrap ${type == 0 ? "" : "dn"}`}>
                                <Input
                                    className="input"
                                    type="text"
                                    placeholder="Модель"
                                    ref={inputModel}
                                    defaultValue={ad.model}></Input>
                            </div>
                            <div className={`input_wrap ${type == 1 ? "" : "dn"}`}>
                                <Input
                                    className="input"
                                    type="number"
                                    placeholder="Кол-во"
                                    ref={inputQuantity}
                                    defaultValue={ad.quantity}></Input>
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
                                    ref={inputName}
                                    defaultValue={ad.name}></Input>
                            </div>

                            {type == 0 && (
                                <div className="input_wrap input_wrap_100">
                                    <Input
                                        ref={inputAbout}
                                        className="textarea"
                                        placeholder="Технические характеристики"
                                        defaultValue={ad.about}></Input>
                                </div>
                            )}
                            {type == 1 || type == 2 ? (
                                <div className="input_wrap input_wrap_100">
                                    <Input
                                        ref={inputAbout}
                                        className="textarea"
                                        placeholder="Описание"
                                        defaultValue={ad.about}></Input>
                                </div>
                            ) : (
                                ""
                            )}

                            {currentImages !== undefined && currentImages !== null && (
                                <div className="imagesMultiple">
                                    {currentImages?.map((img) => {
                                        return (
                                            <div key={img.id} className="input_foto_wrap">
                                                <img src={url + img.filename} alt="" />
                                                <button data_id={img.id} onClick={(e) => deleteCurrentImage(e, img.id)}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {currentImages?.length === 0 && (
                                <InputPhoto
                                    images={downloadImages}
                                    onLoad={setDownloadImages}
                                    onDelete={setDownloadImages}
                                    maxCount={5}
                                    limitText={"До 5-ти фото."}
                                />
                            )}
                        </div>
                    </div>

                    <div className="create__ads_b create_ads_border">
                        <div className="advers___title">Стоимость и график услуги: </div>
                        <div className="create__ads_block create__ads_b_block">
                            <div className="input_wrap inp_wrap_price">
                                <Input
                                    className="input"
                                    type="number"
                                    src={ruble}
                                    placeholder="Введите стоимость"
                                    ref={inputPriceHour}
                                    defaultValue={ad.price_1}></Input>
                                <span className="span">
                                    {getCategoryFetch.price_1_name === null ? getCategoryFetch.parent_price_1_name : getCategoryFetch.price_1_name}
                                </span>
                            </div>

                            <div className="input_wrap inp_wrap_price">
                                <Input
                                    className="input"
                                    type="number"
                                    src={ruble}
                                    placeholder="Введите стоимость"
                                    ref={inputPriceDay}
                                    defaultValue={ad.price_2}></Input>
                                <span className="span">
                                    {getCategoryFetch.price_2_name === null ? getCategoryFetch.parent_price_2_name : getCategoryFetch.price_2_name}
                                </span>
                            </div>
                            <div className="input_wrap">
                                <div className="open_date" onClick={() => {
                                    modal.calendarModal();
                                    reduxDispatch(calendarAction.sendMassiveToBackend())
                                }}>
                                    График работы
                                    <div className="icon_date">
                                        <CalendarIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="input_wrap input_wrap_toggle">
                                <CabinetSocToggle className="info_soc_advs" checked={weekend}
                                                  toggle={() => setWeekend(prevState => !prevState)}/>
                                <span className="span_soc_text">Выходные дни работаю</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="create_ads_border">
                    <div className="advers___title">Место оказания услуги: </div>
                    <div className="create_ads__box">
                        <SelectCity id={id} getIdCity={getIdCity} />
                    </div>
                </div>

                <div className="cabinet_ads__left">
                    <button onClick={saveAds} className="btn_publish btn_save">
                        Сохранить
                    </button>
                </div>
            </div>


        </form>
    );
};

export default EditAd;
