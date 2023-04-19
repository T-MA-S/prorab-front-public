import { useEffect, useState } from "react";

import s from "../../components/catalog/ProductsList/style.module.sass";
import ObjectCard from "../../UI/ObjectCard/ObjectCard";
import getHost from "../../store/host-store";
import { token } from "../../App";

const FavoritesList = ({ data, setRerender }) => {
    const [objectsData, setObjectsData] = useState([]);

    const removeFavorite = (id) => {
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
                console.log(result);
                if (result.success) {
                    setRerender((prev) => !prev);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        setObjectsData(data); //чтобы можно было обращаться к вложенному свойству, которое сначала undefined
    }, [data]);

    return (
        <div className={s.catalog_wrapper}>
            {objectsData.map((item) => {
                return (
                    <ObjectCard
                        key={item.id}
                        id={item.object.id}
                        mark={item.object.user.mark}
                        name={item.object.name}
                        about={item.object.about}
                        image={item.object.image}
                        status_busy={item.object.status_busy}
                        price_1={item.object.price_1}
                        price_1_name={item.object.price_1_name}
                        price_2={item.object.price_2}
                        price_2_name={item.object.price_2_name}
                        toggleFav={removeFavorite}
                        isFavorite={item.object.userFavourite.length > 0}
                        favId={item.id}
                    />
                );
            })}
        </div>
    );
};

export default FavoritesList;
