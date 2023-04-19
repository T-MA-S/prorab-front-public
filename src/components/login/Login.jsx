import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { ButtonsGroup } from "../icons/ButtonsGroup";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import "./login.sass";

const Login = () => {
    const ctx = useContext(AuthContext);
    const [phone, setPhone] = useState({ value: "", invalid: false, error: "" });
    const [invalidCode, setInvalidCode] = useState(false);

    const [code_1, setCode_1] = useState("");
    const [code_2, setCode_2] = useState("");
    const [code_3, setCode_3] = useState("");
    const [code_4, setCode_4] = useState("");

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(setSeconds, 1000, seconds - 1);
        }
    }, [seconds]);

    const getCode = (e) => {
        e.preventDefault();
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
                console.log(result);
                if (result.success) {
                    ctx.setCurrentPage("code");
                    setSeconds(30);
                } else {
                    showErrors(result.data);
                }
            });
    };

    function showErrors(errorsList) {
        setPhone({ ...phone, invalid: false });

        errorsList.forEach((error) => {
            switch (error.field) {
                case "phone":
                    setPhone({ ...phone, invalid: true, error: error.message });
                    break;
                default:
            }
        });
    }

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

                    if (result.data.role === "admin") {
                        window.location.replace("/lc");
                    } else if (result.data.role === "moderator") {
                        window.location.replace("/moderator");
                    } else if (result.data.role === "user") {
                        window.location.replace("/lc");
                    }
                } else {
                    setInvalidCode(true);
                }
            });
    };

    return (
        <div className="login__entrance">
            {ctx.currentPage === "signIn" && (
                <form>
                    <div className="input">
                        <div className="icon">
                            <ButtonsGroup />
                        </div>
                        <InputMask
                            mask={"+7 (999) 999 99 99"}
                            placeholder="Телефон"
                            maskChar={null}
                            name="inputMask"
                            inputmode="numeric"
                            value={phone.value}
                            onChange={(e) => {
                                setPhone({ ...phone, value: e.target.value });
                            }}
                        />
                        {phone.invalid && <span className="error">{phone.error}</span>}
                    </div>
                    <button className="login__btn" onClick={getCode} type="submit">
                        Вход
                    </button>
                </form>
            )}
            {ctx.currentPage === "code" && (
                <form className="auth-code">
                    <h3>Авторизация</h3>
                    {seconds > 0 && (
                        <p className="descr">В течение {seconds} секунд код придет на Ваш мобильный номер</p>
                    )}
                    <div className="nums-wrapper">
                        <input
                            type="number"
                            maxLength={1}
                            autoFocus
                            inputmode="decimal"
                            value={code_1}
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_1(e.currentTarget.value)}></input>
                        <input
                            type="number"
                            inputmode="decimal"
                            maxLength={1}
                            value={code_2}
                            onInput={(e) => nextInput(e.target)}
                            onChange={(e) => setCode_2(e.currentTarget.value)}></input>
                        <input
                            type="number"
                            inputmode="decimal"
                            maxLength={1}
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
                    <button className="login__btn" onClick={onLogin} type="submit">
                        Вход
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;

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
