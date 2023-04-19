import "../cabinet.sass";
import {useContext, useEffect, useRef, useState} from "react";
import Input from "../../UI/Input";
import { token } from "../../App";
import FileInput from "../../UI/FileInput/FileInput";
import axios from "axios";
import avatar from "../../assets/images/stubs/avatar.svg";
import getHost, { url } from "../../store/host-store";
import DeviceContext from "../../store/device-context";
import CabinetInfoRight from "./CabinetInfoRight";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionSvg from "../Svg/AccordionSvg";
import Typography from "@mui/material/Typography";
import CabinetSocToggle from "./CabinetSocToggle";
import tel from "../../assets/images/cabinet/tel.svg";
import email from "../../assets/images/cabinet/email.svg";
import CabinetInfoWalletPoints from "./CabinetInfoWalletPoints";

const CabinetInfo = (props) => {
    const device = useContext(DeviceContext);

    const [error, setError] = useState("");
    const [accept, setAccept] = useState(0);
    const [workWeekend, setWorkWeekend] = useState(0);
    const [timeFrom, setTimeFrom] = useState("00:00");
    const [timeTo, setTimeTo] = useState("00:00");
    const inputEmail = useRef();
    const inputName = useRef();
    // const inputWa = useRef();
    // const inputTelegram = useRef();
    // const inputViber = useRef();

    useEffect(() => {
        setAccept(props.data.busy || '');
        setWorkWeekend(props.data.work_on_weekend || '');
        setTimeTo(props.data.working_hours_end || '');
        setTimeFrom(props.data.working_hours_start || '');
        console.log(props.data);
    }, [props.data])

    const getImg = (selectedImg) => {
        const formData = new FormData();
        formData.append("avatar", selectedImg);

        axios
            .put(
                getHost({
                    controller: "user",
                    action: "identity-update",
                }),
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
            .then(() => {
                props.getRerender((prev) => !prev);
            })
            .catch((err) => console.log(err));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let data = {
            name: inputName.current.value,
            email: inputEmail.current.value,
            busy: accept ? 1 : 0,
            work_on_weekend: workWeekend ? 1 : 0,
            working_hours_start: timeFrom,
            working_hours_end: timeTo === "00:00" ? "24:00" : timeTo,
            // whatsapp: inputWa.current.value,
            // telegram: inputTelegram.current.value,
            // viber: inputViber.current.value,
        };
        props.getRerender((prev) => !prev);
        fetch(
            getHost({
                controller: "user",
                action: "identity-update",
            }),
            {
                method: "PUT",
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
                props.getRerender((prev) => !prev);
                setError(result.data[0]);
                console.log(result);
            });
        console.log(data);
    };

    const whatsAppHolder = props.data.whatsapp === null || props.data.whatsapp === "" ? "Нет данных" : "";

    const timeChangeFrom = e => {
        setTimeFrom(e.target.value)
    }

    const timeChangeTo = e => {
        setTimeTo(e.target.value);
    }

    return (
        <>
            <h2 className="h2_cabinet_main">Главная личный кабинет</h2>
            <form className="person_data" encType="multipart/form-data" onSubmit={submitHandler}>
                <div className="admin__main_cabinet__flex">
                    <div className="left__cabinet__main_flex">
                        <div className="admin__info_top-wrapper">
                            <div className="cabinet_info__avatar_and_info_form">
                            {props.data.avatar === null ? (
                                <div className="cabinet__info_avatar">
                                    <img className="cabinet__info_avatar_img" src={avatar} alt="avatar"></img>
                                    <FileInput getImg={getImg} />
                                </div>
                            ) : (
                                <div className="cabinet__info_avatar">
                                    <img
                                        className="cabinet__info_avatar_img"
                                        src={url + props.data.avatar}
                                        alt="avatar"
                                    />
                                    <FileInput getImg={getImg} />
                                </div>
                            )}

                            {device.isMobile && (
                                <div className="info_formation">
                                    <div className="info_adv">{props.data.amountOfObjects} объявлений</div>
                                    <div className="info_response">{props.data.amountOfConfirmedOrders} откликов</div>
                                </div>
                            )}
                            </div>

                            <div className="info_top_second">
                                <div className="info_top_second__text">
                                    Ваше имя <span>(видно всем пользователям)</span>
                                </div>
                                <div className="info_top_second_flex">
                                    <Input
                                        classNameParent="input input_name inputMainName"
                                        type="text"
                                        placeholder=""
                                        value={props.data.name}
                                        defaultValue={props.data.name}
                                        ref={inputName}
                                    />
                                    {error && <p className="name__error">{error.message}</p>}

                                    {!device.isMobile && (
                                        <div className="info_formation">
                                            <div className="info_adv">{props.data.amountOfObjects} объявлений</div>
                                            <div className="info_response">
                                                {props.data.amountOfConfirmedOrders} откликов
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/*{!device.isMobile && (*/}
                            {/*    <div className="admin__info_btns-wrapper">*/}
                            {/*        <button className="admin__btn-transparent" onClick={modal.deleteProfileModal}>*/}
                            {/*            Удалить профиль*/}
                            {/*        </button>*/}
                            {/*        <button className="admin__btn-blue">Сохранить</button>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            {device.isMobile &&
                                    <CabinetInfoWalletPoints />
                                }
                        </div>

                        <div className="info_contacts">
                            <div className="accordion_cabinet">
                                <Accordion defaultExpanded disableGutters>
                                    <AccordionSummary
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                        expandIcon={<AccordionSvg />}>
                                        <Typography className="typography_title_strong">
                                            Контактная информация
                                        </Typography>
                                    </AccordionSummary>

                                    <div className="info_contacts_top">
                                        <div className="info_contacts_tel">
                                            <div className="info__block_title">Телефон контактный:</div>
                                            {/* <Input
                                    h6="Номер телефона"
                                    classNameParent="input2"
                                    className="input_phone tel"
                                    type="number"
                                    placeholder=""
                                    disabled
                                    defaultValue={props.data.phone}
                                /> */}
                                            <div className="input2">
                                                <p>
                                                    <img src={tel} alt="" />
                                                    {props.data.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info_contacts__led">
                                            <div className="info__block_title">Дублировать уведомление:</div>
                                            <div className="info_soc_flex">
                                                {/* <CabinetSocToggle src="/img/whatsapp.png" /> */}
                                                <CabinetSocToggle src="/img/telegram.png" />
                                                {/* <CabinetSocToggle src="/img/viber.png" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info_contacts_bottom">
                                        <div className="info__block_title">E-mail:</div>
                                        <Input
                                            placeholder={whatsAppHolder}
                                            type="email"
                                            srcLeft={email}
                                            classNameParent="input input_email"
                                            ref={inputEmail}
                                            defaultValue={props.data.email}
                                        />
                                    </div>
                                </Accordion>
                            </div>
                        </div>

                        <div className="info_whenBlock">
                            <div className="accordion_cabinet">
                                <Accordion defaultExpanded disableGutters>
                                    <AccordionSummary
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                        expandIcon={<AccordionSvg />}>
                                        <Typography className="typography_title_strong">Рабочий график</Typography>
                                    </AccordionSummary>

                                    <div className="info_when__flex">
                                        <div className="info_top">
                                            <div className="info_top_when__left">
                                                <div className="info__block_title">Принимаю заявки:</div>
                                                <CabinetSocToggle
                                                    text={accept ? "Занят" : "Принимаю заявки"}
                                                    checked={accept}
                                                    toggle={() => {
                                                        setAccept(prev => !prev)
                                                    }}
                                                    className="switchApplication"
                                                />
                                            </div>

                                            <div className="info_top_when__right">
                                                <div className="info__block_title">Выходные дни:</div>
                                                <CabinetSocToggle
                                                    checked={workWeekend}
                                                    toggle={() => setWorkWeekend(prev => !prev)}
                                                    text="Работаю"
                                                    className="switchWork" />
                                            </div>
                                        </div>

                                        <div className="info_bottom">
                                            <div className="info__block_title">График работы:</div>
                                            <div className="info_bottom___flex">
                                                <div className="info_bottom___left">
                                                    <div className="cabinet__time_info">
                                                        <input onChange={event => setTimeFrom(event.target.value)}
                                                            type='time' className="info_block__timeFrom info_block__time" value={timeFrom}>
                                                        </input>
                                                        <span>c</span>
                                                    </div>
                                                    <div className="cabinet__time_info">
                                                        <input onChange={event => setTimeTo(event.target.value)}
                                                            type='time' className="info_block__timeTo info_block__time" value={timeTo}>
                                                        </input>
                                                        <span>до</span>
                                                    </div>

                                                </div>
                                                <div className="info_bottom___right">
                                                    <span>*</span> Графики влияет на время отображения Ваших объявлений
                                                    в каталоге. Если хотите принимать заявки круглосуточно оставьте
                                                    время по умолчанию.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion>
                            </div>
                        </div>

                        {!device.isMobile &&
                            <div className="admin__info_btns-wrapper">
                                {/*<button className="admin__btn-transparent" onClick={modal.deleteProfileModal}>*/}
                                {/*    Удалить профиль*/}
                                {/*</button>*/}
                                <button className="admin__btn-blue">Сохранить</button>
                            </div>
                        }
                    </div>
                    <CabinetInfoRight />

                    {device.isMobile &&
                        <div className="admin__info_btns-wrapper">
                            {/*<button className="admin__btn-transparent" onClick={modal.deleteProfileModal}>*/}
                            {/*    Удалить профиль*/}
                            {/*</button>*/}
                            <button className="admin__btn-blue">Сохранить</button>
                        </div>
                    }
                </div>
            </form>
        </>
    );
};

// <div className="right">
//     <Input
//         className="input_phone tel"
//         placeholder={whatsAppHolder}
//         type="number"
//         src="/img/whatsapp.png"
//         classNameParent="input"
//         ref={inputWa}
//         defaultValue={whatsAppValue}
//     />
//     <Input
//         className="input_phone tel"
//         placeholder={telegramHolder}
//         type="number"
//         defaultValue={telegramValue}
//         src="/img/telegram.png"
//         classNameParent="input"
//         ref={inputTelegram}
//     />
//     <Input
//         className="input_phone tel"
//         placeholder={viberHolder}
//         type="number"
//         defaultValue={viberValue}
//         src="/img/viber.png"
//         classNameParent="input"
//         ref={inputViber}
//     />
// </div>

export default CabinetInfo;
