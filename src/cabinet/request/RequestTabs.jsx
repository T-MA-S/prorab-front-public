import "../cabinet.sass";

const RequestTabs = (props) => {
    return (
        <div className="request_tabs_wrap">
            <div className="request_tabs">
                <div
                    className={`request_tab ${props.activeTab === "newRequests" ? "active" : ""}`}
                    onClick={() => props.setActiveTab("newRequests")}>
                    Новые заявки
                </div>
                <div
                    className={`request_tab ${props.activeTab === "confirmRequests" ? "active" : ""}`}
                    onClick={() => {
                        props.setCounterNewResponse(0);
                        props.setActiveTab("confirmRequests");
                    }}>
                    Вы откликнулись
                    {props.counterNewResponse > 0 && <span>+{props.counterNewResponse}</span>}
                </div>
            </div>
        </div>
    );
};

export default RequestTabs;
