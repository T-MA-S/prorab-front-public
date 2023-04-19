import { NavLink } from "react-router-dom";
import { useContext } from "react";

import modalLock from "../../assets/images/modalimg3.png";
import ModalsContext from "../../store/modals-context";
import "./Modal.sass";

const ModalUnauth = () => {
    const ctx = useContext(ModalsContext);

    return (
        <div className="modal modal2">
            <h3 className="title">Для данного доступа необходимо войти или зарегистрироваться</h3>
            <NavLink className="modal__btn" to="/login" onClick={ctx.closeModal}>
                Вход / регистрация
            </NavLink>
            <img src={modalLock} alt="" className="img2" />
        </div>
    );
};

export default ModalUnauth;
