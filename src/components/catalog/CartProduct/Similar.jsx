import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import ObjectCard from "../../../UI/ObjectCard/ObjectCard";
import "../../../styles/sliders.sass";
import "./CartProduct.sass";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { token } from "../../../App";
import getHost from "../../../store/host-store";

const Similar = (props) => {
    const ctx = useContext(AuthContext);

    const settings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
                console.log(result);
                if (result.success) {
                    ctx.setRerender((prev) => !prev);
                }
            })
            .catch((e) => console.log(e));
    };

    const lengthSimilar = props.similar.filter((item) => item.id !== props.isSimilar).length;

    return (
        <>
            {lengthSimilar > 0 && (
                <section className="technique">
                    <div className="container">
                        <h2 className="title_h2">Похожая техника</h2>
                        <Slider {...settings}>
                            {props.similar
                                .filter((item) => item.id !== props.isSimilar)
                                .map((item) => (
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
                                ))}
                        </Slider>
                    </div>
                </section>
            )}
        </>
    );
};

export default Similar;
