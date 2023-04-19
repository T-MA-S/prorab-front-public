import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import InputPhoto from "../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import getHost from "../../../store/host-store";
import { token } from "../../../App";
import axios from "axios";

const CreateCategory = () => {
    const location = useLocation();
    const { state } = location;
    const history = useNavigate();

    //данные из формы
    const [price1, setPrice1] = useState("");
    const [price2, setPrice2] = useState("");
    const [response, setResponse] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [contactsPrice, setContactsPrice] = useState("");
    const [image, setImage] = useState([]);

    //обработка ошибок
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [titleValid, setTitleValid] = useState(true);
    const [imageValid, setImageValid] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSave = () => {
        //проверка на заполненное название
        if (categoryName.length > 0) {
            setTitleValid(true);
            //если у категории предусмотрено наличие изображения, проверка на то, что оно добавлено
            if (state.depth === 0) {
                if (image.length > 0) {
                    setImageValid(true);

                    const formData = new FormData();
                    formData.append("parent_id", state.parent_id);
                    formData.append("type", state.type);
                    formData.append("title", categoryName);
                    formData.append("price_1_name", price1);
                    formData.append("price_2_name", price2);
                    formData.append("image", image[0]);
                    axios
                        .post(
                            getHost({
                                controller: "category",
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
                //если у категории не предусмотрено изображение
                const formData = new FormData();
                formData.append("parent_id", state.parent_id);
                formData.append("type", state.type);
                formData.append("title", categoryName);
                formData.append("price_1_name", price1);
                formData.append("price_2_name", price2);
                axios
                    .post(
                        getHost({
                            controller: "category",
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
            setTitleValid(false);
        }
    };

    return (
        <div className="admin__layout">
            <div className="admin__edit-category">
                <div className="admin__edit-category_top">
                    <div>
                        <button className="admin__back-arrow" onClick={() => history(-1)}>
                            <ArrowLeftIcon />
                        </button>
                        <h3>Создать новую категорию</h3>
                    </div>

                    <button className="admin__btn-blue" onClick={onSave}>
                        Сохранить
                    </button>
                </div>
                <div>
                    {state.depth === 0 && (
                        <InputPhoto
                            images={image}
                            onLoad={setImage}
                            onDelete={setImage}
                            limitText={"Вы можете добавить 1 фото."}
                        />
                    )}
                    {!imageValid && <span className="admin__error">Добавьте изображение</span>}
                </div>

                <div className="admin__edit-category_inputs">
                    <div>
                        <input
                            value={categoryName}
                            placeholder="Название категории"
                            required
                            onChange={(e) => setCategoryName(e.target.value)}></input>
                        {!titleValid && (
                            <span className="admin__error">Поле с названием обязательно для заполнения</span>
                        )}
                    </div>
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
                {error && <span className="admin__error">Что-то пошло не так, попробуйте позже</span>}
                {success && <span className="admin__success">Изменения успешно сохранены</span>}
            </div>
        </div>
    );
};

export default CreateCategory;
