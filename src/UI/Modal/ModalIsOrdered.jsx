import './style.module.sass';
import ModalCloseSvg from "./ModalSvg/ModalCloseSvg";
import ModalWorkerSvg from "./ModalSvg/ModalWorkerSvg";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import ModalsContext from "../../store/modals-context";

const ModalIsOrdered = (props) => {
    const ctx = useContext(ModalsContext);
    const navigate = useNavigate();

    const backPage = async () => {
        await ctx.closeModal();
        await navigate(-1);
    }

    console.log(props.id)
    return(
        <div className="modal modalOrdered">
            <div className="closeModal" onClick={() => ctx.closeModal()}>
                <ModalCloseSvg />
            </div>
            <div className="title">Спасибо!</div>
            <div className="modalOrdered_sub modalOrderText">Ваша заявка направлена исполнителю</div>
            <div className="modalOrderedImage">
                <ModalWorkerSvg />
            </div>
            <div className="modalOrderedWaitText modalOrderText">
                Ожидайте отклика исполнителя.
            </div>
            <div className="modalOrderedText modalOrderText">
                Вы можете продолжить поиск исполнителя в данной категории для более быстрого ответа на Ваш заказ.
            </div>
            <div onClick={backPage} className="modalOrderedBtn">Ещё исполнители</div>
        </div>
    )
}

export default ModalIsOrdered;