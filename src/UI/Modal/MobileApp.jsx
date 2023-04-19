import "./Modal.sass";
import google from "../../assets/images/popup1.png";
import apple from "../../assets/images/popup2.png";
import gallery from "../../assets/images/popup3.png";
import qrApple from "../../assets/images/qr-apple.svg";
import qrGoogle from "../../assets/images/qr-google.svg";
import qrHuawei from "../../assets/images/qr-huawei.svg";

import { useContext, useState } from "react";
import ApplicationMobile from "../../store/app-mobile-context";

const MobileApp = (props) => {
    const ctx = useContext(ApplicationMobile);
    const [getData, setData] = useState(1);
    const [text, setText] = useState("Google Play");

    return (
        <>
            {ctx.isOpenAppPopup && (
                <div className="modal_mobile__app">
                    <div className="modal_overlay" onClick={ctx.handleAppPopup}></div>

                    <div className="modal_container">
                        <div className="modal__title">Отсканируйте QR-код</div>
                        <div className="modal____close" onClick={ctx.handleAppPopup}>
                            <svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" fill="none">
                                    <g fill="#fff" clipPath="url(#a)">
                                        <path d="M17.678 17.678c-9.748 9.748-9.748 25.607 0 35.355 9.748 9.748 25.607 9.748 35.355 0 9.748-9.748 9.747-25.609 0-35.355-9.747-9.747-25.607-9.748-35.355 0Zm32.616 32.616c-8.236 8.237-21.64 8.238-29.878 0-8.238-8.237-8.236-21.641 0-29.878 8.237-8.236 21.64-8.238 29.878 0s8.238 21.64 0 29.878Z" />
                                        <path d="m40.709 27.016-5.477 5.477-5.477-5.477a1.936 1.936 0 1 0-2.74 2.739l5.478 5.477-5.477 5.477a1.936 1.936 0 1 0 2.739 2.739l5.477-5.477 5.477 5.477a1.936 1.936 0 1 0 2.739-2.739l-5.478-5.477 5.478-5.477a1.936 1.936 0 1 0-2.74-2.739Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M0 35.355 35.355 0l35.356 35.355-35.356 35.356z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </svg>
                        </div>

                        <div className="mobile_platforms">
                            <div
                                className={`mobile_platform ${text === "Google Play" ? "active" : ""}`}
                                onClick={() => setText("Google Play")}>
                                <img src={google} alt="" />
                                <span>Google Play</span>
                            </div>
                            <div
                                className={`mobile_platform ${text === "App Store" ? "active" : ""}`}
                                onClick={() => setText("App Store")}>
                                <img src={apple} alt="" />
                                <span>App Store</span>
                            </div>
                            <div
                                className={`mobile_platform ${text === "AppGallery" ? "active" : ""}`}
                                onClick={() => setText("AppGallery")}>
                                <img src={gallery} alt="" />
                                <span>AppGallery</span>
                            </div>
                        </div>

                        <div className="mobile_qr">
                            <div className="mobile_main_qr">
                                <div className="mobile_qr_name">{text}</div>
                                <div className="mobile_qr_image">
                                    {text === "App Store" && <img src={qrApple} alt="" />}
                                    {text === "Google Play" && <img src={qrGoogle} alt="" />}
                                    {text === "AppGallery" && <img src={qrHuawei} alt="" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileApp;
