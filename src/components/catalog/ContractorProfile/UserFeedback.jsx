import { useState } from "react";
import FeedbackCard from "../../../UI/FeedbackCard/FeedbackCard";
import style from "./style.module.sass";

const UserFeedback = ({ data }) => {
    const [isShowCards, setIsShowCards] = useState(8);

    const showMore = () => {
        setIsShowCards(data.length);
    };

    if (data.length > 4) {
        return (
            <div className={`${style.feedback} ${isShowCards < 9 && style.showmore}`}>
                <h3 className={style.title}>Отзывы</h3>

                <div className={`${style.feedback__list} ${isShowCards < 9 && style.showmore}`}>
                    {data.slice(0, isShowCards).map((feedback) => {
                        return <FeedbackCard key={feedback.id} data={feedback} />;
                    })}
                    {isShowCards < 2 && <button onClick={showMore}>Смотреть все отзывы</button>}
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${style.feedback}`}>
                <h3 className={style.title}>Отзывы</h3>

                <div className={`${style.feedback__list}`}>
                    {data.slice(0, isShowCards).map((feedback) => {
                        return <FeedbackCard key={feedback.id} data={feedback} />;
                    })}
                </div>
            </div>
        );
    }
};

export default UserFeedback;
