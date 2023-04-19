import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import InputPhoto from "../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

const EditCategory = () => {
    const params = useParams();
    const id = params.id;
    const history = useNavigate();

    //данные из формы
    const [price1, setPrice1] = useState("");
    const [price2, setPrice2] = useState("");
    const [response, setResponse] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [contactsPrice, setContactsPrice] = useState("");
    const [data, setData] = useState([]);

    //текущее и добавленое изображения
    const [currentImages, setCurrentImages] = useState(null);
    const [downloadImages, setDownloadImages] = useState([]);

    //обработка ошибок
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [titleValid, setTitleValid] = useState(true);
    const [imageValid, setImageValid] = useState(true);

    useEffect(() => {
        setCurrentImages(data.image);
    }, [data]);

    const deleteCurrentImage = (e) => {
        if (currentImages === undefined) {
            return;
        }
        e.preventDefault();
        setCurrentImages(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "category",
                action: id,
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
                console.log(result);
                if (result.success) {
                    setData(result.data);
                    result.data.price_1_name === null ? setPrice1("") : setPrice1(result.data.price_1_name);
                    result.data.price_2_name === null ? setPrice2("") : setPrice2(result.data.price_2_name);
                    setCategoryName(result.data.title);
                }
            });
    }, []);

    const onSave = () => {
        const formData = new FormData();

        if (categoryName.length > 0) {
            setTitleValid(true);

            if (data.depth < 2) {
                let selectedImg =
                    downloadImages.length > 0
                        ? downloadImages[0]
                        : currentImages !== undefined && currentImages !== null
                            ? currentImages[0]
                            : null;

                if (selectedImg !== null) {
                    setImageValid(true);

                    formData.append("title", categoryName);
                    formData.append("price_1_name", price1);
                    formData.append("price_2_name", price2);
                    formData.append("image", selectedImg);

                    axios
                        .put(
                            getHost({
                                controller: "category",
                                action: id,
                            }),
                            formData,
                            {
                                headers: {
                                    Accept: "application/json",
                                    Authorization: token,
                                },
                            }
                        )
                        .then((res) => {
                            if (res.data.success) {
                                setSuccess(true);
                                setError(false);
                            } else {
                                setSuccess(false);
                                setError(true);
                            }
                        });
                } else {
                    setImageValid(false);
                }
            } else {
                formData.append("title", categoryName);
                formData.append("price_1_name", price1);
                formData.append("price_2_name", price2);
                axios
                    .put(
                        getHost({
                            controller: "category",
                            action: id,
                        }),
                        formData,
                        {
                            headers: {
                                Accept: "application/json",
                                Authorization: token,
                            },
                        }
                    )
                    .then((res) => {
                        if (res.data.success) {
                            setSuccess(true);
                            setError(false);
                        } else {
                            setSuccess(false);
                            setError(true);
                        }
                    });
            }
        } else {
            setSuccess(false);
            setTitleValid(false);
        }
    };

    const onDelete = () => {
        fetch(
            getHost({
                controller: "category",
                action: id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    window.location.replace("/admin/category");
                } else {
                    setError(true);
                }
            });
    };
    if (Object.keys(data).length > 0) {
        return (
            <div className="admin__layout">
                <div className="admin__edit-category">
                    <div className="admin__edit-category_top">
                        <div>
                            <button className="admin__back-arrow" onClick={() => history(-1)}>
                                <ArrowLeftIcon />
                            </button>
                            <h3>Редактировать категорию</h3>
                        </div>
                        <div>
                            {Object.keys(data).length > 0 && data.depth !== 0 && (
                                <button className="admin__btn-transparent" onClick={onDelete}>
                                    Удалить
                                </button>
                            )}
                            <button className="admin__btn-blue" onClick={onSave}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                    {data.depth < 2 && currentImages !== undefined && currentImages !== null && (
                        <div className="imagesMultiple">
                            <div className="input_foto_wrap">
                                <img src={url + currentImages} alt="" />
                                <button onClick={(e) => deleteCurrentImage(e)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    )}
                    {!imageValid && <span className="admin__error">Добавьте изображение</span>}
                    {data.depth < 2 && currentImages === null && (
                        <InputPhoto
                            images={downloadImages}
                            onLoad={setDownloadImages}
                            onDelete={setDownloadImages}
                            limitText={"Вы можете добавить 1 фото."}
                        />
                    )}
                    <div className="admin__edit-category_inputs">
                        <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></input>
                        <div className="admin__edit-category_labels-wrapper">
                            <label>
                                <p>Цена первая</p>
                                <input value={price1} onChange={(e) => setPrice1(e.target.value)}></input>
                            </label>
                            <label>
                                <p>Цена вторая</p>
                                <input value={price2} onChange={(e) => setPrice2(e.target.value)}></input>
                            </label>
                        </div>
                        <div className="admin__edit-category_labels-wrapper">
                            <label>
                                <p>Сумма отклика</p>
                                <input value={response} onChange={(e) => setResponse(e.target.value)}></input>
                            </label>
                            <label>
                                <p>Сумма открытия контактов</p>
                                <input value={contactsPrice} onChange={(e) => setContactsPrice(e.target.value)}></input>
                            </label>
                        </div>
                    </div>
                    {!titleValid && <span className="admin__error">Поле с названием обязательно для заполнения</span>}
                    {error && <span className="admin__error">Что-то пошло не так, попробуйте позже</span>}
                    {success && <span className="admin__success">Изменения успешно сохранены</span>}
                </div>
            </div>
        );
    } else {
        return (
            <div className="admin__layout">
                <Loader />
            </div>
        );
    }
};

export default EditCategory;
