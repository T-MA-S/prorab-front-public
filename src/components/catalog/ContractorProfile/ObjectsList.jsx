import { useContext } from "react";

import PaginationUtil from "../../../cabinet/favorites/PaginationUtil";
import ObjectCard from "../../../UI/ObjectCard/ObjectCard";
import DeviceContext from "../../../store/device-context";
import AuthContext from "../../../store/auth-context";
import getHost from "../../../store/host-store";
import style from "./style.module.sass";
import { token } from "../../../App";

const ObjectsList = ({ data, pageCount, setPage, userMark, setRerender }) => {
    const device = useContext(DeviceContext);
    const ctx = useContext(AuthContext);

    const addFav = (id) => {
        let data = {
            object_id: id,
            user_id: ctx.isUserId,
        };

        fetch(
            getHost({
                controller: "favourites",
            }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setRerender((prev) => !prev);
                }
            });
    };

    const removeFav = (id) => {
        fetch(
            getHost({
                controller: "favourites",
                action: id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setRerender((prev) => !prev);
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className={style.objects__wrapper}>
            <h3 className={style.title}>Объявления исполнителя:</h3>
            <div className={style.objects__list}>
                {data.length > 0 ? (
                    data.map((item) => {
                        return (
                            <ObjectCard
                                key={item.id}
                                id={item.id}
                                mark={userMark}
                                name={item.name}
                                about={item.about}
                                image={item.image}
                                status_busy={item.status_busy}
                                price_1={item.price_1}
                                price_1_name={item.price_1_name}
                                price_2={item.price_2}
                                price_2_name={item.price_2_name}
                                toggleFav={
                                    item.userFavourite !== undefined && item.userFavourite.length > 0
                                        ? removeFav
                                        : addFav
                                }
                                isFavorite={item.userFavourite !== undefined && item.userFavourite.length > 0}
                                favId={
                                    item.userFavourite !== undefined && item.userFavourite.length > 0
                                        ? item.userFavourite[0].id
                                        : ""
                                }
                            />
                        );
                    })
                ) : (
                    <p>Нет объявлений</p>
                )}
            </div>
            {data.length > 0 && device.isMobile && <PaginationUtil count={pageCount} setPage={setPage} />}
        </div>
    );
};

export default ObjectsList;
