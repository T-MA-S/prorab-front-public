import "../cabinet.sass";
import RequestType from "./RequestType";
import RequestItem from "./RequestItem";
import RequestsList from "./RequestsList";
import { useContext, useEffect, useState } from "react";
import { token } from "../../App";
import AuthContext from "../../store/auth-context";
import getHost, { link } from "../../store/host-store";
import ArrowBack from "./svg/ArrowBack";
import Loader from "../../components/loader/Loader";

const Request = (props) => {
    const [typeCategory, setTypeCategory] = useState([]);
    const [typeId, setTypeId] = useState(0);
    const [object, setObject] = useState([]);
    const [objectId, setObjectId] = useState(0);
    const [requestCart, setRequestCart] = useState([]);
    const [mobileVisibleCart, setMobileVisibleCart] = useState(false);
    const [activeTab, setActiveTab] = useState("newRequests");
    const [counterNewResponse, setCounterNewResponse] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const resetObjects = (type) => {
        setObjectId(0);
        setRequestCart([]);
        setTypeId(type);
    };

    const getObjectId = (id) => {
        setObjectId(id);
    };

    const ctx = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
                action: "account-list",
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if(result.success){
                    setTypeCategory(result.data);
                    console.log(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, [ctx.rerender]);

    useEffect(() => {
        setIsLoading(false);
        fetch(`${link}/object/user-objects?&filter[type]=${typeId}`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    console.log(result.data)
                    setObject(result.data);
                    setIsLoading(true)
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, [ctx.rerender, typeId]);

    useEffect(() => {
        if (objectId !== 0) {
            fetch(`${link}/order?filter[object_id]=${objectId}&expand=user, bookings`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.success) {
                        setRequestCart(result.data);
                    }else{
                        if(result.status === 401){
                            localStorage.removeItem("token");
                            window.location.replace("/login");
                        }
                    }
                }).catch(error => console.log(error));
        }
    }, [objectId, ctx.rerender, activeTab]);

    return (
        <>
            <div className="request_flex_title_withArrow">
                {mobileVisibleCart && (
                    <div className="arrow_back" onClick={() => setMobileVisibleCart(false)}>
                        <ArrowBack />
                    </div>
                )}
                <h2 className="h2_cabinet_main">Заявки</h2>
            </div>
            <div className="cabinet_ads request_main">
                <div className="cabinet_ads__left cabinet_ads__left_request">
                    <div className="request_block">
                        <div className="advers___title">Категории заявок:</div>
                        <RequestType typeCategory={typeCategory} resetObjects={resetObjects} typeId={typeId} />
                    </div>
                    <div className="request__flex">
                        {isLoading ?
                            <>
                            <RequestItem
                                object={object}
                                getObjectId={getObjectId}
                                objectId={objectId}
                                setMobileVisibleCart={setMobileVisibleCart}
                            />


                        <div className={`cabinet_ads__date ${mobileVisibleCart ? "cabinet_ads_date_mobile" : ""}`}>
                            <RequestsList
                                counterNewResponse={counterNewResponse}
                                setCounterNewResponse={setCounterNewResponse}
                                requestCart={requestCart}
                                mobileVisibleCart={mobileVisibleCart}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>
                            </>
                            : <Loader />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Request;
