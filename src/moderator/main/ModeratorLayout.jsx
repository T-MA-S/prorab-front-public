import { useContext, useEffect } from "react";

import ModeratorContext from "../../store/moderator-context";
import DeviceContext from "../../store/device-context";
import Footer from "../../components/footer/Footer";
import { isAppstore } from "../../App";
import DesktopPage from "./DesktopPage";
import Header from "../header/Header";
import MobilePage from "./MobilePage";

const ModeratorLayout = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ctx = useContext(ModeratorContext);
    const device = useContext(DeviceContext);

    return (
        <div className={`${isAppstore ? "copyBan" : ""}`}>
            <Header />

            <main className="main">{device.isMobile ? <MobilePage /> : <DesktopPage />}</main>

            <Footer />
        </div>
    );
};

export default ModeratorLayout;
