import { useState } from "react";

import getHost from "../../../store/host-store";
import "../login.sass";

const AdminLogin = () => {
    const [login, setlogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();

        const data = {
            login,
            password,
        };

        fetch(
            getHost({
                controller: "user",
                action: "login",
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
                    setError(true);
                }
            });
    };

    return (
        <section className="login">
            <div className="login__banner"></div>
            <div className="login__block">
                <div className="links">
                    <p className="admin-link">Вход в админ-панель</p>
                </div>
                <form className="input login__entrance" onSubmit={onLogin}>
                    <input
                        value={login}
                        placeholder="Почта"
                        required
                        name="email"
                        onChange={(e) => setlogin(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Пароль"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={`admin-error ${error && "visible"}`}>Неправильный логин или пароль</span>
                    <button className="login__btn" type="submit">
                        Вход
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;
