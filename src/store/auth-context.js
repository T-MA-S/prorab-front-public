import React, { useEffect, useState } from "react";

import { token } from "../App";
import getHost from "./host-store";

const AuthContext = React.createContext({
    setRerender: false,
    rerender: false,
    adsNumber: 0,
    isUserId: 0,
    userData: {},
    setRefreshData: () => {},
    setLocation: () => {},
    location: {},
    onDeleteProfile: () => {},
});

export const AuthContextProvide = (props) => {
    const [isUserId, setUserId] = useState(0);
    const [userData, setUserData] = useState({});
    const [adsNumber, setAdsNumber] = useState(0);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const [requestsCount, setRequestsCount] = useState(0);
    const [responseCount, setResponseCount] = useState(0);
    const [rerender, setRerender] = useState(false);
    const [location, setLocation] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [currentPage, setCurrentPage] = useState("signIn");

    useEffect(() => {
        if (localStorage.getItem("location")) {
            setLocation(JSON.parse(localStorage.getItem("location")));
        } else {
            getLocation();
        }
    }, []);

    function getLocation() {
        fetch(
            getHost({
                controller: "city",
                action: "geo",
                expand: "region, region.country",
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
                console.log(result);
                if (result.success) {
                    const data = {
                        country: result.data.region.country.name,
                        country_id: result.data.region.country.id,
                        region: result.data.region.name,
                        region_id: result.data.region.id,
                        city: result.data.name,
                        city_id: result.data.id,
                    };
                    localStorage.setItem("location", JSON.stringify(data));
                    setLocation(data);
                } else {
                    const data = {
                        country: "Россия",
                        country_id: 1,
                    };
                    localStorage.setItem("location", JSON.stringify(data));
                    setLocation(data);
                }
            });
    }

    function onDeleteProfile() {
        fetch(
            getHost({
                controller: "user",
                action: userData.id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.removeItem("token");
                    window.location.replace("/");
                }
            });
    }

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
                action: "identity",
                expand: "account",
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
                    setUserData(result.data);
                    setUserId(result.data.id);
                }
            });
    }, [refreshData]);

    useEffect(() => {
        if (userData?.account?.role !== "moderator") {
            fetch(
                getHost({
                    controller: "category",
                    action: "account-list",
                }),
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.success) {
                        const adsNumber = result.data.map((item) => +item.objectsCountByType);
                        let reducer = adsNumber.reduce(function (sum, current) {
                            return sum + current;
                        }, 0);
                        setAdsNumber(reducer);
                    }
                });
        }
    }, [rerender]);

    //количество уведомлений, откликов, заявок в лк
    useEffect(() => {
        if (userData?.account?.role === "user" || userData?.account?.role === "admin") {
            fetch(
                getHost({
                    controller: "notification",
                    action: "amount-new",
                    filter: {
                        user_id: isUserId,
                    },
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
                        setNotificationsCount(result.data.amountNew);
                    }
                });

            //отклики
            fetch(
                getHost({
                    controller: "order",
                    action: "amount-confirmed-by-user",
                    filter: {
                        user_id: isUserId,
                    },
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
                        setResponseCount(result.data);
                    }
                });

            //заявки
            fetch(
                getHost({
                    controller: "order",
                    action: "amount-by-user",
                    filter: {
                        user_id: isUserId,
                    },
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
                        setRequestsCount(result.data);
                    }
                });
        }
    }, [isUserId, rerender]);

    return (
        <AuthContext.Provider
            value={{
                isUserId,
                userData,
                adsNumber,
                setRerender,
                rerender,
                notificationsCount,
                setNotificationsCount,
                requestsCount,
                responseCount,
                setRefreshData,
                location,
                setLocation,
                onDeleteProfile,
                currentPage,
                setCurrentPage,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
