import { useContext, useEffect, useState } from "react";

import NotificationsList from "./NotificationsList";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";
import { token } from "../../App";
import Loader from "../../components/loader/Loader";
import style from "./style.module.sass";

const Notifications = () => {
    const ctx = useContext(AuthContext);
    const [id, setId] = useState(-1);
    const [activePage, setActivePage] = useState("List");
    const [notificationsData, setNotificationsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        ctx.setNotificationsCount(0);
    }, []);

    useEffect(() => {
        fetch(
            getHost({
                controller: "notification",
                filter: {
                    user_id: ctx.isUserId,
                    new: 1,
                },
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
                if (result.success) {
                    setLoading(false);
                    setNotificationsData(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, [ctx.isUserId]);

    return (
        <div className="cabinet__redesign_container">
            <h3 className="cabinet__redesign_title">Уведомления</h3>
            <div className={style.notifications_list}>
                {loading ? (
                    <Loader />
                ) : (
                    <NotificationsList
                        data={notificationsData}
                        setActivePage={setActivePage}
                        setId={setId}
                        id={id}
                        activePage={activePage}
                    />
                )}
            </div>
        </div>
    );
};

export default Notifications;
