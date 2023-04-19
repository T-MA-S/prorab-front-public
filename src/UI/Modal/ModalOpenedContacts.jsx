import { useContext } from "react";
import whatsapp from "../../assets/images/whatsapp-icon.png";
import telegram from "../../assets/images/telegram-icon.png";
import modalLock from "../../assets/images/modalimg3.png";
import modalImg from "../../assets/images/modalimg2.png";
import viber from "../../assets/images/viber-icon.png";
import ModalsContext from "../../store/modals-context";
import vk from "../../assets/images/vk-icon.png";
import "./Modal.sass";

const ModalOpenedContacts = (props) => {
    const ctx = useContext(ModalsContext);

    return (
        <div className="modal">
            <h3 className="title">Контакты</h3>
            <img src={modalImg} alt="" className="img2" />
            <p className="phone">Телефон: {props.userData.phone}</p>

            <button className="modal__btn2" onClick={ctx.closeModal}>
                Закрыть
            </button>
        </div>
    );
};

export default ModalOpenedContacts;
