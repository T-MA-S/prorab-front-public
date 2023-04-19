import ListDialogs from "./ListDialogs";
import s from "./style.module.scss";
import Dialog from "./Dialog";
import Loader from "../../../components/loader/Loader";
import { useEffect, useState } from "react";

import getHost from "../../../store/host-store";
import { token } from "../../../App";
const DesktopSupport = ({ dialogId, setDialogId, userData, setUserData }) => {
    const [dialogs, setDialogs] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
                action: "with-messages",
                pagination: 0,
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
                    setDialogs(result.data);
                }
            });
    }, [rerender]);

    if (dialogs.length > 0) {
        return (
            <div className={s.desktop_layout}>
                <ListDialogs setDialogId={setDialogId} setUserData={setUserData} dialogs={dialogs} />
                <Dialog id={dialogId} userData={userData} setRerender={setRerender} />
            </div>
        );
    } else {
        return (
            <div className={s.desktop_layout}>
                <Loader />
            </div>
        );
    }
};

export default DesktopSupport;
