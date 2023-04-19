import { useContext } from "react";

import ModalDeleteProfile from "./DeleteProfile/ModalDeleteProfile";
import VideoModal from "../../simplePages/UsersInfo/VideoModal";
import MainCategories from "./HeaderCategories/MainCategories";
import ModalsContext from "../../store/modals-context";
import s from "./HeaderCategories/style.module.sass";
import ModalNonConfirm from "./ModalNonConfirm";
import ModalIsOrdered from "./ModalIsOrdered";
import ModalFeedback from "./ModalFeedback";
import ModalContacts from "./ModalContacts";
import ModalRequest from "./ModalRequest";
import ModalUnauth from "./ModalUnauth";
import "./Modal.sass";
import ModalCalendar from "./ModalCalendar";

import NewCategory from "../../admin/modal/NewCategory";
import DeleteCategory from "../../admin/modal/DeleteCategory";
import { Transition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { calendarAction } from "../../store/redux";
import ModalPayment from "./ModalPayments/ModalPayment";

const Modal = ({ id, userData }) => {
    const ctx = useContext(ModalsContext);
    const dispatch = useDispatch();

    return (
        <>
            <Transition in={ctx.isModal} mountOnEnter unmountOnExit timeout={400}>
                {(state) => (
                    <div className={`modal__overlay ${ctx.isCategories ? "modal__categories" : ""} ${state}`}>
                        <span
                            className="modal__close"
                            onClick={async () => {
                                await dispatch(calendarAction.closeCalendar());
                                await ctx.closeModal();
                            }}></span>
                        {ctx.openModal === "ordered" && <ModalIsOrdered userData={userData} id={id} />}
                        {ctx.openModal === "contacts" && <ModalContacts userData={userData} />}
                        {ctx.openModal === "deleteProfile" && <ModalDeleteProfile />}
                        {ctx.openModal === "request" && <ModalRequest id={id} />}
                        {ctx.openModal === "unconfirm" && <ModalNonConfirm />}
                        {ctx.openModal === "feedback" && <ModalFeedback />}
                        {ctx.openModal === "youtube" && <VideoModal />}
                        {ctx.openModal === "unauth" && <ModalUnauth />}
                        {ctx.openModal === "calendar" && <ModalCalendar />}
                        {ctx.openModal === "blog-new-category" && <NewCategory />}
                        {ctx.openModal === "blog-delete-category" && <DeleteCategory />}
                        {ctx.openModal === "payment" && <ModalPayment />}
                        {ctx.isCategories && (
                            <div className={`container ${s.container}`}>
                                <MainCategories />
                            </div>
                        )}
                    </div>
                )}
            </Transition>
        </>
    );
};

export default Modal;
