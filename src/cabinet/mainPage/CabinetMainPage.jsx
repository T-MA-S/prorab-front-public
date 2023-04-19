import "../cabinet.sass";
import CabinetAside from "./CabinetAside";
import CabinetInfo from "../cabinetInfo/CabinetInfo";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { token } from "../../App";
import AdsMainPage from "../advertisement/AdsMainPage";
import Notifications from "../notifications/Notifications";
import FavoritesAds from "../favorites/Favorites";
import Support from "../support/Support";
import TermsMain from "../terms/TermsMain";
import Request from "../request/Request";
import ResponseMain from "../responses/ResponseMain";
import DeviceContext from "../../store/device-context";
import getHost from "../../store/host-store";
import Feedback from "../feedback/Feedback";

const CabinetMainPage = () => {
    const [dataUser, setDataUser] = useState({});
    const [render, setRender] = useState(false);
    const device = useContext(DeviceContext);

    const getRerender = () => {
        setRender((rerun) => !rerun);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
                action: "identity",
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
                if (result.success){
                    setDataUser(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            })
            .catch(error => {
            console.log(error)
        });
    }, [render]);

    return (
        <section className="container">
            <div className="cabinet__box">
                {device.openAside && <CabinetAside data={dataUser} />}
                <div className="cabinet__content">
                    {device.isMobile && (
                        <button className="open-admin-menu" onClick={device.toggleAside}>
                            <div className="line">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            Меню
                        </button>
                    )}

                    <Routes>
                        <Route path="/" element={<CabinetInfo getRerender={getRerender} data={dataUser} />}></Route>
                        <Route path="/advertisement/*" element={<AdsMainPage />}></Route>
                        <Route path="/request" element={<Request />}></Route>
                        <Route path="/responses" element={<ResponseMain />}></Route>
                        <Route path="/notifications" element={<Notifications />}></Route>
                        <Route path="/support" element={<Support />}></Route>
                        <Route path="/favorites" element={<FavoritesAds />}></Route>
                        <Route path="/feedback" element={<Feedback />}> </Route>
                        <Route path="/term" element={<TermsMain />}></Route>
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default CabinetMainPage;
