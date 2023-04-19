import Slider from "react-slick";

import noImage from "../../../../assets/images/stubs/object-mob.png";
import IncorrectBtn from "../../../buttons/IncorrectBtn";
import CorrectBtn from "../../../buttons/CorrectBtn";
import { url } from "../../../../store/host-store";
import s from "./style.module.sass";

const ImageAdv = ({ data, incorrectClick, correctClick, isActive }) => {
    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    };

    return (
        <div className={`${s.card} ${s.card__with_photo} ${isActive && s.active}`}>
            {data.images !== undefined && data.images.length > 0 ? (
                <Slider {...settings} className={`slick_List slick_List_moderator`}>
                    {data.images.map((img, i) => {
                        return (
                            <div key={i}>
                                <img src={url + img.filename} alt="object" />
                            </div>
                        );
                    })}
                </Slider>
            ) : (
                <img src={noImage} alt="object" />
            )}

            <div className={s.btns}>
                <CorrectBtn isActive={isActive} correctClick={() => correctClick("img")} />
                <IncorrectBtn incorrectClick={incorrectClick} />
            </div>
        </div>
    );
};

export default ImageAdv;
