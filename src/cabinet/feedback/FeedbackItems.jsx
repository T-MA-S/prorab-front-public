import StarActiveSvg from "./svg/StarActiveSvg";
import StarSvg from "./svg/StarSvg";
import avatar from '../../assets/images/stubs/avatar.svg'
import {url} from '../../store/host-store'
import moment from "moment";


const FeedbackItems = props => {
    return(
        <div className="feedback__list">
            {props.feedbackArray.map(item =>
            <div className="feedback_item">
                <div className="feedback__top_flex">
                    <div className="feedback__img">
                        {item.avatar ? <img src={url + item.avatar} alt="avatar"/>
                            :
                            <img src={avatar} alt="avatar"/>
                        }
                    </div>
                    <div className="feedback__info">
                        <div className="feedback_name">{item.name}</div>
                        <div className="feedback_date">{moment(item.date).format("DD.MM.YYYY")}</div>
                    </div>
                </div>
                <div className="feedback_stars">
                    {
                        [...Array(+item.mark)].map(() => {
                            return <StarActiveSvg />
                        })
                    }
                    {
                        [...Array(5 - item.mark)].map(() => {
                            return <StarSvg />
                        })
                    }
                </div>
                <div className="feedback_text">
                    <p>{item.comment}</p>
                </div>
            </div>
            )}
        </div>
    )
}

export default FeedbackItems;