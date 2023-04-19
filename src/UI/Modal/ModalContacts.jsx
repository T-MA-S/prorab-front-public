import { useContext, useEffect, useState } from "react";

import modalLock from "../../assets/images/modalimg3.png";
import ModalOpenedContacts from "./ModalOpenedContacts";
import AuthContext from "../../store/auth-context";
import ModalNonConfirm from "./ModalNonConfirm";
import getHost from "../../store/host-store";
import ModalUnauth from "./ModalUnauth";
import { token } from "../../App";
import "./Modal.sass";

const ModalContacts = (props) => {
    const ctx = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [arrayContacts, setArrayContacts] = useState([]);
    let idOrder = null;

    const openContacts = (event) => {
        let data = {
            user_request_id: ctx.isUserId,
            user_response_id: props.userData.id,
        };

        fetch(
            getHost({
                controller: "contact-payment",
            }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                idOrder = result.data.id;
                console.log(result);
                if (result.success) {
                    let widget = new window.cp.CloudPayments();
                    widget.pay(
                        "auth",
                        {
                            publicId: "pk_61bbbbd0ab78b66836bd8e3d87b89",
                            description: "Оплата контактной информации пользователя на foreman-go.ru",
                            amount: 60,
                            currency: "RUB",
                            invoiceId: "contact_" + idOrder,
                        },
                        {
                            onSuccess: function (options) {
                                fetch(
                                    getHost({
                                        controller: "contact-payment",
                                        action: "pay",
                                        id: idOrder,
                                    }),
                                    {
                                        method: "PUT",
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                            Authorization: token,
                                        },
                                    }
                                )
                                    .then((res) => res.json())
                                    .then((res) => {
                                        ctx.setRerender((prev) => !prev);
                                        console.log(res.data);
                                        console.log(idOrder);
                                    });
                                console.log("onSuccess");
                            },
                            onFail: function (reason, options) {
                                console.log("onFail");
                            },
                            onComplete: function (paymentResult, options) {
                                ctx.setRerender((prev) => !prev);
                                console.log("onComplete");
                            },
                        }
                    );
                }
            });
    };

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
                action: "contact",
                id: props.userData.id,
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setIsSuccess(true);
                    setArrayContacts(result.data);
                    console.log(result.data);
                } else {
                    setIsSuccess(false);
                    setArrayContacts(result.data);
                    console.log(result.data);
                }
            });
    }, [isSuccess, ctx.rerender]);

    return (
        <>
            {ctx.userData?.id ? (
                ctx.userData.mail_confirmed === null || ctx.userData.mail_confirmed === 0 ? (
                    <ModalNonConfirm />
                ) : (
                    <>
                        {!isSuccess ? (
                            <div className="modal modal2">
                                {arrayContacts.message && (
                                    <>
                                        <h3 className="title">Контакты</h3>
                                        <p className="text">{arrayContacts.message}</p>
                                        <button className="modal__btn2" onClick={openContacts}>
                                            Открыть контакты
                                        </button>

                                        <img src={modalLock} alt="" className="img2" />
                                    </>
                                )}
                            </div>
                        ) : (
                            <ModalOpenedContacts userData={arrayContacts} />
                        )}
                    </>
                )
            ) : (
                <ModalUnauth />
            )}
        </>
    );
};

export default ModalContacts;
