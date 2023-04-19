import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import axios from "axios";

import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import { customStyles } from "../../../components/header/headerTop/headerSelects/selects";
import InputPhoto from "../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

//опции статуса объявления
const options = [
    { value: "admin", label: "Администратор" },
    { value: "user", label: "Пользователь" },
    { value: "moderator", label: "Модератор" },
    { value: "tech", label: "Техподдержка" },
];

const EditRole = () => {
    const params = useParams();
    const id = params.id;
    const history = useNavigate();

    //данные из формы
    const [name, setName] = useState("");
    const [inputName, setInputName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState({});
    //после сохранения обновляем имя вверху
    const [rerender, setRerender] = useState(false);

    //текущее и добавленое изображения
    const [currentImages, setCurrentImages] = useState(null);
    const [downloadImages, setDownloadImages] = useState([]);

    //обработка ошибок
    const [valid, setValid] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "user",
                action: id,
                expand: "account",
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
                    setName(result.data.name);
                    setInputName(result.data.name);
                    setEmail(result.data.email);
                    setPhone(result.data.phone);
                    setCurrentImages(result.data.avatar);
                    setRole({
                        value: result.data.account.role,
                        label:
                            result.data.account.role === "admin"
                                ? "Администратор"
                                : result.data.account.role === "user"
                                    ? "Пользователь"
                                    : result.data.account.role === "moderator"
                                        ? "Модератор"
                                        : "Техподдержка",
                    });
                }
            });
    }, [rerender]);

    const deleteCurrentImage = (e) => {
        if (currentImages === undefined) {
            return;
        }
        e.preventDefault();
        setCurrentImages(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSave = () => {
        let selectedImg =
            downloadImages.length > 0
                ? downloadImages[0]
                : currentImages !== undefined && currentImages !== null
                    ? currentImages[0]
                    : null;
        console.log(selectedImg);
        const formData = new FormData();
        formData.append("name", inputName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("avatar", selectedImg);

        const dataRole = { role: role.value };
        axios
            .all([
                axios.put(
                    getHost({
                        controller: "user",
                        action: id,
                    }),
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: token,
                        },
                    }
                ),
                axios.put(
                    getHost({
                        controller: "account",
                        action: id,
                    }),
                    dataRole,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: token,
                        },
                    }
                ),
            ])

            .then(
                axios.spread((obj1, obj2) => {
                    if (obj1.data.success && obj2.data.success) {
                        setSuccess(true);
                        setValid(true);
                        setRerender((prev) => !prev);
                    } else {
                        setSuccess(false);
                        setValid(false);
                    }
                })
            );
    };

    const onDelete = () => {
        fetch(
            getHost({
                controller: "user",
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
                if (result.success) {
                    window.location.replace("/admin/roles");
                }
            });
    };

    if (name) {
        return (
            <div className="admin__layout">
                <div className="admin__edit-category">
                    <div className="admin__edit-category_top">
                        <div>
                            <button className="admin__back-arrow" onClick={() => history(-1)}>
                                <ArrowLeftIcon />
                            </button>
                            <h3>{name}</h3>
                        </div>
                        <div className="admin_one-object_top-right">
                            <button className="admin__btn-transparent" onClick={onDelete}>
                                Удалить
                            </button>
                            <button className="admin__btn-blue" onClick={onSave}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                    {currentImages !== undefined && currentImages !== null && (
                        <div className="imagesMultiple">
                            <div className="input_foto_wrap">
                                <img src={url + currentImages} alt="" />
                                <button onClick={(e) => deleteCurrentImage(e)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    )}
                    {currentImages === null && (
                        <InputPhoto images={downloadImages} onLoad={setDownloadImages} onDelete={setDownloadImages} />
                    )}

                    <div className="admin__edit-category_inputs">
                        <input
                            value={inputName}
                            placeholder="Имя"
                            required
                            onChange={(e) => setInputName(e.target.value)}></input>
                        <div className="admin__edit-category_labels-wrapper">
                            <InputMask
                                mask="+7 (999) 999 99 99"
                                placeholder="Телефон"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                value={email}
                                placeholder="E-mail"
                                required
                                onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="admin__edit-category_labels-wrapper">
                            <Select
                                className="selects"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                options={options}
                                value={role}
                                onChange={(value) => setRole(value)}
                            />

                            <input
                                value={password}
                                placeholder="Новый пароль"
                                required
                                onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    {!valid && <span className="admin__error">Все поля обязательны для заполнения</span>}
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
export default EditRole;
