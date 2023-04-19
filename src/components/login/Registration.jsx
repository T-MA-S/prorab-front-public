import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ym from "react-yandex-metrika";
import "./login.sass";

import { ButtonsGroup } from "../icons/ButtonsGroup";
import getHost from "../../store/host-store";
import { UserIcon } from "../icons/UserIcon";
import { PostIcon } from "../icons/PostIcon";
import { NavLink } from "react-router-dom";
import QuestionMarkSvg from "./svg/QuestionMarkSvg";
import {CSSTransition} from "react-transition-group";

const Registration = () => {
    const [name, setName] = useState({ value: "", invalid: false, error: "" });
    const [email, setEmail] = useState({ value: "", invalid: false, error: "" });
    const [phone, setPhone] = useState({ value: "", invalid: false, error: "" });
    const [promo, setPromo] = useState("");
    const [invalidCode, setInvalidCode] = useState(false);
    const [modal, setModal] = useState(false);

    const [currentPage, setCurrentPage] = useState("register");
    const [code_1, setCode_1] = useState("");
    const [code_2, setCode_2] = useState("");
    const [code_3, setCode_3] = useState("");
    const [code_4, setCode_4] = useState("");

    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);
    }, [seconds]);

    function showErrors(errorsList) {
        setName({ ...name, invalid: false });
        setEmail({ ...email, invalid: false });
        setPhone({ ...phone, invalid: false });

        errorsList.forEach((error) => {
            switch (error.field) {
                case "name":
                    setName({ ...name, invalid: true, error: error.message });
                    break;
                case "email":
                    setEmail({ ...email, invalid: true, error: error.message });
                    break;
                case "phone":
                    setPhone({ ...phone, invalid: true, error: error.message });
                    break;
                default:
            }
        });
    }

    const onRegister = (e) => {
        e.preventDefault();

        const data = {
            name: name.value,
            phone: phone.value,
            email: email.value,
        };

        fetch(
            getHost({
                controller: "user",
                action: "sign-up",
            }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setCurrentPage("code");
                } else {
                    showErrors(result.data);
                }
            });
    };

    const onLogin = (e) => {
        e.preventDefault();

        const code = `${code_1}${code_2}${code_3}${code_4}`;

        const data = {
            phone: phone.value,
            code,
        };

        fetch(
            getHost({
                controller: "user",
                action: "phone-login",
            }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.setItem("token", result.data.access_token);
                    window.location.replace("/lc");
                } else {
                    setInvalidCode(true);
                }
            });
    };

    const getCode = (e) => {
        e.preventDefault();
        setSeconds(30);
        console.log(phone);

        fetch(
            getHost({
                controller: "user",
                action: "get-code",
                phone: phone.value,
            }),
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setCurrentPage("code");
                }
            });
    };

    return (
        <div className="login__registration" onSubmit={onLogin}>
            {currentPage === "register" && (
                <form>
                    <div className="login__box">
                        <div className="input required">
                            <div className="icon">
                                <UserIcon />
                            </div>
                            <input
                                type="text"
                                required
                                name="name"
                                placeholder="Имя/ИП/ООО *"
                                value={name.value}
                                onChange={(e) => setName({ ...name, value: e.target.value })}
                            />

                            {name.invalid && <span className="error">{name.error}</span>}
                        </div>
                        <div className="input requiredTel">
                            <div className="icon">
                                <ButtonsGroup />
                            </div>

                            <InputMask
                                mask="+7 (999) 999 99 99"
                                required
                                name="inputMask"
                                inputmode="decimal"
                                maskChar={null}
                                placeholder="Телефон *"
                                value={phone.value}
                                onChange={(e) => setPhone({ ...phone, value: e.target.value })}
                            />
                            {phone.invalid && <span className="error">{phone.error}</span>}
                        </div>
                        <div className="input requiredEmail">
                            <div className="icon">
                                <PostIcon />
                            </div>

                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email *"
                                value={email.value}
                                onChange={(e) => setEmail({ ...email, value: e.target.value })}
                            />
                            {email.invalid && <span className="error">{email.error}</span>}
                        </div>

                        <div className="input">
                                <div className="icon"  onClick={() => setModal(prevState => !prevState)}>
                                    <div className="icon_relative">
                                        <QuestionMarkSvg />
                                        <CSSTransition
                                            in={modal}
                                            timeout={500}
                                            unmountOnExit
                                            classNames="my-node"
                                        >
                                        <div className="icon__modal">
                                            Введите промокод друга, который уже работает на сервисе, и после первого пополнения кошелька Вам вдвоём начислят
                                             <br/><span> по 50 бонусов!</span>
                                        </div>
                                        </CSSTransition>
                                    </div>
                                </div>
                            <input
                                type="text"
                                name="promo"
                                placeholder="Промокод"
                                value={promo}
                                onChange={(e) => setPromo(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="terms">
                        При регистрации Вы подтверждаете согласие с условиями <br/>
                        <NavLink to="/userTerm" target="_blank">
                            &nbsp;пользовательского соглашения&nbsp;
                        </NavLink>
                        и
                        <NavLink to="/personalData" target="_blank">
                            &nbsp;политикой обработки данных.
                        </NavLink>
                    </p>
                    <button className="login__btn" onClick={onRegister} type="submit">
                        Регистрация
                    </button>
                </form>
            )}
            {currentPage === "code" && (
                <form className="auth-code">
                    <h3>Авторизация</h3>
                    {seconds > 0 && (
                        <p className="descr">В течение {seconds} секунд код придет на Ваш мобильный номер</p>
                    )}
                    <div className="nums-wrapper">
                        <input
                            type="number"
                            maxLength={1}
                            inputmode="decimal"
                            value={code_1}
                            autoFocus
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_1(e.currentTarget.value)}></input>
                        <input
                            type="number"
                            maxLength={1}
                            inputmode="decimal"
                            value={code_2}
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_2(e.currentTarget.value)}></input>
                        <input
                            type="number"
                            maxLength={1}
                            inputmode="decimal"
                            value={code_3}
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_3(e.currentTarget.value)}></input>
                        <input
                            type="number"
                            inputmode="decimal"
                            maxLength={1}
                            value={code_4}
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_4(e.currentTarget.value)}></input>
                    </div>
                    {invalidCode && <span className="code-error">Неверный код</span>}
                    {seconds === 0 && (
                        <p className="get-code" onClick={getCode}>
                            Не получил код
                        </p>
                    )}

                    <button className="login__btn" type="submit" onClick={() => ym(91815886, "reachGoal", "reg_ok")}>
                        Вход
                    </button>
                </form>
            )}
        </div>
    );
};

export default Registration;

function nextInput(x) {
    let ml = ~~x.getAttribute("maxlength");
    if (ml && x.value.length >= ml) {
        do {
            x = x.nextSibling;
        } while (x && !/number/.test(x.type));
        if (x && /number/.test(x.type)) {
            x.focus();
        }
    }
}
