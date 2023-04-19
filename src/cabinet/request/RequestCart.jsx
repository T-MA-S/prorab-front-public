import { NavLink } from "react-router-dom";
import moment from "moment";

import RequestRatingStarSvg from "./svg/RequestRatingStarSvg";
import avatar from "../../assets/images/stubs/avatar.svg";
import RequestCalendarSvg from "./svg/RequestCalendarSvg";
import RequestAddressSvg from "./svg/RequestAddressSvg";
import RequestRubleSvg from "./svg/RequestRubleSvg";
import RequestTimeSvg from "./svg/RequestTimeSvg";
import { url } from "../../store/host-store";

const RequestCart = ({ item, dropRequest, responseCart }) => {
    return (
        <div className="block">
            <div className="top">
                <div className="img">
                    {item.user.avatar === null ? (
                        <img className="request_avatar" src={avatar} alt="" />
                    ) : (
                        <img className="request_avatar" src={url + item.user.avatar} alt="" />
                    )}
                </div>
                <div>
                    <p className="name">{item.user.name}</p>
                    <div className="date">
                        <div className="request_id_number">ID 5658264</div>
                        {item.user.mark === null ? (
                            <div className="grade">
                                <span className="grade_text">Нет рейтинга</span>
                                <RequestRatingStarSvg />
                                <span className="grade_mark">{item?.user?.mark}</span>
                            </div>
                        ) : (
                            <div className="grade">
                                <span className="grade_text">Рейтинг</span>
                                <RequestRatingStarSvg />
                                <span className="grade_mark">{item?.user?.mark}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="request_top_right">
                    <div className="request_number_order">№525454</div>
                    <div className="request_time_order">{moment(item.created).format("DD.MM.YYYY")}</div>
                    <div className="request_time_order_hours">{moment(item.created).format("HH:mm")}</div>
                </div>
            </div>

            <div className="bottom">
                <div className="request_total">
                    <div className="request_total_block">
                        <div className="request_total_title">
                            <RequestCalendarSvg />
                            Дата работы
                        </div>
                        {item.bookings.map((item) => (
                            <div key={item.date_from} className="request__info">
                                {moment(item.date_from).format("DD.MM.YYYY")} -
                                {moment(item.date_from).add(item.duration, "days").format("DD.MM.YYYY")}
                            </div>
                        ))}
                    </div>

                    <div className="request_total_block">
                        <div className="request_total_title">
                            <RequestTimeSvg />
                            Время
                        </div>
                        <div className="request__info">
                            {item.time_from} - {item.time_to}
                        </div>
                    </div>

                    <div className="request_total_block">
                        <div className="request_total_title request_total_title_price">
                            <RequestRubleSvg />
                            Оплата
                        </div>
                        <div className="request__info request__info_price">
                            {item.payment_from} - {item.payment_to} ₽
                        </div>
                    </div>
                </div>

                {item.about.length > 0 && (
                    <div className="request_comment">
                        <p>{item.about}</p>
                    </div>
                )}

                {item.address && (
                    <div className="address_request_cart">
                        <RequestAddressSvg />
                        {item.address}
                    </div>
                )}

                <div className="timing">
                    <button
                        className="btn"
                        onClick={() => {
                            responseCart(item.id);
                        }}>
                        {/* onClick={() => {
                        responseCart(item.id);
                    }}> */}
                        Откликнуться
                        <span>120 ₽</span>
                    </button>

                    <div className="request_refuse__btn" onClick={() => dropRequest(item.id)}>
                        Отказаться
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCart;
