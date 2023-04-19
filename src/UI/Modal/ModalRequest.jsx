import "./Modal.sass";
import { useContext, useEffect, useRef, useState } from "react";
import ModalClickSvg from "./ModalSvg/ModalClickSvg";
import ModalAddressSvg from "./ModalSvg/ModalAddressSvg";
import { ru } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import moment from "moment";
import AuthContext from "../../store/auth-context";
import { token } from "../../App";
import ModalUnauth from "./ModalUnauth";
import ModalNonConfirm from "./ModalNonConfirm";
import getHost from "../../store/host-store";
import ModalsContext from "../../store/modals-context";
import ModalCloseSvg from "./ModalSvg/ModalCloseSvg";
import RequestCalendarSvg from "./ModalSvg/RequestCalendarSvg";
import RequestRubleSvg from "./ModalSvg/RequestRubleSvg";
import RequestAddressSvg from "./ModalSvg/RequestAddressSvg";

let dayDuration = 0;
let res = false;

let bufferArr = [];
let booking = [];

const ModalRequest = ({ id }) => {
    const [isOrdered, setIsOrdered] = useState("");
    const ctx = useContext(AuthContext);
    const ctxModal = useContext(ModalsContext);

    const [isToggle, setIsToggle] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [focus, setFocus] = useState(START_DATE);
    const [isBusy, setIsBusy] = useState([]);

    const commentText = useRef();
    const timeFromInput = useRef();
    const timeToInput = useRef();
    const addressInput = useRef();
    const paymentToInput = useRef();
    const paymentFromInput = useRef();

    const handleFocusChange = (newFocus) => {
        setFocus(newFocus || START_DATE || END_DATE);
    };

    const handleToggle = () => {
        setIsToggle((prevState) => !isToggle);
    };

    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                action: id,
                expand: "scheduleIsBusies",
            }),
            {
                headers: {
                    Accept: "application/json,",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((response) => setIsBusy(response.data.scheduleIsBusies));
    }, [id]);

    const modifiers = {
        disabled: (date) => {
            if (dayDuration > 0) {
                res = true;
                dayDuration--;
            } else if (date < new Date(new Date().setDate(new Date().getDate() - 1))) {
                res = true;
            } else {
                res = false;
            }
            isBusy.forEach((day) => {
                if (moment(date).format("YYYY-MM-DD") === moment(day.date_from).format("YYYY-MM-DD")) {
                    dayDuration = day.duration;
                    dayDuration = dayDuration - 1;
                    res = true;
                }
            });
            return res;
        },

        highlight: (date) => {
            let res = false;
            bufferArr.forEach((element) => {
                if (date >= element.start && date <= element.end) {
                    res = true;
                }
            });
            return res;
        },
        start: (date) => {
            let res = false;
            bufferArr.forEach((element) => {
                if (+date === +element.start) {
                    res = true;
                }
            });
            return res;
        },
        end: (date) => {
            let res = false;
            bufferArr.forEach((element) => {
                if (+date === +element.end) {
                    res = true;
                }
            });
            return res;
        },
    };

    const modifiersClassNames = {
        highlight: "-highlight",
        start: "start",
        end: "end",
    };

    if (endDate) {
        for (let i = bufferArr.length; i--; ) {
            if (
                (startDate >= bufferArr[i].start && startDate <= bufferArr[i].end) ||
                (endDate >= bufferArr[i].start && endDate <= bufferArr[i].end) ||
                (startDate <= bufferArr[i].start && endDate >= bufferArr[i].end)
            ) {
                bufferArr.splice(i, 1);
            }
        }
        let busy = false;
        isBusy.forEach((day) => {
            if (
                moment(startDate).format("YYYY-MM-DD") < moment(day.date_from).format("YYYY-MM-DD") &&
                moment(endDate).format("YYYY-MM-DD") > moment(day.date_from).format("YYYY-MM-DD")
            ) {
                busy = true;
            }
        });
        if (!busy) {
            bufferArr.push({
                start: startDate,
                end: endDate,
            });
        }
        setStartDate(null);
        setEndDate(null);
        console.log(isBusy);
        console.log(bufferArr);
    }

    useEffect(() => {
        if (startDate !== null && endDate !== null) {
            setIsOrdered("");
        }
    }, [startDate, endDate]);

    const handleClickToObject = (event) => {
        event.preventDefault();

        bufferArr.forEach((item) =>
            booking.push({
                date: moment(item.start).format("YYYY-MM-DD"),
                duration: +moment(moment(item.end).diff(moment(item.start))).format("DD"),
            })
        );
        console.log(booking);

        let data = {
            about: commentText.current.value,
            time_from: timeFromInput.current.value,
            time_to: timeToInput.current.value,
            address: addressInput.current.value,
            payment_from: paymentFromInput.current.value,
            payment_to: paymentToInput.current.value,
            booking: JSON.stringify(booking),
            object_id: id,
            user_id: ctx.isUserId,
        };

        if (bufferArr.length < 1) {
            setIsOrdered("Некорректная дата. Пожалуйста выберите дату");
        } else {
            fetch(
                getHost({
                    controller: "order",
                }),
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json,",
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.status === 201) {
                        setIsOrdered("Заявка отправлена");
                        ctxModal.isOrderedModal();
                        const setOrdered = setTimeout(() => {
                            bufferArr = [];
                            setIsOrdered("");
                        }, 2000);
                        return () => {
                            clearTimeout(setOrdered);
                        };
                    }
                });
        }

        event.target.reset();
    };

    return (
        <>
            {ctx.userData?.id ? (
                ctx.userData.mail_confirmed === null || ctx.userData.mail_confirmed === 0 ? (
                    <ModalNonConfirm />
                ) : (
                    <form className="modal modal__card3" onSubmit={handleClickToObject}>
                        <div className="closeModal" onClick={() => ctxModal.closeModal()}>
                            <ModalCloseSvg />
                        </div>
                        <h3 className="title">Подать заявку</h3>
                        <div className="request_sub_text">Заполните информацию о заказе ниже:</div>
                        {isOrdered.length > 0 && <div className="respond_modal">{isOrdered}</div>}
                                <div className="input dateInputPick input_margin_15">
                                    <h6>Выберите дату:</h6>
                                    <div className="datePick" onClick={handleToggle}>
                                        <div className="calendarRequestSvg" onClick={handleToggle}>
                                            <RequestCalendarSvg className="calendarSvg"/>
                                        </div>
                                        {bufferArr.length > 0
                                            ? bufferArr.map((item) => (
                                                  <div>
                                                      {moment(item.start).format("DD.MM.YYYY") +
                                                          " - " +
                                                          moment(item.end).format("DD.MM.YYYY")}
                                                  </div>
                                              ))
                                            : "Нажмите, чтобы выбрать"}
                                    </div>
                                </div>
                        <div className={isToggle ? 'dn' : "mobile_scroll"}>
                                <div className="input input_margin_15">
                                    <h6>Время:</h6>
                                    <div className="input_box">
                                        <div className="request_time">
                                            <div className="time_request_left">с</div>
                                            <input type="time" placeholder="От " ref={timeFromInput} />
                                            <div className="time_request_left">с</div>
                                        </div>

                                        <div className="request_time">
                                            <div className="time_request_left">до</div>
                                            <input type="time" placeholder="До " ref={timeToInput} />
                                        </div>
                                    </div>
                                </div>
                        <div className="input input_margin_15">
                            <h6>Оплата:</h6>
                            <div className="input_box">
                                <div className="payment_req_wrap">
                                    <div className="payment_req_left">от</div>
                                    <input type="number" placeholder="Сумма " ref={paymentFromInput} />
                                    <div className="payment_req_right">
                                        <RequestRubleSvg />
                                    </div>
                                </div>
                                <div className="payment_req_wrap">
                                    <div className="payment_req_left">до</div>
                                    <input type="number" placeholder="Сумма " ref={paymentToInput} />
                                    <div className="payment_req_right">
                                        <RequestRubleSvg />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bordered_bottom">
                                <div className="input">
                                    <textarea placeholder="Опишите заказ" ref={commentText}></textarea>
                                </div>

                                <div className={`left__inputs__modal`}>
                                    <div className="input">
                                        <div className="input_wrap">
                                            <input placeholder="Введите адрес" type="text" ref={addressInput} />
                                            <div className="request_address_svg">
                                                <RequestAddressSvg />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                            </div>
                                {isToggle && (
                                    <div className="Calendar__modal">
                                        {/*<div className="calendar__p">*/}
                                        {/*    <p>Начальная дата: {startDate ? format(startDate, 'dd MMM yyyy', {locale: ru}) : 'Выберите дату'}.</p>*/}
                                        {/*    <p>Последний день: {endDate ? format(endDate, 'dd MMM yyyy', {locale: ru}) : 'Выберите дату'}.</p>*/}
                                        {/*</div>*/}

                                        <DateRangePickerCalendar
                                            startDate={startDate}
                                            modifiers={modifiers}
                                            endDate={endDate}
                                            focus={focus}
                                            onStartDateChange={setStartDate}
                                            onEndDateChange={setEndDate}
                                            onFocusChange={handleFocusChange}
                                            modifiersClassNames={modifiersClassNames}
                                            locale={ru}
                                        />
                                    </div>
                                )}
                        <button className="modal__btn" type="submit">
                            Отправить
                        </button>
                    </form>
                )
            ) : (
                <ModalUnauth />
            )}
        </>
    );
};

export default ModalRequest;
