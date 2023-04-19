import {useContext, useEffect, useState} from "react";
import DeviceContext from "../../store/device-context";
import OpenSettingsSvg from "./svg/OpenSettingsSvg";
import SettingsDeleteSvg from "./svg/SettingsDeleteSvg";
import {useDispatch, useSelector} from "react-redux";
import {checkboxAction} from "../../store/redux";
import {link} from "../../store/host-store";
import {token} from "../../App";
import AuthContext from "../../store/auth-context";


const AdvertisementCheckboxAll = props => {
    const device = useContext(DeviceContext);
    const [isModal, setIsModal] = useState(false);
    const ctx = useContext(AuthContext);

    const getCheckboxesState = useSelector((state) => state.checkboxes);
    const getStatus = useSelector(state => +state.status.status)
    const dispatch = useDispatch();

    let idsArr = props.arr.map((item) => item.id);
    useEffect(() => {
        idsArr = props.arr.map((item) => item.id);
    }, props.id)

    const handleMainCheckboxChange = (ids) => {
        dispatch(checkboxAction.toggleMainCheckbox( ids ));
    };

    const openSettingsHandler = () => {
        setIsModal(prevState => !prevState)
    }

    const  deleteHandler = async () => {
            getCheckboxesState.checkedArr.forEach(item => {
            fetch(`${link}/object/${item}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ status: 4 })
            })
                .then((res) => {
                    console.log(res)
                    ctx.setRerender((prev) => !prev);
                });
        })
    }

    const deactivateHandler = async () => {
        let data = 3;
        if(getStatus === 3){
            data = 1;
        }
        getCheckboxesState.checkedArr.forEach(item => {
            fetch(`${link}/object/${item}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ status: data })
            })
                .then((res) => {
                    ctx.setRerender((prev) => !prev);
                });
        })
    }

    return(
        <div className="flex_advers__settings">
            <label className="container_checkbox">
                <input type="checkbox" className="advers__settings advers__settings_checkbox"
                       checked={getCheckboxesState.isCheckAll}
                       onChange={() => { handleMainCheckboxChange(idsArr); }}
                />
                <span className="checkmark"></span>
            </label>
            {getStatus !== 2 &&
                <div className="advers__settings advers__settings_stop">
                    {getStatus === 3 && <div onClick={deactivateHandler}>Возобновить</div>}
                    {getStatus !== 3 && <div onClick={deactivateHandler}>Остановить</div>}
                </div>
            }


                {/*<div className="advers__settings advers__settings_changeDate">Изменить дату работы</div>*/}

            {!device.isMobile && <div onClick={deleteHandler} className="advers__settings advers__settings_delete">Удалить</div>}
            {device.isMobile && getStatus === 2 && <div onClick={deleteHandler} className="advers__settings advers__settings_delete">Удалить</div>}
            {device.isMobile && getStatus !== 2 &&
                <div className="open_settings_advers">
                    <div className="open_setting_click" onClick={openSettingsHandler}>
                        <OpenSettingsSvg />
                    </div>
                    {isModal &&
                    <div className="modalSettings">
                        {/*<div className="adv_modal_settings_change__date adv_modal_text" onClick={changeDateHandler}>*/}
                        {/*    <div className="open_sett_svg">*/}
                        {/*        <SettingsCalendarSvg />*/}
                        {/*    </div>*/}
                        {/*    <span>Изменить дату работы</span>*/}
                        {/*</div>*/}
                        <div className="adv_modal_settings_delete adv_modal_text" onClick={deleteHandler}>
                            <div className="open_sett_svg">
                                <SettingsDeleteSvg />
                            </div>
                            <span>Удалить</span>
                        </div>
                    </div>
                    }
                </div>
            }
        </div>
    )
 }

 export default AdvertisementCheckboxAll;