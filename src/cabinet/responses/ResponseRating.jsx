import { useContext, useState } from "react";

import { CorrectIcon } from "../../components/icons/CorrectIcon";
import ModalsContext from "../../store/modals-context";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import style from "./style.module.sass";
import { token } from "../../App";

const ResponseRating = () => {
    const ctx = useContext(AuthContext);
    const modal = useContext(ModalsContext);
    const [rating, setRating] = useState(null);
    const [userId, setUserId] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState('');

    const ratingHandle = (event) => {
        setRating(event.target.getAttribute("dataindex"));
        setUserId(modal.feedbackId);
    };

    const fetchRating = () => {
        const data = {
            user_from_id: ctx.isUserId,
            user_to_id: userId,
            mark: +rating,
            comment: textAreaValue
        };
        console.log(data);

        fetch(
            getHost({
                controller: "mark",
                action: "create-user-mark",
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
                console.log(result);
                if (result.success) {
                    modal.closeModal();
                    console.log(data);
                }else{
                    alert('Заполните все поля')
                }
            }).catch(error => console.log(error));
    };

    const textValueChange = e => {
        setTextAreaValue(e.target.value);
    }

    return (
        <>
            <div className={style.feedback}>
                <div className={style.feedback__title}>Оставить отзыв</div>
                {/*<div className="response_error" style={{'color': 'red'}}>*/}
                {/*    {ratingMessage}*/}
                {/*</div>*/}
                <span className={style.feedback__subtitle}>Оценка:</span>
                <div className="rating">
                    <input type="radio" name="rating" id="rating-5" />
                    <label onClick={ratingHandle} dataindex={5} htmlFor="rating-5"></label>
                    <input type="radio" name="rating" id="rating-4" />
                    <label onClick={ratingHandle} dataindex={4} htmlFor="rating-4"></label>
                    <input type="radio" name="rating" id="rating-3" />
                    <label onClick={ratingHandle} dataindex={3} htmlFor="rating-3"></label>
                    <input type="radio" name="rating" id="rating-2" />
                    <label onClick={ratingHandle} dataindex={2} htmlFor="rating-2"></label>
                    <input type="radio" name="rating" id="rating-1" />
                    <label onClick={ratingHandle} dataindex={1} htmlFor="rating-1"></label>
                </div>
                <span className={style.feedback__subtitle}>Отзыв:</span>

                <textarea placeholder="Введите текст" onChange={textValueChange}></textarea>
                <button className={style.feedback__submit} value={textAreaValue} onClick={fetchRating}>
                    <p>Отправить</p>
                    <span>
                        <CorrectIcon />
                    </span>
                </button>
            </div>
        </>
    );
};

export default ResponseRating;
