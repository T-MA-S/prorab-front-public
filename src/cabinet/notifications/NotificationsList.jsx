import style from "./style.module.sass";
import moment from "moment";

const NotificationsList = ({ data }) => {
    return (
        <>
            {data.length > 0 ? (
                data.map((el) => {
                    if (el.type === 0) {
                        return (
                            <div key={el.id} className={`${style.item} ${style.disapprouve}`}>
                                <div className={style.title}>
                                    <h5>Внимание!</h5>
                                    <p className={style.date}>{moment(el.created).format("DD.MM.YYYY")}</p>
                                </div>
                                <p className={style.text}>
                                    Ваше объявление IMER не соотвествует правилам сервиса, исправте объявление
                                </p>
                            </div>
                        );
                    } else if (el.type === 1) {
                        return (
                            <div key={el.id} className={style.item}>
                                <div className={style.title}>
                                    <h5>Заказчик оставил Вам заявку &#128188;</h5>
                                    <p className={style.date}>{moment(el.created).format("DD.MM.YYYY")}</p>
                                </div>
                                <p className={style.text}>Перейдите в заявки для более подробного изучения заказа</p>
                            </div>
                        );
                    } else if (el.type === 2) {
                        return (
                            <div key={el.id} className={style.item}>
                                <div className={style.title}>
                                    <h5>Исполнитель откликнулся на заявку &#128119;</h5>
                                    <p className={style.date}>{moment(el.created).format("DD.MM.YYYY")}</p>
                                </div>
                                <p className={style.text}>
                                    Вы можете связаться с исполнителем для обсуждения заказа любым удобным Вам способом
                                </p>
                            </div>
                        );
                    } else if (el.type === 3) {
                        return (
                            <div key={el.id} className={style.item}>
                                <div className={style.title}>
                                    <h5>Новое сообщение</h5>
                                    <p className={style.date}>{moment(el.created).format("DD.MM.YYYY")}</p>
                                </div>
                                <p className={style.text}>Вам пришло новое сообщение от техподдержки</p>
                            </div>
                        );
                    } else if (el.type === 4) {
                        return (
                            <div key={el.id} className={`${style.item} ${style.approuve}`}>
                                <div className={style.title}>
                                    <h5>Поздравляем!</h5>
                                    <p className={style.date}>{moment(el.created).format("DD.MM.YYYY")}</p>
                                </div>
                                <p className={style.text}>
                                    Ваше объявление прошло модерацию и отображается в каталоге сервиса Прораб!
                                </p>
                            </div>
                        );
                    }
                })
            ) : (
                <div>Нет новых уведомлений</div>
            )}
        </>
    );
};

export default NotificationsList;
