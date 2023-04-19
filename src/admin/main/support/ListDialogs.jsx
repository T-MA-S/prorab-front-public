import s from "./style.module.scss";

const ListDialogs = ({ setDialogId, setUserData, dialogs }) => {
    const onDialogClick = (id, img, name) => {
        setDialogId(id);
        setUserData({
            img,
            name,
        });
    };

    return (
        <div className={s.dialogs__list}>
            <h3>Чат поддержки</h3>

            <div className={s.dialogs__list_wrapper}>
                {dialogs.map((el) => {
                    return (
                        <div
                            className={s.dialog_wrapper}
                            key={el.id}
                            onClick={() => onDialogClick(el.id, el.avatar, el.name)}>
                            <div className={s.top}>
                                <p className={s.name}>{el.name}</p>
                                <span>{el.lastMessage?.created}</span>
                            </div>
                            <p
                                className={`${s.text} ${
                                    el.lastMessage?.viewed === 0 && el.lastMessage?.to_user_id === null ? s.new : ""
                                }`}>
                                {el.lastMessage?.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListDialogs;
