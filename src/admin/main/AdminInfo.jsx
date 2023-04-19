import { useContext, useRef, useState } from "react";
import axios from "axios";

import FileInput from "../../UI/FileInput/FileInput";
import getHost, { url } from "../../store/host-store";
import AuthContext from "../../store/auth-context";
import Input from "../../UI/Input";
import { token } from "../../App";
import "../admin.scss";
import avatar from "../../assets/images/stubs/avatar.svg";

const AdminInfo = () => {
    const { userData, setRefreshData } = useContext(AuthContext);

    const [passwordError, setPasswordError] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [dataSuccess, setDataSuccess] = useState(false);

    const inputEmail = useRef();
    const inputName = useRef();
    const inputPassword = useRef();
    const inputPasswordNew = useRef();
    const inputPasswordConfirm = useRef();

    const [isShown, setIsShown] = useState(false);
    const togglePassword = () => setIsShown(!isShown);

    const getImg = (selectedImg) => {
        const formData = new FormData();
        formData.append("avatar", selectedImg);

        axios
            .put(
                getHost({
                    controller: "user",
                    action: "identity-update",
                }),
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
            .then(() => {
                setRefreshData((prev) => !prev);
            })
            .catch((err) => console.log(err));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        // меняем свои имя и роль на странице админа
        let userData = {
            name: inputName.current.value,
            email: inputEmail.current.value,
        };

        fetch(
            getHost({
                controller: "user",
                action: "identity-update",
                expand: "account",
            }),
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(userData),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setDataSuccess(true);
                    setRefreshData((prev) => !prev);
                }
            });
    };

    const changePassword = () => {
        let data = {
            password: inputPassword.current.value,
            passwordNew: inputPasswordNew.current.value,
            passwordConfirm: inputPasswordConfirm.current.value,
        };

        fetch(
            getHost({
                controller: "user",
                action: "change-password",
            }),
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (!result.success) {
                    setPasswordError(true);
                } else {
                    setPasswordSuccess(true);
                }
            });
    };

    return (
        <div className={`admin__info_container ${isShown ? `grid` : ""}`}>
            <form className="person_data admin__info" encType="multipart/form-data" onSubmit={submitHandler}>
                <div>
                    <div className="admin__info_top-wrapper_admin">
                        {userData.avatar === null ? (
                            <>
                                <div className="cabinet__info_avatar">
                                    <img className="cabinet__info_avatar_img" src={avatar} alt="avatar"></img>
                                    <FileInput getImg={getImg} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="cabinet__info_avatar">
                                    <img
                                        className="cabinet__info_avatar_img"
                                        src={url + userData.avatar}
                                        alt="avatar"
                                    />
                                    <FileInput getImg={getImg} />
                                </div>
                            </>
                        )}
                        <div className="admin__info_btns">
                            <div className="admin__info_btns-wrapper">
                                <button className="admin__btn-blue">Сохранить</button>
                                <div className="admin__btn-transparent" onClick={togglePassword}>
                                    Изменить пароль
                                </div>
                            </div>
                            {dataSuccess && <span className="admin__success ">Данные изменены успешно</span>}
                        </div>
                    </div>

                    <div className="box box_input admin__info_profile">
                        <h6>Личная информация</h6>
                        <Input
                            classNameParent="input"
                            type="text"
                            placeholder=""
                            defaultValue={userData.name}
                            ref={inputName}
                        />
                    </div>
                    <div className="admin__info_email">
                        <Input
                            disabled
                            type="email"
                            src="/img/email.svg"
                            classNameParent="input"
                            ref={inputEmail}
                            defaultValue={userData.email}
                        />
                    </div>
                </div>
                <div className="admin__info_notification">
                    <label>
                        <input type="checkbox" id="checkbox"></input>
                        <span></span>
                    </label>
                    <p>Получить уведомления</p>
                </div>
            </form>
            {isShown && (
                <div className="person_data admin__info_change">
                    <h6>Изменить пароль</h6>
                    <div className="admin__info_change_password-container">
                        <Input type="text" classNameParent="input" ref={inputPassword} placeholder="Старый пароль" />
                        <span>Забыли пароль?</span>
                    </div>
                    <Input type="text" classNameParent="input" ref={inputPasswordNew} placeholder="Новый пароль" />
                    <Input
                        type="text"
                        classNameParent="input"
                        ref={inputPasswordConfirm}
                        placeholder="Повторить пароль"
                    />
                    {passwordError && (
                        <p className="name__error">Введен некорректный старый пароль или пароли не совпадают</p>
                    )}
                    {passwordSuccess && <p className="admin__success">Пароль успешно изменен</p>}

                    <button onClick={changePassword} className="admin__btn-blue">
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminInfo;
