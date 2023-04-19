import React, { useState } from "react";

const ApplicationMobile = React.createContext({
    handleAppPopup: () => {},
    isOpenAppPopup: false,
});

export const ApplicationMobileProvide = (props) => {
    const [isOpenAppPopup, setIsOpenAppPopup] = useState(false);

    const handleAppPopup = () => {
        setIsOpenAppPopup(!isOpenAppPopup);
    };

    return (
        <ApplicationMobile.Provider
            value={{
                handleAppPopup,
                isOpenAppPopup,
            }}>
            {props.children}
        </ApplicationMobile.Provider>
    );
};

export default ApplicationMobile;
