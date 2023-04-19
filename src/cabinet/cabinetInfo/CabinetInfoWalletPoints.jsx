import "../cabinet.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {useContext} from "react";
import ModalsContext from "../../store/modals-context";

const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                // centerMode: true,
                // centerPadding: '8%',
                arrows: false,
                dots: true,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '20%',
                arrows: false,
                dots: true,
            },
        },
        {
            breakpoint: 410,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '15%',
                arrows: false,
                dots: true,
            },
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '10%',
                arrows: false,
                dots: true,
            },
        },
    ],
};

const CabinetInfoWalletPoints = () => {
    const modal = useContext(ModalsContext);



    return(
        <div className="cabinet__wallet_wrap">
            <Slider {...settings}>
            <div className="cabinet__wallet cabinet__right___block">
                <div className="cabinet_wallet_title">Кошелек</div>
                <div className="cabinet_wallet__summary">
                    <span className="cabinet_wallet__rubles">0 ₽</span>
                    <span className="wallet_def"> / </span>
                    <span className="cabinet_wallet__points">0 баллов</span>
                </div>
                <button className="cabinet_wallet_add" onClick={modal.paymentModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none">
                        <path fill="#546EDB" fillRule="evenodd" d="M.842 10.261c0-5.4 4.378-9.777 9.778-9.777s9.778 4.377 9.778 9.777c0 5.4-4.378 9.778-9.778 9.778S.842 15.661.842 10.261Zm10.756-3.91a.978.978 0 0 0-1.955 0v2.933H6.709a.978.978 0 0 0 0 1.955h2.934v2.933a.978.978 0 1 0 1.955 0V11.24h2.933a.978.978 0 0 0 0-1.955h-2.933V6.35Z" clipRule="evenodd"/>
                    </svg>
                    Пополнить
                </button>
            </div>

            <div className="cabinet__points cabinet__right___block">
                <div className="cabinet__points_title">Получать баллы</div>
                <input type="text" className="input_points" value=""/>
                <div className="points_promo">
                    <div className="promo_points_title">Промокод:</div>
                    <input type="text" className="input_points_2" value=""/>
                </div>
                <div className="points_sub__text">Получай баллы за каждого зарегистрировавшегося пользователя.
                    Просто поделись ссылкой или промокодом.</div>
            </div>
            </Slider>
        </div>
    )
}

export default CabinetInfoWalletPoints;