import { useContext } from "react";

import ModalsContext from "../../../store/modals-context";
import AuthContext from "../../../store/auth-context";
import TypeList from "../desktopPages/TypeList";
import AdsItems from "../desktopPages/AdsItems";

const MainPage = ({ category, onPageChange, type, onTypeChange, onIdItemChange }) => {
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);

    const nextStep = () => {
        // повторно дергаем бэк для получения актуального статуса прав
        ctx.setRefreshData((prev) => !prev);
        // пользователь с неподтвержденной почтой не может размещать объявления
        if (ctx.userData.mail_confirmed) {
            onPageChange("ChooseTypePage");
        } else {
            modal.unconfirm();
        }
    };

    return (
        <div className="cabinet_ads__left">
            <button className="btn_save" onClick={nextStep}>
                Создать
            </button>
            <h6>Мои объявления</h6>

            <TypeList category={category} type={type} onTypeChange={onTypeChange} />
            <AdsItems type={type} getIdItem={onIdItemChange} />
        </div>
    );
};

export default MainPage;
