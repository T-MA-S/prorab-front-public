import React, { useEffect, useState } from "react";

const DeviceContext = React.createContext({
    isMobile: false,
    openAside: true,
    scrollHorizontal: false,
    toggleAside: () => {},
});

export const DeviceContextProvide = (props) => {
    const [isMobile, setIsMobile] = useState(false); // в зависимости от устройства пользователя
    const [openAside, setOpenAside] = useState(true);
    const [scrollHorizontal, setScroll] = useState(false);

    const toggleAside = () => {
        if (isMobile) {
            setOpenAside(!openAside);
            if (openAside) {
                setOpenAside(false);
                document.body.classList.remove("noscroll");
            } else {
                setOpenAside(true);
                document.body.classList.add("noscroll");
            }
        }
    };

    //получаем размер экрана
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidthScreen(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        if (widthScreen >= 1024) {
            setIsMobile(false);
            setOpenAside(true);
        } else {
            setIsMobile(true);
            setOpenAside(false);
        }
        if (widthScreen >= 360) {
            setScroll(false);
        } else {
            setScroll(true);
        }
        return () => window.removeEventListener("resize", updateDimensions);
    }, [widthScreen]);

    return (
        <DeviceContext.Provider
            value={{
                isMobile,
                openAside,
                toggleAside,
                scrollHorizontal
            }}>
            {props.children}
        </DeviceContext.Provider>
    );
};

export default DeviceContext;
