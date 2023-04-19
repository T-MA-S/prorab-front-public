import {useContext, useEffect, useState} from "react";
import {link} from "../../store/host-store";
import {token} from "../../App";
import AuthContext from "../../store/auth-context";
import {statusAction} from "../../store/redux";
import {useDispatch, useSelector} from "react-redux";
import CustomScrollbar, {CustomScrollbarHorizontal} from "../../UI/Scrollbar/CustomScrollbar";

const FilterStatus = props => {
    const ctx = useContext(AuthContext);
    const [numberOfActivity, setNumberOfActivity] = useState('')

    const dispatch = useDispatch();
    const status = useSelector(state => state.status);

    const changeStatus = (status) => {
        dispatch(statusAction.toggleStatus(status));
    }

    useEffect(() => {
        fetch(`${link}/category/object-status-list-by-type?type=${props.type}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success){
                    setNumberOfActivity(res.data)
                    console.log(res.data)
                }else{
                    if(res.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
        }).catch(error => {
            console.log(error)
        })
    }, [props.type, ctx.rerender, status.rerender])

    return(
        <div className="advers_top_flex_left">
            <div dataindex={1} className={`advers_filter_block advers_filter__active ${+status.status === 1 ? "active" : ""}`}
            onClick={(e) => changeStatus(e.target.getAttribute("dataindex"))}>
                Активные (
                {numberOfActivity[0]?.amountOfActive}
                )
            </div>
            <div dataindex={2} className={`advers_filter_block advers_filter__moder ${+status.status === 2 ? "active" : ""}`}
                 onClick={(e) => changeStatus(e.target.getAttribute("dataindex"))}>
                Модерация (
                {numberOfActivity[0]?.amountOfModerated}
                )
            </div>
            <div dataindex={3} className={`advers_filter_block advers_filter__stoped  ${+status.status === 3 ? "active" : ""}`}
                 onClick={(e) => changeStatus(e.target.getAttribute("dataindex"))}>
                Остановленные (
                {numberOfActivity[0]?.amountOfStopped}
                )
            </div>
            {/*<div className="advers_filter_block advers_filter__chernovick">*/}
            {/*    Черновик <span>(0)</span>*/}
            {/*</div>*/}
        </div>
    )
}

export default FilterStatus;