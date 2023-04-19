import "normalize.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React, { Suspense } from "react";
import AuthContext from "./store/auth-context";
import ModalsContext from "./store/modals-context";
import { ApplicationMobileProvide } from "./store/app-mobile-context";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Modal from "./UI/Modal/Modal";
import CabinetMainPage from "./cabinet/mainPage/CabinetMainPage";
import Admin from "./admin/Admin";
import MobileApp from "./UI/Modal/MobileApp";
import AdminLogin from "./components/login/AdminLogin.jsx/AdminLogin";
import getHost from "./store/host-store";
import ModeratorLayout from "./moderator/main/ModeratorLayout";
import { ModeratorContextProvide } from "./store/moderator-context";
import Loader from "./components/loader/Loader";
import UseLazy from "./store/hooks/useLazy";
import SearchPage from "./components/searching/SearchPage";

const AdministrantsInfo = UseLazy("simplePages/UsersInfo/AdministrantsInfo");
const CustomersInfo = UseLazy("simplePages/UsersInfo/CustomersInfo");
const MobileAppPage = UseLazy("simplePages/MobileAppPage");
const Agreement = UseLazy("simplePages/Agreement");
const UserTerm = UseLazy("simplePages/UserTerm");
const Contacts = UseLazy("components/contacts/Contacts");
const Partners = UseLazy("simplePages/partners/Partners");
const Privacy = UseLazy("simplePages/Privacy");
const Charity = UseLazy("simplePages/Charity");
const Rules = UseLazy("simplePages/Rules");
const About = UseLazy("components/about/About");
const Docs = UseLazy("simplePages/Docs");
const Blog = UseLazy("components/blog/Blog");
const FAQ = UseLazy("simplePages/FAQ/FAQ");
const MailConfirm = UseLazy("components/mailConfirm/MailConfirm");
const MainPage = UseLazy("components/index/MainPage");
const LoginMain = UseLazy("components/login/LoginMain");
const Article = UseLazy("components/blog/Article");
const ContractorProfile = UseLazy("components/catalog/ContractorProfile/ContractorProfile");
const PersonalData = UseLazy("simplePages/PersonalData");
const Catalog = UseLazy("components/catalog/Catalog");
const CartProduct = UseLazy("components/catalog/CartProduct/CartProduct");

export let token = "Bearer " + localStorage.getItem("token");
export let isAppstore = localStorage.getItem("app");

if (!isAppstore) {
    let buf = window.location.href.indexOf("?app=1") > -1 ? 1 : "";
    localStorage.setItem("app", buf);
    isAppstore = localStorage.getItem("app");
}

const App = () => {
    const [idProductPage, setIdProductPage] = useState([]);
    const [userData, setUserData] = useState({});
    const [category, setCategory] = useState([]);

    const ctx = useContext(AuthContext);
    const modal = useContext(ModalsContext);
    const onUserData = (data) => {
        setUserData(data);
    };

    const getIdPage = (data) => {
        setIdProductPage(data);
    };

    //зменить на модлератор
    const isModerator = ctx.userData?.account?.role === "moderator";
    const history = useNavigate();
    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
                filter: {
                    depth: 0,
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
                setCategory(result.data);
            });

        const storageNotEmpty = localStorage.getItem('token') !== null;
        if(storageNotEmpty && window.location.href.indexOf('login') > 1){
            history('/lc')
        }
    }, []);


    if (isModerator) {
        return (
            <ModeratorContextProvide>
                <Routes>
                    <Route path="/moderator" element={<ModeratorLayout />}></Route>
                </Routes>
            </ModeratorContextProvide>
        );
    } else {
        return (
            <div className={isAppstore && "copyBan"}>
                <Header />

                <Modal userData={userData} id={idProductPage} />
                <ApplicationMobileProvide>
                    <MobileApp />

                    <main
                        className={`main ${
                            modal.isCategories || modal.openModal === "searching" ? "fixedHeader" : ""
                        }`}>
                        <Routes>
                            <Route
                                path="/administrants-info"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <AdministrantsInfo />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/customers-info"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <CustomersInfo />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/application"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <MobileAppPage />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/agreement"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Agreement />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/userTerm"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <UserTerm />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/contacts"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Contacts />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/partners"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Partners />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/privacy"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Privacy />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/charity"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Charity />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/rules"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Rules />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/about"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <About />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/docs"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Docs />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/blog"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Blog />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/faq"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <FAQ />
                                    </Suspense>
                                }></Route>

                            <Route
                                path="/mail-confirm"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <MailConfirm />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <MainPage />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/login"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <LoginMain />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/article/:id"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Article />
                                    </Suspense>
                                }></Route>
                            <Route
                                path="/contractor/:id"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <ContractorProfile />
                                    </Suspense>
                                }></Route>

                            <Route
                                path="/personalData"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <PersonalData />
                                    </Suspense>
                                }></Route>
                            {category.map((item) => (
                                <Route
                                    key={item.id}
                                    path={`/catalog/${
                                        item.type === 0
                                            ? "spetsialnaya-tehnika"
                                            : item.type === 1
                                            ? "brigady"
                                            : "nedvizhimost"
                                    }`}
                                    element={
                                        <Suspense fallback={<Loader />}>
                                            <Catalog h1={item.title} types={item.type} />
                                        </Suspense>
                                    }></Route>
                            ))}
                            <Route
                                path="/cart/:id"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <CartProduct onUserData={onUserData} getIdPage={getIdPage} />
                                    </Suspense>
                                }
                            />
                            {/* Проверка на наличие токена и его действительность */}
                            {ctx.userData?.id && (
                                <>
                                    <Route path="/lc/*" element={<CabinetMainPage />}></Route>
                                    {ctx.userData?.account?.role === "admin" && (
                                        <Route path="/admin/*" element={<Admin />}></Route>
                                    )}
                                </>
                            )}
                            {/* аутентификация по логину и паролю */}
                            <Route path="/admin-login" element={<AdminLogin></AdminLogin>}></Route>
                            <Route path="/search/*" element={<SearchPage />}></Route>
                        </Routes>
                    </main>
                </ApplicationMobileProvide>
                {!isAppstore && <Footer />}
            </div>
        );
    }
};

export default App;
