import { useContext, useState } from "react";

import ModalsContext from "../../store/modals-context";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import s from "./style.module.sass";
import { token } from "../../App";

const NewCategory = () => {
    const [input, setInput] = useState("");
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);

    const createCategory = (e) => {
        e.preventDefault();
        const data = {
            active: 1,
            title: input,
        };

        fetch(
            getHost({
                controller: "blog-section",
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    modal.closeModal();
                    ctx.setRerender((prev) => !prev);
                }
            });
    };

    return (
        <form className={s.modal} onSubmit={createCategory}>
            <h3>Добавить новую категорию</h3>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="admin__btn-blue">Создать</button>
        </form>
    );
};

export default NewCategory;
