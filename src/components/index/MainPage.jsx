import SpecialEquipment from "./specialEquip/specialEquipment";
import Application from "./application/Application";
import Advantages from "./advantages/Advantages";
import Brigades from "./brigades/Brigades";
import { isAppstore } from "../../App";
import Realty from "./realty/Realty";
import Supply from "./supply/Supply";
import Hero from "./hero/Hero";
import { useEffect } from "react";

function MainPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <Brigades />
            <SpecialEquipment />
            <Realty />
            <Advantages />
            {!isAppstore && (
                <>
                    {/* <Supply /> */}
                    <Application />
                </>
            )}
        </>
    );
}

export default MainPage;
