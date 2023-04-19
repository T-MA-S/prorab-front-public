import { useState } from "react";

import ListDialogs from "./ListDialogs";
import Dialog from "./Dialog";
import Loader from "../../../components/loader/Loader";
import { useEffect } from "react";
import s from "./style.module.scss";

import getHost from "../../../store/host-store";
import { token } from "../../../App";
//МОБИЛЬНОЦ ВЕРСИИ НЕТ ВООБЩЕ
const MobileSupport = ({ dialogId, setDialogId, userData, setUserData }) => {
    const [page, setPage] = useState("list");
    const [dialogs, setDialogs] = useState([]);

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
    }, []);

    if (page === "list") {
        if (dialogs.length > 0) {
            return <ListDialogs setPage={setPage} dialogs={dialogs} />;
        } else {
            <div className={s.dialogs__list}>
                <Loader />
            </div>;
        }
    }

    if (page === "dialog") {
        return <Dialog setPage={setPage} />;
    }
};

export default MobileSupport;
