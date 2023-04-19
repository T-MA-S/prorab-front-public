import { useContext } from "react";

import ModeratorContext from "../../store/moderator-context";
import MobileMenu from "./MobileMenu";
import { Logo } from "./Logo";

const HeaderMobile = () => {
    const ctx = useContext(ModeratorContext);

    return (
        <>
            {ctx.openMenu && <MobileMenu />}
            <Logo />
            {ctx.openMenu ? (
                <div
                    className="header_mobile_close"
                    onClick={() => {
                        document.body.classList.remove("noscroll");
                        ctx.setOpenMenu(false);
                    }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM22.704 20.4C23.002 20.6998 23.1693 21.1053 23.1693 21.528C23.1693 21.9507 23.002 22.3562 22.704 22.656C22.4086 22.9575 22.006 23.13 21.584 23.136C21.3723 23.1351 21.1629 23.0922 20.9679 23.0098C20.7729 22.9275 20.5962 22.8072 20.448 22.656L16 18.256L11.552 22.704C11.4038 22.8552 11.2271 22.9755 11.0321 23.0578C10.8371 23.1402 10.6277 23.1831 10.416 23.184C9.99397 23.178 9.59141 23.0055 9.296 22.704C8.998 22.4042 8.83073 21.9987 8.83073 21.576C8.83073 21.1533 8.998 20.7478 9.296 20.448L13.744 16L9.296 11.552C9.03388 11.2459 8.89691 10.8522 8.91246 10.4495C8.92802 10.0468 9.09495 9.66485 9.3799 9.3799C9.66485 9.09495 10.0468 8.92802 10.4495 8.91246C10.8522 8.89691 11.2459 9.03388 11.552 9.296L16 13.744L20.448 9.296C20.7541 9.03388 21.1478 8.89691 21.5505 8.91246C21.9532 8.92802 22.3352 9.09495 22.6201 9.3799C22.9051 9.66485 23.072 10.0468 23.0875 10.4495C23.1031 10.8522 22.9661 11.2459 22.704 11.552L18.256 16L22.704 20.4Z"
                            fill="#6FE1B8"
                        />
                    </svg>
                </div>
            ) : (
                <button
                    className="header__burger"
                    onClick={() => {
                        document.body.classList.add("noscroll");
                        ctx.setOpenMenu(true);
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            )}
        </>
    );
};

export default HeaderMobile;
