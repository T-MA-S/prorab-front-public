import ModalsContext from "../../store/modals-context";
import AuthContext from "../../store/auth-context";
import {useCallback, useContext, useEffect, useState} from "react";

import TypeList from "./desktopPages/TypeList";
import AdsItems from "./desktopPages/AdsItems";
import CreateAds from "./createAds/CreateAds";
import EditAd from "./editAd/EditAd";
import DeviceContext from "../../store/device-context";
import CustomScrollbar, {CustomScrollbarHorizontal} from "../../UI/Scrollbar/CustomScrollbar";
import { Route, useLocation } from "react-router-dom";
import AdvertisementCheckboxAll from "./AdvertisementCheckboxAll";
import FilterStatus from "./FilterStatus";
import ArrowSvg from "./svg/ArrowSvg";
import ArrowBack from "../request/svg/ArrowBack";

const DesktopAdsPage = ({ category, deactivateHandler, activeToggle, setActiveToggle, deleteHandler }) => {
    const path = useLocation();

    const [type, setType] = useState(0);
    const [adId, setAdId] = useState(0);
    const [arr, setArr] = useState([]);

    const [currentPage, setCurrentPage] = useState(
        path.pathname === "/lc/advertisement/create" ? "CreateAdPage" : "MainPage"
    );

    function getArr(arr) {
        setArr(arr)
    }

    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);
    const device = useContext(DeviceContext);

    const closeMiniModal = () => {
        // повторно дергаем бэк для получения актуального статуса прав
        ctx.setRefreshData((prev) => !prev);
        // пользователь с неподтвержденной почтой не может размещать объявления
        if (ctx.userData.mail_confirmed) {
            setActiveToggle(false);
            setCurrentPage("CreateAdPage");
        } else {
            modal.unconfirm();
        }
    };

    console.log(type)

    if (currentPage === "MainPage") {
        return (
            <div className="cabinet_for_mobile_btn">
                <h2 className="h2_cabinet_main">Мои объявления</h2>
                {device.isMobile && (
                    <div className="advers_top_flex_right">
                        <button className="btn_save" onClick={closeMiniModal}>
                            Разместить объявление
                        </button>
                    </div>
                )}
                <div className="cabinet_ads">
                    <div className="cabinet_ads__left">
                        <div className="ads__top_block">
                            <div className="advers___title">Категории объявлений:</div>
                            <TypeList category={category} type={type} onTypeChange={setType} />
                        </div>

                        <div className="ads__filters__block">
                            <div className="advers___title">Статус объявлений:</div>

                                <div className="advers__flex_top">
                                    {!device.scrollHorizontal && <FilterStatus type={type}/>}
                                    {device.scrollHorizontal &&
                                        <CustomScrollbarHorizontal style={{height: "27px"}}>
                                            <FilterStatus type={type}/>
                                        </CustomScrollbarHorizontal>
                                    }
                                {!device.isMobile && (
                                    <div className="advers_top_flex_right">
                                        <button className="btn_save" onClick={closeMiniModal}>
                                            Разместить объявление
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="advers__flex__bottom">
                                <AdvertisementCheckboxAll arr={arr}
                                                          id={adId}/>

                                <div className="flex__advers__sorter">
                                    Сортировка
                                    <ArrowSvg />
                                </div>
                            </div>
                        </div>

                        <AdsItems
                            type={type}
                            onPageChange={setCurrentPage}
                            getIdItem={setAdId}
                            id={adId}
                            deactivateHandler={deactivateHandler}
                            activeToggle={activeToggle}
                            setActiveToggle={setActiveToggle}
                            deleteHandler={deleteHandler}
                            getArr={getArr}
                        />
                    </div>
                    {/*<PreviewAd*/}
                    {/*    id={adId}*/}
                    {/*    onPageChange={setCurrentPage}*/}
                    {/*    deactivateHandler={deactivateHandler}*/}
                    {/*    activeToggle={activeToggle}*/}
                    {/*    setActiveToggle={setActiveToggle}*/}
                    {/*    deleteHandler={deleteHandler}*/}
                    {/*/>*/}
                </div>
            </div>
        );
    }
    if (currentPage === "CreateAdPage") {
        return (
            <CreateAds
                category={category}
                type={type}
                onBack={setCurrentPage}
                onTypeChange={setType}
                setActiveToggle={setActiveToggle}
            />
        );
    }
    if (currentPage === "EditAdPage") {
        return (
            <>
                <div className="flex">
                    <div onClick={() => setCurrentPage("MainPage")}>
                        <ArrowBack />
                    </div>
                    <h2 className="h2_cabinet_main">Редактировать объявление</h2>
                </div>
                <EditAd
                    id={adId}
                    onPageChange={setCurrentPage}
                    type={type}
                    onBack={setCurrentPage}
                    setActiveToggle={setActiveToggle}
                />
            </>
        );
    }
};

export default DesktopAdsPage;
