import { useContext } from "react";

import ModalsContext from "../../store/modals-context";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import s from "./style.module.sass";
import { token } from "../../App";

const DeleteCategory = () => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);

    const onDelete = (e) => {
        e.preventDefault();

        fetch(
            getHost({
                controller: "blog-section",
                action: modal.delBlogCategory.id,
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
                method: "DELETE",
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
        <form className={s.modal} onSubmit={onDelete}>
            <h3>Вы уверены?</h3>
            <p>Удалить категорию "{modal.delBlogCategory.title}"?</p>
            <button className="admin__btn-blue">Удалить</button>
        </form>
    );
};

export default DeleteCategory;
