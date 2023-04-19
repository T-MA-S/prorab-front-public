import { useContext } from "react";

import ModeratorContext from "../../../store/moderator-context";
import s from "../object/components/style.module.sass";
import OnChangeBtn from "../../buttons/OnChangeBtn";
import CorrectBtn from "../../buttons/CorrectBtn";
import { link } from "../../../store/host-store";
import { token } from "../../../App";

const AccountName = ({ data, isActive, correctClick }) => {
    const ctx = useContext(ModeratorContext);

    const onChangeName = () => {
        const newName = {
            name: "Пользователь",
        };

        fetch(`${link}/user/${data.id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(newName),
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
        <div className={`${s.card} ${isActive && s.active}`}>
            <h5>Имя пользователя</h5>
            <p>{data.name}</p>
            <div>
                <CorrectBtn isActive={isActive} correctClick={() => correctClick("name")} />
                <OnChangeBtn title={"Удалить имя"} toggle={onChangeName} />
            </div>
        </div>
    );
};

export default AccountName;
