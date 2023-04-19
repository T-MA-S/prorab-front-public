import '../../cabinet.sass'
import TypeList from "../desktopPages/TypeList";
import CreateAdsForm from "./CreateAdsForm";
import ArrowBack from "../../request/svg/ArrowBack";

const CreateAds = ({ onTypeChange, onBack, type, category, setActiveToggle }) => {

    const closeMiniModal = async () => {
        await setActiveToggle(false);
        await onBack("MainPage");
    }

    return (
        <>
            <div className="flex">
                <div onClick={() => onBack("MainPage")}>
                    <ArrowBack />
                </div>
            <h2 className="h2_cabinet_main">Разместить объявление</h2>
            </div>
        <div className="create_ads cabinet_ads__left">
                {/*<div className="create_ads__back" onClick={closeMiniModal}>*/}
                {/*    <ArrowLeftIcon />*/}
                {/*</div>*/}
            <div className="advers__add_top">
                <div className="advers___title">Выберите категорию объявления:</div>
                <TypeList category={category} type={type} onTypeChange={onTypeChange} />
            </div>
            <CreateAdsForm onSuccess={onBack} type={type} onBack={onBack}/>
        </div>
        </>
    )
}

export default CreateAds;