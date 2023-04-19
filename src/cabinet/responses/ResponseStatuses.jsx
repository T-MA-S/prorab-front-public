import style from "./style.module.sass";

const ResponseStatuses = ({
    status,
    setStatus,
    getArchive,
    archiveCount,
    activeCount,
    getResponses,
    setResponses,
    setLoading,
}) => {
    return (
        <div className={style.response__statuses}>
            <h6 className="cabinet__redesign_subtitle">Статус откликов:</h6>
            <div className={style.response__statuses_wrapper}>
                <p
                    className={`${style.item} ${status === 0 ? style.active : ""}`}
                    onClick={() => {
                        setLoading(true);
                        setResponses([]);
                        setStatus(0);
                        getResponses();
                    }}>
                    Активные ({activeCount})
                </p>
                <p
                    className={`${style.item} ${status === 1 ? style.active : ""}`}
                    onClick={() => {
                        setLoading(true);
                        setResponses([]);
                        setStatus(1);
                        getArchive();
                    }}>
                    Архив ({archiveCount})
                </p>
            </div>
        </div>
    );
};

export default ResponseStatuses;
