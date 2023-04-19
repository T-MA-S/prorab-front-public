import Slider from "react-slick";
import moment from "moment";

import { StarIcon } from "../../icons/StarIcon";
import s from "./style.module.sass";
import "./slider.sass";
import avatar from "../../../assets/images/stubs/avatar.svg";
import { url } from "../../../store/host-store";
const CartFeedback = (props) => {
    const lengthFeedback = props.feedback.length;

    const settings = {
        infinite: false,
        slidesToShow: 2.7,
        slidesToScroll: 1,
        arrows: lengthFeedback > 3,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            {lengthFeedback > 0 && (
                <section className={`${s.feedback} adv-feedback`}>
                    <div className="container">
                        <h2>Отзывы</h2>
                        <Slider {...settings} className={lengthFeedback > 3 ? "shadow" : ""}>
                            {props.feedback.map((item) => (
                                <div key={item.id} className={s.feedback__card}>
                                    <div className={s.user}>
                                        {item.userFrom.avatar === null ? (
                                            <img src={avatar} alt="avatar" />
                                        ) : (
                                            <img src={url + item.userFrom.avatar} alt="avatar" />
                                        )}
                                        <div>
                                            <p className={s.name}>{item.userFrom.name}</p>
                                            <p className={s.date}>
                                                {moment(item.date).format("DD/MM/YYYY").split("/").join(".")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={s.stars}>
                                        {[...Array(item.mark)].map((v, i) => (
                                            <div key={i} className={s.star_active}>
                                                <StarIcon />
                                            </div>
                                        ))}
                                        {[...Array(5 - item.mark)].map((v, i) => (
                                            <div key={i} className={s.star}>
                                                <StarIcon />
                                            </div>
                                        ))}
                                    </div>

                                    <p className={s.text}>{item.comment}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            )}
        </>
    );
};

export default CartFeedback;
