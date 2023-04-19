import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { token } from "../../../App";
import s from "../style.module.scss";
import "./../sliders.sass";
import getHost, { url } from "../../../store/host-store";

function Realty() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);

    const settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        gap: 10,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                },
            },
        ],
    };

    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
                filter: {
                    depth: 1,
                    type: 2,
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
            .then(
                (result) => setCategory(result.data),
                (error) => {
                    setError(error);
                }
            );
    }, []);
    if (error) {
        return <div className="error__react_module">Произошла ошибка загрузка модуля, перезагрузите страницу</div>;
    } else {
        return (
            <section className={`main-product ${s.realty}`}>
                <div className="container">
                    <h2 className="title_h2">Недвижимость</h2>
                    {category.length > 0 && (
                        <Slider {...settings} className="product__slider">
                            {category.map((item) => (
                                <NavLink
                                    className={`${s.card} product__wrap`}
                                    to={{ pathname: "/catalog/nedvizhimost" }}
                                    state={{ from: item.id, title: item.title, item }}
                                    key={item.id}>
                                    <div className="img">
                                        <img src={url + item.image} alt="" />
                                    </div>

                                    <p className="title">{item.title}</p>
                                </NavLink>
                            ))}
                        </Slider>
                    )}
                </div>
            </section>
        );
    }
}

export default Realty;
