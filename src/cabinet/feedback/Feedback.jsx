import FeedbackFilter from "./FeedbackFilter";
import FeedbackItems from "./FeedbackItems";
import {useEffect, useState} from "react";
import {link} from "../../store/host-store";
import {token} from "../../App";
import Loader from "../../components/loader/Loader";

const Feedback = props => {
    const [filterStatus, setFilterStatus] = useState(1);
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
        fetch(`${link}/mark/user-marks?type=${filterStatus}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data)
                if (res.success) {
                    setFeedbackArray(res.data)
                }else{
                    if(res.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
                setLoading(true)
            })
            .catch(error => {
                console.log(error)
            })
    }, [filterStatus])

    return(
        <>
            <div className="h2_cabinet_main">Отзывы</div>
            <div className="feedback__main">
                <div className="ads__top_block">
                    <div className="advers___title">Выберите раздел:</div>
                    <FeedbackFilter
                        setFilterStatus={setFilterStatus}
                        filterStatus={filterStatus}
                    />
                </div>

                <div className="feedback_bottom_block">
                    {loading ? <FeedbackItems feedbackArray={feedbackArray}/> : <Loader />}
                </div>
            </div>
        </>
    )
}

export default Feedback;