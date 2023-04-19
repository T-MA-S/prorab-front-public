import React, { useEffect, useState } from "react";

import ModalRegister from "../../UI/Modal/ModalRegister";
import Registration from "./Registration";
import Login from "./Login";
import "./login.sass";
import {useNavigate} from "react-router-dom";

const LoginMain = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [modal, setModal] = useState(false);

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    const tabClose = () => {
        setActiveTab("tab1");
        setModal(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="login">
            {modal && (
                <ModalRegister
                    title="Регистрация завершена"
                    onClick={tabClose}
                    className="modal_register"
                    titleBtn="Войти"
                    classNameTitle="modal_title"
                    classNameBtn="modal_btn"
                />
            )}

            <div className="login__banner"></div>
            <div className="login__block">
                <div className="links">
                    <div className={activeTab === "tab1" ? "active link" : "link"} onClick={handleTab1}>
                        Вход
                    </div>
                    <div className={activeTab === "tab2" ? "active link" : "link"} onClick={handleTab2}>
                        Регистрация
                    </div>
                </div>

                {activeTab === "tab1" ? <Login /> : <Registration />}
            </div>
        </section>
    );
};

export default LoginMain;
