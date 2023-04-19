import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import TermsList from "./TermsList";
import TermsItem from "./TermsItem";
import s from "./style.module.sass";

const MobileTerms = ({ setCurrentBlock, setActivePage, currentBlock, activePage, data }) => {
    if (activePage === "List") {
        return (
            <div className="cabinet__redesign_container">
                <h3 className="cabinet__redesign_title">Условия использования</h3>
                <div className={s.terms__blocks_wrapper}>
                    <TermsList
                        data={data}
                        setActivePage={setActivePage}
                        currentBlock={currentBlock}
                        setCurrentBlock={setCurrentBlock}
                    />
                </div>
            </div>
        );
    }
    if (activePage === "Item") {
        return (
            <div className="cabinet__redesign_container">
                <div className="back-arrow" onClick={() => setActivePage("List")}>
                    <div className="back-arrow-wrapper">
                        <ArrowLeftIcon />
                    </div>
                    <h3 className="cabinet__redesign_title">Условия использования</h3>
                </div>
                <TermsItem data={data} currentBlock={currentBlock} />
            </div>
        );
    }
};

export default MobileTerms;
