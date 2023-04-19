import style from "./style.module.sass";

const ResponseTabs = ({ setActiveTab, setObjectId, activeTab, getObjects, setStatus, setLoading }) => {
    return (
        <div className={style.response__mode}>
            <h6 className="cabinet__redesign_subtitle">Режим аккаунта:</h6>
            <div className={style.tabs_wrapper}>
                <button
                    onClick={() => {
                        setLoading(true);
                        setActiveTab("customer");
                        setObjectId(0);
                        setStatus(0);
                    }}
                    className={`${style.tab} ${activeTab === "customer" ? style.active : ""}`}
                    id="btn1">
                    Я заказчик
                </button>
                <button
                    onClick={() => {
                        setLoading(true);
                        getObjects();
                        setActiveTab("contractor");
                    }}
                    className={`${style.tab} ${activeTab === "contractor" ? style.active : ""}`}
                    id="btn2">
                    Я исполнитель
                </button>
            </div>
        </div>
    );
};

export default ResponseTabs;
