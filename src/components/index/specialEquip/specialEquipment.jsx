import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./../sliders.sass";
import { token } from "../../../App";
import s from "../style.module.scss";
import getHost, { url } from "../../../store/host-store";

function SpecialEquipment() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);

    const settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
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
                    type: 0,
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
                (result) => {
                    if (result.status === 401) {
                        localStorage.removeItem("token");
                        window.location.replace("/");
                    }
                    setCategory(result.data);
                },
                (error) => {
                    setError(error);
                }
            );
    }, []);
    if (error) {
        return <div className="error__react_module">Произошла ошибка загрузка модуля, перезагрузите страницу</div>;
    } else {
        return (
            <section className={`main-product ${s.equipment}`}>
                <div className="container">
                    <h2>Спецтехника</h2>
                    {category.length > 0 && (
                        <Slider {...settings} className="product__slider">
                            {category.map((item) => (
                                <NavLink
                                    to={{ pathname: "/catalog/spetsialnaya-tehnika" }}
                                    state={{ from: item.id, title: item.title, item }}
                                    className="product__wrap"
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

export default SpecialEquipment;
