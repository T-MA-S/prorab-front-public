import '../Modal.sass'
import ModalCloseSvg from "../ModalSvg/ModalCloseSvg";
import {useContext, useState} from "react";
import ModalsContext from "../../../store/modals-context";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import PaymentFromAcc from "./PaymentFromAcc";
import  {link} from "../../../store/host-store";
import {token} from "../../../App";
import PaymentBody from "./PaymentBody";

const ModalPayment = () => {
    const modal = useContext(ModalsContext)
    const [modalCheck, setModalCheck] = useState(1);

    window.pay = function () {
        let widget = new window.cp.CloudPayments();
        widget.pay(
            "auth",
            {
                publicId: "pk_61bbbbd0ab78b66836bd8e3d87b89",
                description: "Пополнение кошелька",
                amount: 120,
                currency: "RUB",
                invoiceId: 1,
            },
            {
                onSuccess: function (options) {
                    fetch(`${link}/user/replenish`,
                        {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                Authorization: token,
                            },
                        }
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                        });
                },
                onFail: function (reason, options) {
                    console.log("onFail");
                },
                onComplete: function (paymentResult, options) {
                    console.log("onComplete");
                },
            }
        );
    };

    const addToWallet = () => {
        window.pay();
    }


    return(
        <div className="modal modal_payment">
            <div className="closeModal" onClick={modal.closeModal}>
                <ModalCloseSvg/>
            </div>

            <SwitchTransition>
                <CSSTransition classNames="fade-payment" key={modalCheck} timeout={300}>
            {modalCheck === 1 ?
                <PaymentBody addToWallet={addToWallet}
                             setModalCheck={setModalCheck}
                />
               : modalCheck === 2 ?
                <div>
                    <PaymentFromAcc />
                </div>
                    :
                    <PaymentFromAcc />
            }
            </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default ModalPayment;