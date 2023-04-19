import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import avatar from "../../../assets/images/stubs/avatar.svg";
import s from "../object/components/style.module.sass";
import { link, url } from "../../../store/host-store";
import OnChangeBtn from "../../buttons/OnChangeBtn";
import CorrectBtn from "../../buttons/CorrectBtn";
import style from "./style.module.sass";
import { token } from "../../../App";

const AccountAvatar = () => {
    const ctx = useContext(ModeratorContext);
    let isActive = ctx.isCorrectAccount.avatar;

    const toggle = () => {
        console.log("функционал удаления фотографии");

        fetch(`${link}/user/delete-avatar?id=${ctx.currentObj.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    ctx.setRerender((prev) => !prev);
                }
            });
    };

    return (
        <div className={`${s.card} ${isActive && s.active} ${style.account_card}`}>
            <img src={ctx.currentObj.avatar === null ? avatar : url + ctx.currentObj.avatar} alt="avatar"></img>
            <div className={style.btns}>
                <CorrectBtn isActive={isActive} correctClick={() => ctx.correctClick("avatar")} />
                <OnChangeBtn title={"Удалить фотографию"} toggle={toggle} />
            </div>
        </div>
    );
};

export default AccountAvatar;
