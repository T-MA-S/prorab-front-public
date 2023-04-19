import TermsList from "./TermsList";
import TermsItem from "./TermsItem";
import s from "./style.module.sass";

const DesktopTerms = ({ setCurrentBlock, setActivePage, currentBlock, data }) => {
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
                <TermsItem data={data} currentBlock={currentBlock} />
            </div>
        </div>
    );
};

export default DesktopTerms;
