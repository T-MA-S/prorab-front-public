import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";

import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import { customStyles } from "../../../components/header/headerTop/headerSelects/selects";
import InputPhoto from "../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import getHost from "../../../store/host-store";
import { token } from "../../../App";
import Select from "react-select";

//опции статуса объявления
const options = [
    { value: "admin", label: "Администратор" },
    { value: "user", label: "Пользователь" },
    { value: "moderator", label: "Модератор" },
    { value: "tech", label: "Техподдержка" },
];

const CreateRole = () => {
    const history = useNavigate();

    //данные из формы
    const [role, setRole] = useState({ value: "user", label: "Пользователь" });
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState([]);

    //обработка ошибок
    const [valid, setValid] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSave = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        if (image.length > 0) {
            formData.append("avatar", image[0]);
        }

        axios
            .post(
                getHost({
                    controller: "user",
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
                //получаем id вернувшийся в ответе, если ок, получаем аккаунт по id
                if (res.data.success) {
                    fetch(
                        getHost({
                            controller: "account",
                            filter: {
                                user_id: res.data.data.id,
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
                            const roleData = {
                                role: role.value,
                            };
                            //если ок, отправляем роль на указанный акааунт
                            if (result.success) {
                                fetch(
                                    getHost({
                                        controller: "account",
                                        action: result.data[0].id,
                                    }),
                                    {
                                        method: "PUT",
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                            Authorization: token,
                                        },
                                        body: JSON.stringify(roleData),
                                    }
                                )
                                    .then((res) => res.json())
                                    .then((result) => {
                                        if (result.success) {
                                            setSuccess(true);
                                            setValid(true);
                                        }
                                    });
                            }
                        });
                } else {
                    setSuccess(false);
                    setValid(false);
                }
            });
    };

    return (
        <div className="admin__layout">
            <div className="admin__edit-category">
                <div className="admin__edit-category_top">
                    <div>
                        <button className="admin__back-arrow" onClick={() => history(-1)}>
                            <ArrowLeftIcon />
                        </button>
                        <h3>Создать нового пользователя</h3>
                    </div>

                    <button className="admin__btn-blue" onClick={onSave}>
                        Сохранить
                    </button>
                </div>
                <div>
                    <InputPhoto
                        images={image}
                        onLoad={setImage}
                        onDelete={setImage}
                        limitText={"Вы можете добавить 1 фото."}
                    />
                </div>

                <div className="admin__edit-category_inputs">
                    <input value={name} placeholder="Имя" required onChange={(e) => setName(e.target.value)}></input>
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
                            placeholder={"Выбрать роль"}
                            value={role}
                            onChange={(value) => setRole(value)}
                        />

                        <input
                            value={password}
                            placeholder="Пароль"
                            required
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                {!valid && <span className="admin__error">Все поля обязательны для заполнения</span>}
                {success && <span className="admin__success">Изменения успешно сохранены</span>}
            </div>
        </div>
    );
};
export default CreateRole;
