import { useContext } from "react";

import ModalsContext from "../../../store/modals-context";
import AuthContext from "../../../store/auth-context";
import s from "./style.module.scss";

const ModalDeleteProfile = () => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);
    return (
        <div className={`modal ${s.modal__delete}`}>
            <h3 className="title">Вы точно хотите удалить свой профиль?</h3>
            <div className={s.modal__delete_btns}>
                <button className="admin__btn-transparent" onClick={modal.closeModal}>
                    Оставить
                </button>
                <button className="admin__btn-blue" onClick={ctx.onDeleteProfile}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default ModalDeleteProfile;
