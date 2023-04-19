import avatar from "../../assets/images/stubs/avatar.svg";
import { StarIcon } from "../../components/icons/StarIcon";
import { url } from "../../store/host-store";
import s from "./style.module.sass";
import moment from "moment";

const FeedbackCard = ({ data }) => {
    return (
        <div className={s.feedback__card}>
            <div className={s.user}>
                {data.userFrom.avatar === null ? (
                    <img src={avatar} alt="avatar" />
                ) : (
                    <img src={url + data.userFrom.avatar} alt="avatar" />
                )}
                <div>
                    <p className={s.name}>{data.userFrom.name}</p>
                    <p className={s.date}>{moment(data.date).format("DD/MM/YYYY").split("/").join(".")}</p>
                </div>
            </div>

            <div className={s.stars}>
                {[...Array(data.mark)].map((v, i) => (
                    <div key={i}>
                        <StarIcon />
                    </div>
                ))}
                {[...Array(5 - data.mark)].map((v, i) => (
                    <div key={i} className={s.stars__inactive}>
                        <StarIcon />
                    </div>
                ))}
            </div>

            <p className={s.text}>{data.comment}</p>
        </div>
    );
};

export default FeedbackCard;
