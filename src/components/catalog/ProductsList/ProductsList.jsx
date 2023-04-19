import { useContext } from "react";

import getHost, { frontLink } from "../../../store/host-store";
import ObjectCard from "../../../UI/ObjectCard/ObjectCard";
import AuthContext from "../../../store/auth-context";
import s from "./style.module.sass";
import { token } from "../../../App";

const ProductsList = (props) => {
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
                    ctx.setRerender((prev) => !prev);
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
                    ctx.setRerender((prev) => !prev);
                }
            })
            .catch((e) => console.log(e));
    };

    const activeLike = (e) => {
        e.currentTarget.classList.toggle(s.active);
    };

    // useEffect(() => {
    //     fetch(
    //         getHost({
    //             controller: "object",
    //         }),
    //         {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 Authorization: token,
    //             },
    //         }
    //     )
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log(result);
    //         });
    // }, []);

    const onShare = (id, name) => {
        const data = {
            url: `${frontLink}/cart/${id}`,
            title: "Прораб",
            text: `Посмотри объявление "${name}" на Прораб`,
        };
        navigator.share(data);
    };

    return (
        <div className={s.catalog_wrapper}>
            {props.categoryProd.map((item) => (
                <ObjectCard
                    key={item.id}
                    id={item.id}
                    mark={item.user.mark}
                    name={item.name}
                    about={item.about}
                    image={item.image}
                    status_busy={item.status_busy}
                    price_1={item.price_1}
                    price_1_name={item.price_1_name}
                    price_2={item.price_2}
                    price_2_name={item.price_2_name}
                    toggleFav={item.userFavourite !== undefined && item.userFavourite.length > 0 ? removeFav : addFav}
                    isFavorite={item.userFavourite !== undefined && item.userFavourite.length > 0}
                    favId={
                        item.userFavourite !== undefined && item.userFavourite.length > 0
                            ? item.userFavourite[0].id
                            : ""
                    }
                />
            ))}
        </div>
    );
};

export default ProductsList;
