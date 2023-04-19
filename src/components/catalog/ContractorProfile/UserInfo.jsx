import avatar from "../../../assets/images/stubs/avatar.svg";
import { frontLink, url } from "../../../store/host-store";
import { RatingIcon } from "../../icons/RatingIcon";
import style from "./style.module.sass";

const UserInfo = ({ data }) => {
    const onShare = (id, name) => {
        const data = {
            url: `${frontLink}/contractor/${id}`,
            title: "Прораб",
            text: `Посмотри профиль "${name}" на Прораб`,
        };
        navigator.share(data);
    };

    return (
        <div className={style.user}>
            <div className={style.user__bg}></div>
            <div className="container">
                <div className={style.user__wrapper}>
                    <div className={style.user__card}>
                        <div className={style.user__img_wrapper}>
                            {data.avatar === null ? <img src={avatar}></img> : <img src={url + data.avatar}></img>}
                        </div>
                        <div>
                            <div className={style.user__card_top}>
                                <p className={style.name}>{data.name}</p>
                                <div className={style.rating}>
                                    <RatingIcon />
                                    <span>{data.mark}</span>
                                </div>
                            </div>
                            <span>Личность подтверждена</span>
                        </div>
                    </div>
                    <button onClick={() => onShare(data.id, data.name)} className={style.user__share}>
                        Поделиться профилем
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
