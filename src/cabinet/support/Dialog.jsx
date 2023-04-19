import { NonViewedIcon } from "../../components/icons/NotViewedIcon";
import { ViewedIcon } from "../../components/icons/ViewedIcon";
import { url } from "../../store/host-store";
import style from "./style.module.sass";
import moment from "moment";

const Dialog = ({ data }) => {
    const keys = Object.keys(data);

    return keys.map((key) => {
        return (
            <div key={key.id}>
                <p className={style.message__date} key={key}>
                    {key}
                </p>
                {data[key].map((message) => {
                    if (isCurrentUserMessage(message)) {
                        return (
                            <div className={`${style.from_user} ${style.message}`} key={message.id}>
                                {getImages(message).map((img) => (
                                    <img key={img.id} alt={img.id} src={url + img.file}></img>
                                ))}
                                <p className={style.message__text}>{message.text}</p>
                                <div className={style.message__bottom}>
                                    <span>Ваше сообщение</span>
                                    <div>
                                        <span className={style.date}>{moment(message.created).format("HH:mm")}</span>
                                        {message.viewed ? <ViewedIcon /> : <NonViewedIcon />}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className={`${style.from_support} ${style.message}`} key={message.id}>
                                {getImages(message).map((img) => (
                                    <img key={img.id} alt={img.id} src={url + img.file}></img>
                                ))}
                                <p className={style.message__text}>{message.text}</p>
                                <div className={style.message__bottom}>
                                    <span>Служба поддержки</span>
                                    <div>
                                        <span className={style.date}>{moment(message.created).format("HH:mm")}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    });
};

function isCurrentUserMessage(message) {
    return message.to_user_id === null;
}
function getImages(message) {
    return message?.files || [];
}

export default Dialog;
