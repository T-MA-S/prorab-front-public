import { useContext, useState } from "react";

import bg from "../../assets/images/mailConfirm/modal-bg.svg";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import s from "./style.module.sass";
import { token } from "../../App";
import Loader from "../../components/loader/Loader";

const ModalNonConfirm = () => {
    const ctx = useContext(AuthContext);
    const [sendMessage, setSendMessage] = useState(false);
    const [loading, setLoading] = useState(false); // чтобы не было возможности нажать 100500 раз подтвердить почту
    const getPost = () => {
        setLoading(true);
        fetch(
            getHost({
                controller: "user",
                action: "send-mail-confirm-code",
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
            .then((result) => {
                console.log(result);
                setLoading(false);
                if (result.success) {
                    setSendMessage(true);
                } else {
                    alert("Что-то пошло не так, попробуйте позже");
                }
            });
    };

    return (
        <div className={s.modal__nonconfirm}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h3 className={s.title}>Подтвердите свой e-mail</h3>
                    <img src={bg} alt="letter"></img>
                    <p className={s.descr}>
                        На вашу электронную почту<span className={s.special}>&nbsp;{ctx.userData.email}&nbsp;</span>
                        отправлено письмо. В письме есть кнопка
                        <span className={s.special}>&nbsp;Подтвердить e-mail&nbsp;</span>, при нажатии на которую Вы
                        вернетесь на сайт и сможете полноценно пользоваться сервисом Прораб.
                    </p>
                    <p className={s.note}>
                        Если вы не получили письмо, проверьте папку Спам или запросите повторно письмо.
                    </p>

                    {sendMessage ? (
                        <button className={`${s.btn} ${s.disabled}`}>Проверьте почту</button>
                    ) : (
                        <button className={s.btn} onClick={getPost}>
                            Подтвердить почту
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ModalNonConfirm;
