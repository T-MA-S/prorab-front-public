import ResponseStatuses from "./ResponseStatuses";
import ResponseItem from "./ResponseItem";
import style from "./style.module.sass";

const ResponseCustomer = ({
    activeCustomerCount,
    archiveCustomerCount,
    getCustomerArchive,
    getResponses,
    responses,
    openSettings,
    setOpenSettings,
    setResponses,
    setRerender,
    setLoading,
    setStatus,
    status,
}) => {
    return (
        <>
            <ResponseStatuses
                status={status}
                setStatus={setStatus}
                activeCount={activeCustomerCount}
                archiveCount={archiveCustomerCount}
                getArchive={getCustomerArchive}
                getResponses={getResponses}
                setResponses={setResponses}
                setLoading={setLoading}
            />

            <div className={style.response__list}>
                {responses.length > 0 ? (
                    <ResponseItem
                        status={status}
                        responses={responses}
                        openSettings={openSettings}
                        setOpenSettings={setOpenSettings}
                        setRerender={setRerender}
                    />
                ) : (
                    "Нет объявлений"
                )}
            </div>
        </>
    );
};

export default ResponseCustomer;
