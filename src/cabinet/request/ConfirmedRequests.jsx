import { NavLink } from "react-router-dom";
import moment from "moment";

import RequestRatingStarSvg from "./svg/RequestRatingStarSvg";
import avatar from "../../assets/images/stubs/avatar.svg";
import RequestCalendarSvg from "./svg/RequestCalendarSvg";
import RequestAddressSvg from "./svg/RequestAddressSvg";
import RequestRubleSvg from "./svg/RequestRubleSvg";
import RequestTimeSvg from "./svg/RequestTimeSvg";
import { url } from "../../store/host-store";

const ConfirmedRequests = ({ item }) => {
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
                    <NavLink
                        to="/lc/responses"
                        state={{ orderId: item.id, objectId: item.object_id }}
                        className="timing_p__clicked">
                        Перейти
                        <span>
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5676 1.12057C17.268 0.819511 16.8913 0.606741 16.4787 0.505567C16.0662 0.404393 15.6339 0.418717 15.2289 0.54697L1.86403 4.74802C1.40846 4.89077 1.00796 5.17052 0.717076 5.54915C0.426195 5.92778 0.259078 6.38689 0.238489 6.86395C0.2179 7.34101 0.34484 7.81282 0.602018 8.21512C0.859196 8.61741 1.23411 8.93064 1.67569 9.11212L6.63854 11.1565L9.10223 8.69227C9.22231 8.58035 9.38113 8.51942 9.54524 8.52232C9.70935 8.52522 9.86592 8.59171 9.98198 8.70779C10.098 8.82388 10.1645 8.98048 10.1674 9.14462C10.1703 9.30876 10.1094 9.46762 9.9975 9.58773L7.53381 12.0519L9.57774 17.0158C9.75017 17.4422 10.0466 17.807 10.4286 18.063C10.8106 18.3191 11.2606 18.4545 11.7205 18.4519H11.8252C12.3029 18.4344 12.7632 18.2686 13.1423 17.9775C13.5215 17.6864 13.8006 17.2844 13.9409 16.8274L18.1411 3.45975C18.2695 3.05477 18.2839 2.62224 18.1828 2.20961C18.0816 1.79698 17.8688 1.42019 17.5676 1.12057Z"
                                    fill="#546EDB"
                                />
                            </svg>
                        </span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedRequests;
