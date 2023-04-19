const FeedbackFilter = props => {
    console.log(props.filterStatus)
    return(
        <div className="filter_feedback__status">
            <div className={`feedback_block ${props.filterStatus === 1 ? "active" : ""}`} onClick={() => props.setFilterStatus(1)}>Клиенты о Вас</div>
            <div className={`feedback_block ${props.filterStatus === 0 ? "active" : ""}`} onClick={() => props.setFilterStatus(0)}>Ваши отзывы</div>
        </div>
    )
}

export default FeedbackFilter;