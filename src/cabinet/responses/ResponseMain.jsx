import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import getHost, { link } from "../../store/host-store";
import ResponseContractor from "./ResponseContractor";
import Loader from "../../components/loader/Loader";
import AuthContext from "../../store/auth-context";
import ResponseCustomer from "./ResponseCustomer";
import ArrowBack from "../request/svg/ArrowBack";
import ResponseTypes from "./ResponseTypes";
import ResponseTabs from "./ResponseTabs";
import style from "./style.module.sass";
import { token } from "../../App";

const ResponseMain = () => {
    const location = useLocation();

    const ctx = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState(location.state === null ? "customer" : "contractor"); // табы я заказчик-я исполнитель
    const [openSettings, setOpenSettings] = useState(-1); //айди объявления, настройки которого открыты
    const [rerender, setRerender] = useState(false);
    const [responses, setResponses] = useState([]);
    const [categories, setCategory] = useState([]); // инфа по основным категориям
    const [objects, setObjects] = useState([]); // объявления (мапятся, когда открыт таб "я исполнитель")
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1); // Страница пагинации
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(0); //активный таб категории

    const [status, setStatus] = useState(0); // 0-active, 1-archive

    const [objectId, setObjectId] = useState(location.state === null ? 0 : location.state.objectId);
    const [activeCustomerCount, setActiveCustomerCount] = useState(0);
    const [archiveCustomerCount, setArchiveCustomerCount] = useState(0);
    const [activeContractorCount, setActiveContractorCount] = useState(0);
    const [archiveContractorCount, setArchiveContractorCount] = useState(0);
    const [requests, setRequests] = useState([]); // заявки (мапятся, когда открыт таб "я исполнитель" и выбрано какое-то объявление)
    const [responseTab, setResponseTab] = useState(0); // 0 - active, 1 - archive
    const [requestsArchive, setRequestArchive] = useState([]);
    const [mobileVisibleCart, setMobileVisibleCart] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        //получили категории (type)
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
                if (result.success) {
                    setCategory(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, [rerender]);

    // я-исполнитель
    const getObjects = () => {
        fetch(`${link}/object/user-objects?&filter[type]=${type}`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("OBJECTS", result);
                setLoading(false);
                if (result.success) {
                    setObjects(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    };

    useEffect(() => {
        if (activeTab === "contractor") {
            getObjects();
        }
        if (activeTab === "customer" && status === 1) {
            getCustomerArchive();
        }
        if (activeTab === "customer" && status === 0) {
            getResponses();
        }
        //получили количество откликов в статусах
        fetch(`${link}/category/confirmed-order-client-status-list-by-type?type=${type}`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setActiveCustomerCount(result.data[0].amountOfActive);
                    setArchiveCustomerCount(result.data[0].amountOfArchive);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    }, [type, rerender, ctx.isUserId, activeTab]);

    useEffect(() => {
        if (objectId !== 0) {
            //получаем количество архив, активные
            fetch(`${link}/object/confirmed-order-implementer-status-list?id=${objectId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.success) {
                        setActiveContractorCount(result.data.amountOfActive);
                        setArchiveContractorCount(result.data.amountOfArchive);
                    }else{
                        if(result.status === 401){
                            localStorage.removeItem("token");
                            window.location.replace("/login");
                        }
                    }
                }).catch(error => console.log(error));

            //получаем сами заявки
            fetch(
                `${link}/order?filter[object_id]=${objectId}&filter[confirmed]=1&filter[object.user_id]=${ctx.isUserId}&expand=object, user`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log("objectId", result);
                    if (result.success) {
                        setRequests(result.data);
                    }else{
                        if(result.status === 401){
                            localStorage.removeItem("token");
                            window.location.replace("/login");
                        }
                    }
                }).catch(error => console.log(error));
        }
    }, [objectId, rerender]);

    return (
        <div className="cabinet__redesign_container">
            <div className={style.response__back}>
                {mobileVisibleCart && (
                    <div className="arrow_back" onClick={() => setMobileVisibleCart(false)}>
                        <ArrowBack />
                    </div>
                )}
                <h3 className="cabinet__redesign_title">Отклики</h3>
            </div>

            <div className={style.response}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ResponseTabs
                            setActiveTab={setActiveTab}
                            setObjectId={setObjectId}
                            activeTab={activeTab}
                            getObjects={getObjects}
                            setStatus={setStatus}
                            setLoading={setLoading}
                        />

                        <ResponseTypes
                            toggleCategory={toggleCategory}
                            type={type}
                            category={categories}
                            activeTab={activeTab}
                        />

                        {activeTab === "customer" ? (
                            <ResponseCustomer
                                status={status}
                                setStatus={setStatus}
                                activeCustomerCount={activeCustomerCount}
                                archiveCustomerCount={archiveCustomerCount}
                                getCustomerArchive={getCustomerArchive}
                                getResponses={getResponses}
                                responses={responses}
                                setResponses={setResponses}
                                loading={loading}
                                setLoading={setLoading}
                                openSettings={openSettings}
                                setOpenSettings={setOpenSettings}
                                setRerender={setRerender}
                            />
                        ) : (
                            <ResponseContractor
                                objects={objects}
                                objectId={objectId}
                                setResponseTab={setResponseTab}
                                activeContractorCount={activeContractorCount}
                                getContractorArchive={getContractorArchive}
                                archiveContractorCount={archiveContractorCount}
                                responseTab={responseTab}
                                requests={requests}
                                setRerender={setRerender}
                                setRequests={setRequests}
                                setObjectId={setObjectId}
                                mobileVisibleCart={mobileVisibleCart}
                                setRequestArchive={setRequestArchive}
                                setMobileVisibleCart={setMobileVisibleCart}
                                requestsArchive={requestsArchive}
                                setActiveContractorCount={setActiveContractorCount}
                                setArchiveContractorCount={setArchiveContractorCount}
                                activeCard={location.state !== null && location.state.orderId}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );

    // Запросы на подгрузку при смене категории
    function toggleCategory(type) {
        setRequestArchive([]);
        setActiveCustomerCount(0);
        setArchiveCustomerCount(0);
        setActiveContractorCount(0);
        setArchiveContractorCount(0);
        setRequests([]);
        setType(type);
        setObjectId(0);
        setPage(1);
    }

    function getResponses() {
        fetch(
            `${link}/order?expand=object, object.city, user, bookings, object.user&filter[confirmed]=1&filter[order.user_id]=${ctx.isUserId}Id&pagination[pageSize]=6&page=1&filter[type]=${type}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json().then((data) => ({ data, headers: res.headers })))
            .then((result) => {
                setLoading(false);

                if (result.data.success) {
                    setResponses(result.data.data);
                    setPageCount(parseInt(result.headers.get("X-Pagination-Page-Count")));
                }
            });
        //при смене табов закрыть мини-окно с настройками
        setOpenSettings(-1);
    }

    function getCustomerArchive() {
        fetch(
            `${link}/order/archive?filter[object.type]=${type}&filter[order.user_id]=${ctx.isUserId}&expand=object, user, bookings, object.city`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setLoading(false);
                if (result.success) {
                    setResponses(result.data);
                }
            });
    }

    function getContractorArchive() {
        fetch(
            `${link}/order/archive?filter[object_id]=${objectId}&filter[object.user_id]=${ctx.isUserId}&expand=object, user, object.city`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                if (result.success) {
                    setRequestArchive(result.data);
                }
            });
    }
};

export default ResponseMain;
