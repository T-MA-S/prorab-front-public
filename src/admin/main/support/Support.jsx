import { useContext, useState } from "react";

import DeviceContext from "../../../store/device-context";
import DesktopSupport from "./DesktopSupport";
import MobileSupport from "./MobileSupport";

const Support = () => {
    const [dialogId, setDialogId] = useState(null);
    const [userData, setUserData] = useState([]);

    const device = useContext(DeviceContext);

    return (
        <div className="admin__layout">
            {device.isMobile ? (
                <MobileSupport
                    dialogId={dialogId}
                    setDialogId={setDialogId}
                    userData={userData}
                    setUserData={setUserData}
                />
            ) : (
                <DesktopSupport
                    dialogId={dialogId}
                    setDialogId={setDialogId}
                    userData={userData}
                    setUserData={setUserData}
                />
            )}
        </div>
    );
};

export default Support;
