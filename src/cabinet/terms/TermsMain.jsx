import PersonalData from "../../simplePages/PersonalData";
import Agreement from "../../simplePages/Agreement";
import AuthContext from "../../store/auth-context";
import UserTerm from "../../simplePages/UserTerm";
import Privacy from "../../simplePages/Privacy";
import { useContext, useEffect, useState } from "react";
import Rules from "../../simplePages/Rules";
import DesktopTerms from "./DesktopTerms";
import MobileTerms from "./MobileTerms";
import DeviceContext from "../../store/device-context";

const data = [
    { title: "Правила политики обработки персональных данных", content: <Agreement /> },
    { title: "Согласие на обработку персональных данных", content: <PersonalData /> },
    { title: "Пользовательское соглашение", content: <UserTerm /> },
    { title: "Политика конфиденциальности", content: <Privacy /> },
    { title: "Правила сервиса", content: <Rules /> },
];

const TermsMain = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const device = useContext(DeviceContext);

    const [activePage, setActivePage] = useState("List");
    const [currentBlock, setCurrentBlock] = useState("Правила политики обработки персональных данных");

    return device.isMobile ? (
        <MobileTerms
            setCurrentBlock={setCurrentBlock}
            setActivePage={setActivePage}
            activePage={activePage}
            currentBlock={currentBlock}
            data={data}
        />
    ) : (
        <DesktopTerms
            setCurrentBlock={setCurrentBlock}
            setActivePage={setActivePage}
            currentBlock={currentBlock}
            activePage={activePage}
            data={data}
        />
    );
};

export default TermsMain;
