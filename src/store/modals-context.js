import React, { useState } from "react";

const ModalsContext = React.createContext({
    openModal: "",
    isModal: false,
    openMobMenu: false,
    isCategories: false,
    unconfirm: () => {},
    closeModal: () => {},
    videoModal: () => {},
    toggleMenu: () => {},
    requestModal: () => {},
    contactsModal: () => {},
    isOrderedModal: () => {},
    setOpenMobMenu: () => {},
    calendarModal: () => {},
    toggleCategories: () => {},
    deleteProfileModal: () => {},
    paymentModal: () => {},
});

export const ModalsContextProvide = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [openModal, setOpenModal] = useState("");
    const [openMobMenu, setOpenMobMenu] = useState(false);
    const [isCategories, setIsCategories] = useState(false);

    const toggleMenu = () => {
        if (isCategories) {
            toggleCategories();
        }
        if (openMobMenu) {
            setOpenMobMenu(false);
        } else {
            setOpenMobMenu(true);
        }
    };

    const toggleCategories = () => {
        if (isCategories) {
            setIsModal(false);
            setIsCategories(false);
            document.body.classList.remove("noscroll");
        } else {
            setOpenModal("");
            setIsModal(true);
            setIsCategories(true);
            document.body.classList.add("noscroll");
        }
    };

    const contactsModal = () => {
        setIsModal(true);
        setOpenModal("contacts");
    };

    const paymentModal = () => {
        setIsModal(true);
        setOpenModal("payment");
    }

    const closeModal = () => {
        setIsModal(false);
        setOpenModal("");
        if (isCategories) {
            document.body.classList.remove("noscroll");
            setIsCategories(false);
        }
    };

    const requestModal = () => {
        setIsModal(true);
        setOpenModal("request");
    };

    const unconfirm = () => {
        setIsModal(true);
        setOpenModal("unconfirm");
    };

    const videoModal = () => {
        setIsModal(true);
        setOpenModal("youtube");
    };

    const isOrderedModal = () => {
        setIsModal(true);
        setOpenModal("ordered");
    };

    const deleteProfileModal = () => {
        setIsModal(true);
        setOpenModal("deleteProfile");
    };

    const searchingModal = () => {
        setIsCategories(false);
        setIsModal(true);
        setOpenModal("searching");
    };

    const unauthModal = () => {
        setIsModal(true);
        setOpenModal("unauth");
    };

    const calendarModal = () => {
        setIsModal(true);
        setOpenModal("calendar");
    };

    //создание новой категории блога
    const adminBlogNewCategory = () => {
        setIsModal(true);
        setOpenModal("blog-new-category");
    };

    //проверка на удаление категории блога
    const [delBlogCategory, setDelBlogCategory] = useState({ id: -1, titile: "" });
    const adminBlogDeleteCategory = (id, title) => {
        setDelBlogCategory({ id, title });
        setIsModal(true);
        setOpenModal("blog-delete-category");
    };

    const [feedbackId, setFeedbackId] = useState(-1);
    const feedbackModal = (id) => {
        setFeedbackId(id);
        setIsModal(true);
        setOpenModal("feedback");
    };

    return (
        <ModalsContext.Provider
            value={{
                isModal,
                openModal,
                unconfirm,
                closeModal,
                toggleMenu,
                videoModal,
                unauthModal,
                openMobMenu,
                isCategories,
                requestModal,
                calendarModal,
                feedbackId,
                feedbackModal,
                searchingModal,
                contactsModal,
                isOrderedModal,
                paymentModal,
                setOpenMobMenu,
                toggleCategories,
                deleteProfileModal,
                adminBlogNewCategory,
                delBlogCategory,
                adminBlogDeleteCategory,
            }}>
            {props.children}
        </ModalsContext.Provider>
    );
};

export default ModalsContext;
