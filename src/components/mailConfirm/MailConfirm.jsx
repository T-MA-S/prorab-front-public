import { useEffect, useState } from "react";

import getHost from "../../store/host-store";
import Loader from "../loader/Loader";
import s from "./style.module.sass";
import Confirm from "./Confirm";

const MailConfirm = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    //При подгрузке страницы получаем данные url и отправляем код подтверждения почты
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const data = {
            code,
        };

        fetch(
            getHost({
                controller: "user",
                action: "mail-confirm",
            }),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                //убираем лоадер
                setLoading(false);
                if (result.success) {
                    setSuccess(true);
                }
            });
    }, []);

    return (
        <section className={s.confirm}>
            <div className="container">{loading ? <Loader /> : success ? <Confirm /> : <div>404</div>}</div>
        </section>
    );
};

export default MailConfirm;
