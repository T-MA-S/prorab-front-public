import { useContext, useEffect, useState } from "react";

import object from "../../../assets/images/stubs/object-mob.png";
import AuthContext from "../../../store/auth-context";
import  { link, url } from "../../../store/host-store";
import { token } from "../../../App";
import "../../cabinet.sass";
import DeviceContext from "../../../store/device-context";
import OpenSettingsSvg from "../svg/OpenSettingsSvg";
import PauseSvg from "../svg/PauseSvg";
import SettingsCalendarSvg from "../svg/SettingsCalendarSvg";
import SettingsDeleteSvg from "../svg/SettingsDeleteSvg";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {calendarAction, checkboxAction, statusAction} from "../../../store/redux";
import ErrorSvg from "../../Svg/ErrorSvg";
import Loader from "../../../components/loader/Loader";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ModalsContext from "../../../store/modals-context";


const AdsItems = ({
    getIdItem,
    type,
    onPageChange,
    deactivateHandler,
    setActiveToggle,
    activeToggle,
    deleteHandler,
    getArr
}) => {
    const ctx = useContext(AuthContext);
    const device = useContext(DeviceContext);
    const modal = useContext(ModalsContext);
    const [ads, setAds] = useState([]);
    const [isActive, setActive] = useState(0);
    const [loading, setLoading] = useState(true);

    const clickItem = (id) => {
        setActive(id);
        getIdItem(id);
    };


    const showOptions = (id) => {
        setActive(id);
        setActiveToggle((prev) => !prev);
    };

    const status = useSelector(state => +state.status.status);
    const rerender = useSelector(state => state.status.rerender)

    let statusModeration = '&filter[object.status]=1';

    if(status === 1){
        statusModeration = '&filter[object.status]=1';
    }if(status === 2){
        statusModeration ='&filter[object.status][in][]=0&filter[object.status][in][]=2';
    }if(status === 3){
        statusModeration ='&filter[object.status]=3';
    }

    const getCheckboxesState = useSelector((state) => state.checkboxes)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calendarAction.cancelCalendar());
    }, [])

    useEffect(() => {
        setLoading(false);
        // fetch(getHost({
        //     controller:
        // }), {
        fetch(`${link}/object/user-objects?filter[type]=${type}&filter[user_id]=${ctx.isUserId}${statusModeration}&expand=city, scheduleIsBusies`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.success){
                    setAds(res.data);
                    getArr(res.data);
                }else{
                    if(res.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
                dispatch(checkboxAction.resetStates(res.data.length));
                console.log(res.data);
                setLoading(true)
            }).catch(error => {
            console.log(error);
        });
    }, [type, ctx.rerender, ctx.isUserId, status]);


    const changeCheckbox = (id) => {
        dispatch(checkboxAction.changeCheckboxes(id));
    }


    const getDataFromCalendar = (id) => {
        fetch(`${link}/object/${id}?expand=city, scheduleIsBusies`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then(res => res.json())
            .then(res => dispatch(calendarAction.fromBackToFront(res.data.scheduleIsBusies)))
    }

    return (
        <div className="loads_advers">
        {loading ?
                <TransitionGroup className="scroll_if_needed flex__advers_768">
                    {ads?.map((item) => (
                        <CSSTransition
                            key={item.id}
                            timeout={1000}
                            classNames="item"
                        >
                        <div
                            className={`cabinet_ads__item ${isActive === item.id ? "active" : ""}
                    ${item.status === 0 ? "moderation_status_0" : ""}
                    ${item.status === 2 ? "moderation_status_0 moderation_status_2" : ""}`
                            }
                            onClick={() => clickItem(item.id)}>
                            {item.status === 2 &&
                                <div className="moderator_message_error">
                                    <div className="mess_moderator_err">
                                        <ErrorSvg/>
                                        <span>Описание объявления не соотвествует правилам сервиса. Исправьте объявление.</span>
                                    </div>
                                </div>
                            }
                            {status !== 2 &&
                                <div className="options">
                                    <button
                                        onClick={() => showOptions(item.id)}
                                        className={`btn ${isActive === item.id && activeToggle ? "active" : ""}`}>
                                        <OpenSettingsSvg/>
                                    </button>
                                    <div className="block">
                                        {/*<div className="modal_advers__flex">*/}

                                        {/*    <a className="link redact" onClick={() => onPageChange("EditAdPage")}>*/}
                                        {/*        Редактировать*/}
                                        {/*    </a>*/}
                                        {/*</div>*/}
                                        <div className="modal_advers__flex">
                                            <PauseSvg/>
                                            {item.status === 2 ? (
                                                <div className="link deactivate">Отклонено</div>
                                            ) : (
                                                <a className="link deactivate" onClick={async () => {
                                                    deactivateHandler(item.id, item.status)
                                                    let array = [];
                                                    array = ads.filter(el => el.id !== item.id);
                                                    console.log(array)
                                                    setAds(array)
                                                    const time = setTimeout(() => {
                                                        dispatch(statusAction.statusRerender())
                                                    }, 300)
                                                    return () => clearTimeout(time);
                                                }}>
                                                    {item.status === 1 ? "Остановить" : "Активировать"}
                                                </a>
                                            )}
                                        </div>
                                        <div className="modal_advers__flex">
                                            <SettingsCalendarSvg/>
                                            <a className="link delete" onClick={() => console.log('12')}>
                                                Изменить дату работы
                                            </a>
                                        </div>
                                        <div className="modal_advers__flex">
                                            <SettingsDeleteSvg/>
                                            <a className="link delete" onClick={() => deleteHandler(isActive)}>
                                                Удалить
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="img imgAdvers">
                                {item.image === null ? (
                                    <img src={object} alt="object"/>
                                ) : (
                                    <img src={url + item.image.filename} alt="object"/>
                                )}
                                <label key={item.id} className="container_checkbox">
                                    <input datatype={item.id} type="checkbox" className="advers__settings advers__settings_checkbox"
                                           checked={getCheckboxesState.checkedArr.find((el) => el === item.id) || getCheckboxesState.isCheckAll}
                                           onChange={() => {
                                               changeCheckbox(item.id);
                                           }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="ads__descr_preview">
                                <h3 className="title">{item.name}</h3>
                                <div className="advers__medium__flex">
                                    <p className="advers__about">{item.about.slice(0, 100)}</p>
                                    <div className="advers_prices">
                                        <div className="advs_price">
                                            <h5>{item.price_1} ₽</h5>
                                            <span>{item.price_1_name}</span>
                                        </div>
                                        <div className="advs_price price_sm">
                                            <h5>{item.price_2} ₽</h5>
                                            <span>{item.price_2_name}</span>
                                        </div>
                                    </div>
                                </div>
                                {status !== 2 &&
                                    <div className="adver_bottom_info">
                                        <div className="advers_bottom_info___block advs_b_info__address">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="9" fill="none">
                                                <path fill="#B6BFE7"
                                                      d="M3.5 0a3.455 3.455 0 0 0-2.474 1.056A3.657 3.657 0 0 0 0 3.6C0 5.065 1.034 6.281 2.129 7.57c.346.407.705.83 1.025 1.256A.44.44 0 0 0 3.5 9a.428.428 0 0 0 .346-.175c.32-.427.679-.849 1.025-1.256C5.966 6.28 7 5.065 7 3.6a3.657 3.657 0 0 0-1.026-2.544A3.455 3.455 0 0 0 3.5 0Zm0 4.95c-.26 0-.513-.08-.73-.227a1.343 1.343 0 0 1-.483-.606 1.386 1.386 0 0 1 .285-1.472c.183-.188.417-.317.672-.369.255-.052.518-.025.758.077.24.102.445.275.59.497a1.378 1.378 0 0 1-.164 1.705c-.246.253-.58.395-.928.395Z"/>
                                            </svg>
                                            {item.city.name}
                                        </div>
                                        <div className="advers_bottom_info___block advs_b_info__time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none">
                                                <path fill="#B6BFE7" d="M4.5 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm1.8 4.95H4.5a.45.45 0 0 1-.45-.45V1.8a.45.45 0 1 1 .9 0v2.25H6.3a.45.45 0 1 1 0 .9Z"/>
                                            </svg>
                                            {moment(item.created).format("DD.MM.YYYY")}
                                        </div>
                                        <div className="advers_bottom_info___block advs_b_info__telegram">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none">
                                                <path fill="#B6BFE7" d="M8.66.34A1.156 1.156 0 0 0 7.49.055L.814 2.153a1.16 1.16 0 0 0-.094 2.18L3.2 5.355l1.23-1.231a.316.316 0 0 1 .448.447l-1.23 1.231 1.02 2.48A1.148 1.148 0 0 0 5.737 9h.053a1.15 1.15 0 0 0 1.057-.812L8.946 1.51A1.156 1.156 0 0 0 8.659.341Z"/>
                                            </svg>
                                            {item.amountOfConfirmedOrders} <span> </span>
                                        </div>
                                        <div className="advers_bottom_info___block advs_b_info__like">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none">
                                                <path fill="#B6BFE7" fillRule="evenodd" d="M5.575 9.736 9.1 5.824c1.2-1.332 1.2-3.494 0-4.825C7.98-.245 6.206-.327 5 .752 3.794-.328 2.02-.245.9 1-.295 2.325-.3 4.475.886 5.808l3.539 3.928c.152.169.36.264.575.264a.775.775 0 0 0 .575-.264Z" clipRule="evenodd"/>
                                            </svg>
                                            {item.amountInFavourites} <span> </span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="advers__box___right">
                                {item.status === 0 || item.status === 2 ?
                                    <div className={`moderation_advers_block ${item.status === 2 ? "moderationRed" : ''}`}>
                                        Модерация
                                    </div>
                                    :
                                    ""
                                }
                                <a className={`link redact ${item.status === 2 && 'redactModeration'}`} onClick={() => onPageChange("EditAdPage")}>
                                    {item.status === 2 ? 'Исправить' : "Редактировать"}
                                </a>

                                {!device.isMobile && item.status !== 0 && item.status !== 2 &&
                                    <div className="advers__right_sub__buttons">
                                        <div className="other_actions">Другие <br/> действия:</div>

                                        {item.status === 2 ? (
                                            <div className="link deactivate">
                                                {/*Отклонено*/}
                                            </div>
                                        ) : (
                                            <a className="link deactivate" onClick={async () => {
                                                deactivateHandler(item.id, item.status)
                                                console.log(ads)
                                                let array = [];
                                                array = ads.filter(el => el.id !== item.id);
                                                console.log(array)
                                                 setAds(array)
                                                const time = setTimeout(() => {
                                                    dispatch(statusAction.statusRerender())
                                                }, 300)
                                                return () => clearTimeout(time);
                                            }}>
                                                {item.status === 3 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none">
                                                        <circle cx="14" cy="14" r="14" fill="#6FE1B8"/>
                                                        <path fill="#546EDB" fillRule="evenodd" d="M9 9.623c0-1.245 1.33-2.08 2.388-1.352l6.916 4.758c.969.667.918 2.18-.102 2.77l-6.916 3.995C10.226 20.406 9 19.57 9 18.378V9.623Zm1.692-.284c-.162-.112-.442-.015-.442.284v8.755c0 .285.26.39.423.296l6.917-3.996c.202-.117.218-.444.019-.581l-6.917-4.758Z" clipRule="evenodd"/>
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none">
                                                        <circle cx="14" cy="14" r="14" fill="#6FE1B8"/>
                                                        <path fill="#546EDB" fillRule="evenodd" d="M10.75 8c.414 0 .75.288.75.643v10.714c0 .355-.336.643-.75.643s-.75-.288-.75-.643V8.643c0-.355.336-.643.75-.643Zm6.5 0c.414 0 .75.288.75.643v10.714c0 .355-.336.643-.75.643s-.75-.288-.75-.643V8.643c0-.355.336-.643.75-.643Z" clipRule="evenodd"/>
                                                    </svg>
                                                }
                                            </a>
                                        )}

                                        <a onClick={() => {
                                            dispatch(calendarAction.cancelCalendar())
                                            modal.calendarModal();
                                            getDataFromCalendar(item.id);
                                        }} className="link ads__modal_calendar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none">
                                                <circle cx="14" cy="14" r="14" fill="#D3D9F3"/>
                                                <path fill="#546EDB" d="M11.563 8c.31 0 .562.252.562.562v1.125a.562.562 0 1 1-1.125 0V8.562c0-.31.252-.562.563-.562ZM16.438 8c.31 0 .562.252.562.562v1.125a.562.562 0 1 1-1.125 0V8.562c0-.31.252-.562.563-.562Z"/>
                                                <path fill="#546EDB" d="M8 10.813c0-1.138.923-2.062 2.063-2.062a.562.562 0 1 1 0 1.125.937.937 0 0 0-.938.938v7.124c0 .517.42.937.938.937h7.874c.518 0 .938-.42.938-.937v-7.124a.937.937 0 0 0-.938-.938.562.562 0 1 1 0-1.125c1.14 0 2.063.924 2.063 2.063v7.124A2.062 2.062 0 0 1 17.937 20h-7.875A2.062 2.062 0 0 1 8 17.938v-7.124Z"/>
                                                <path fill="#546EDB"
                                                      d="M12.5 9.314c0-.311.252-.563.563-.563h1.874a.562.562 0 1 1 0 1.125h-1.874a.562.562 0 0 1-.563-.562ZM11.75 14.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM11 17.75a.75.75 0 1 0 0-1.501.75.75 0 0 0 0 1.5ZM14.75 12.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14 15.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM14.75 16.999a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM17 13.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM17.75 14.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM17 17.75a.75.75 0 1 0 0-1.501.75.75 0 0 0 0 1.5Z"/>
                                            </svg>
                                        </a>

                                        <a className="link delete" onClick={() => deleteHandler(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none">
                                                <circle cx="14" cy="14" r="14" fill="#D32121"/>
                                                <path fill="#fff" fillRule="evenodd"
                                                      d="M11.5 9.167c0-.645.56-1.167 1.25-1.167h2.5c.69 0 1.25.522 1.25 1.167v.499h1.25c.69 0 1.25.522 1.25 1.167v1c0 .276-.24.5-.536.5h-.178v6.5c0 .645-.56 1.167-1.25 1.167h-6.072c-.69 0-1.25-.522-1.25-1.167v-6.5h-.178c-.296 0-.536-.224-.536-.5v-1c0-.645.56-1.167 1.25-1.167h1.25v-.5Zm3.929.499H12.57v-.5c0-.091.08-.166.179-.166h2.5c.099 0 .179.075.179.167v.499Zm-3.424 1H10.25c-.099 0-.179.075-.179.167v.5H17.93v-.5c0-.092-.08-.167-.179-.167h-5.745Zm-1.22 1.667v6.5c0 .092.08.167.18.167h6.07c.1 0 .18-.075.18-.167v-6.5h-6.43Zm1.43 1c.295 0 .535.224.535.5V17.5c0 .276-.24.5-.536.5-.296 0-.535-.224-.535-.5v-3.667c0-.276.24-.5.535-.5Zm1.785 0c.296 0 .536.224.536.5V17.5c0 .276-.24.5-.536.5-.296 0-.536-.224-.536-.5v-3.667c0-.276.24-.5.536-.5Zm1.786 0c.296 0 .535.224.535.5V17.5c0 .276-.24.5-.535.5-.296 0-.536-.224-.536-.5v-3.667c0-.276.24-.5.536-.5Z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </div>
                                }

                            </div>

                        </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                :
                <Loader />
        }
        </div>
    );
};

export default AdsItems;
