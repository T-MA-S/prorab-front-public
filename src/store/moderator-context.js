import React, { useEffect, useState } from "react";

import { token } from "../App";
import getHost from "./host-store";

const ModeratorContext = React.createContext({
    objectsAmount: 0,
    rerender: false,
    currentObj: {},
    openMenu: false,
    loading: true,
    randomFetch: "",
    setOpenMenu: () => {},
    setRerender: () => {},
    correctClick: () => {},
    incorrectClick: () => {},
    onPublicObject: () => {},
    setIsCorrectAdv: () => {},
    isCorrectAdv: { img: false, descr: false, category: false },
    isCorrectFeedback: { text: false },
    isCorrectAccount: { avatar: false, name: false },
    isCorrectOrder: { about: false, address: false },
});

export const ModeratorContextProvide = (props) => {
    const [currentObj, setCurrentObj] = useState({});
    const [objectsAmount, setObjectsAmount] = useState(0);
    const [rerender, setRerender] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(true);
    const [randomFetch, setRandomFetch] = useState("");
    const [isCorrectAdv, setIsCorrectAdv] = useState({
        img: false,
        descr: false,
        category: false,
    });
    const [isCorrectFeedback, setIsCorrectFeedback] = useState({ text: false });
    const [isCorrectAccount, setIsCorrectAccount] = useState({ avatar: false, name: false });
    const [isCorrectOrder, setIsCorrectOrder] = useState({ about: false, address: false });
    const [onFetch, setOnFetch] = useState(false);

    const incorrectClick = () => {
        if (randomFetch === "advertisment") {
            fetch(
                getHost({
                    controller: "object",
                    action: "reject",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        } else if (randomFetch === "feedback") {
            fetch(
                getHost({
                    controller: "mark",
                    action: "reject",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        } else if (randomFetch === "order") {
            fetch(
                getHost({
                    controller: "order",
                    action: "reject",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        }
    };

    const correctClick = (field, type, category) => {
        if (field === "img") {
            setIsCorrectAdv({ ...isCorrectAdv, img: true });
        } else if (field === "descr") {
            setIsCorrectAdv({ ...isCorrectAdv, descr: true });
        } else if (field === "category") {
            const data = {
                type: type,
                category_id: category,
            };

            fetch(
                getHost({
                    controller: "object",
                    action: currentObj.id,
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
                    console.log(result);
                    if (result.success) {
                        setIsCorrectAdv({ ...isCorrectAdv, category: true });
                    }
                });
        } else if (field === "text") {
            setIsCorrectFeedback({ ...isCorrectFeedback, text: true });
        } else if (field === "avatar") {
            setIsCorrectAccount({ ...isCorrectAccount, avatar: true });
        } else if (field === "name") {
            setIsCorrectAccount({ ...isCorrectAccount, name: true });
        } else if (field === "orderAbout") {
            setIsCorrectOrder({ ...isCorrectOrder, about: true });
        } else if (field === "orderAddress") {
            setIsCorrectOrder({ ...isCorrectOrder, address: true });
        }
    };

    const onPublicObject = () => {
        if (randomFetch === "advertisment") {
            fetch(
                getHost({
                    controller: "object",
                    action: "approve",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        } else if (randomFetch === "feedback") {
            fetch(
                getHost({
                    controller: "mark",
                    action: "approve",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        } else if (randomFetch === "account") {
            fetch(
                getHost({
                    controller: "user",
                    action: "approve",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        } else if (randomFetch === "order") {
            fetch(
                getHost({
                    controller: "order",
                    action: "approve",
                    id: currentObj.id,
                }),
                {
                    method: "PATCH",
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
                        localStorage.removeItem("moderation");
                        setRerender((prev) => !prev);
                    }
                });
        }
    };

    useEffect(() => {
        setLoading(true);
        setCurrentObj({});

        const lastFetch = localStorage.getItem("moderation");
        setOnFetch((prev) => !prev);

        if (lastFetch) {
            setRandomFetch(lastFetch);
        } else {
            getRandomFetch();
        }
    }, [rerender]);

    function getRandomFetch() {
        const objects = ["advertisment", "feedback", "account", "order"];
        setRandomFetch(objects[Math.floor(Math.random() * objects.length)]);
    }

    useEffect(() => {
        setLoading(true);
        localStorage.setItem("moderation", randomFetch);

        if (randomFetch === "advertisment") {
            fetch(
                getHost({
                    controller: "object",
                    action: "for-moderation",
                    expand: "category, images",
                }),
                {
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
                    window.scrollTo(0, 0);
                    setIsCorrectAdv({ img: false, descr: false, category: false });
                    if (result.success) {
                        if (result.data.object === null) {
                            localStorage.removeItem("moderation");
                            setRerender((prev) => !prev);
                        } else {
                            setLoading(false);
                            setObjectsAmount(result.data.objectsAmount);
                            setCurrentObj(result.data.object);
                        }
                    } else if (result.status === 404) {
                        setLoading(false);
                        setObjectsAmount(0);
                        setCurrentObj({});
                    }
                });
        } else if (randomFetch === "feedback") {
            fetch(
                getHost({
                    controller: "mark",
                    action: "for-moderation",
                }),
                {
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
                    window.scrollTo(0, 0);
                    setIsCorrectFeedback({ text: false });
                    if (result.success) {
                        if (result.data.object === null) {
                            localStorage.removeItem("moderation");
                            setRerender((prev) => !prev);
                        } else {
                            setLoading(false);
                            setObjectsAmount(result.data.objectsAmount);
                            setCurrentObj(result.data.object);
                        }
                    } else if (result.status === 404) {
                        setLoading(false);
                        setObjectsAmount(0);
                        setCurrentObj({});
                    }
                });
        } else if (randomFetch === "account") {
            fetch(
                getHost({
                    controller: "user",
                    action: "for-moderation",
                }),
                {
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
                    window.scrollTo(0, 0);
                    setIsCorrectAccount({ avatar: false, name: false });
                    if (result.success) {
                        if (result.data.object === null) {
                            localStorage.removeItem("moderation");
                            setRerender((prev) => !prev);
                        } else {
                            setLoading(false);
                            setObjectsAmount(result.data.objectsAmount);
                            setCurrentObj(result.data.object);
                        }
                    } else if (result.status === 404) {
                        setLoading(false);
                        setObjectsAmount(0);
                        setCurrentObj({});
                    }
                });
        } else if (randomFetch === "order") {
            fetch(
                getHost({
                    controller: "order",
                    action: "for-moderation",
                }),
                {
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
                    window.scrollTo(0, 0);
                    setIsCorrectOrder({ about: false, address: false });
                    if (result.success) {
                        if (result.data.object === null) {
                            localStorage.removeItem("moderation");
                            setRerender((prev) => !prev);
                        } else {
                            setLoading(false);
                            setObjectsAmount(result.data.objectsAmount);
                            setCurrentObj(result.data.object);
                        }
                    } else if (result.status === 404) {
                        setLoading(false);
                        setObjectsAmount(0);
                        setCurrentObj({});
                    }
                });
        }
    }, [randomFetch, onFetch]);

    return (
        <ModeratorContext.Provider
            value={{
                objectsAmount,
                setRerender,
                currentObj,
                incorrectClick,
                correctClick,
                onPublicObject,
                isCorrectAdv,
                openMenu,
                setOpenMenu,
                loading,
                setIsCorrectAdv,
                isCorrectFeedback,
                isCorrectAccount,
                setIsCorrectAccount,
                randomFetch,
                isCorrectOrder,
                setIsCorrectOrder,
            }}>
            {props.children}
        </ModeratorContext.Provider>
    );
};

export default ModeratorContext;
