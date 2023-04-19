import { useContext, useState } from "react";

import CustomScrollbar from "../../UI/Scrollbar/CustomScrollbar";
import AuthContext from "../../store/auth-context";
import ConfirmedRequests from "./ConfirmedRequests";
import NewResponseCart from "./NewResponseCart";
import { link } from "../../store/host-store";
import getHost from "../../store/host-store";
import RequestCart from "./RequestCart";
import RequestTabs from "./RequestTabs";
import { token } from "../../App";
import "../cabinet.sass";
import {CSSTransition} from "react-transition-group";

const RequestsList = (props) => {
    const [orderId, setOrderId] = useState(0);
    const ctx = useContext(AuthContext);

    const [newResponses, setNewResponses] = useState([]);

    window.pay = function () {
        let widget = new window.cp.CloudPayments();
        widget.pay(
            "auth",
            {
                publicId: "pk_61bbbbd0ab78b66836bd8e3d87b89",
                description: "Оплата отклика в foreman-go.ru",
                amount: 120,
                currency: "RUB",
                invoiceId: "order_" + orderId,
            },
            {
                onSuccess: function (options) {
                    // здесь надо отправить PUT запрос на 'order/confirm?id=' + orderId
                    fetch(
                        getHost({
                            controller: "order",
                            action: "confirm",
                            id: orderId,
                            expand: "user",
                        }),
                        {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                Authorization: token,
                            },
                        }
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                            let newNum = props.counterNewResponse;
                            newNum += 1;
                            props.setCounterNewResponse(newNum);
                            setNewResponses([...newResponses, orderId]);
                        });
                },
                onFail: function (reason, options) {
                    console.log("onFail");
                },
                onComplete: function (paymentResult, options) {
                    ctx.setRerender((prev) => !prev);
                    console.log("onComplete");
                },
            }
        );
    };

    let heightScroll = props.mobileVisibleCart ? 570 : 510;

    const newRequests = props.requestCart.filter((item) => item.confirmed !== 1);
    const confirmRequests = props.requestCart.filter((item) => item.confirmed === 1);

    const dropRequest = (id) => {
        fetch(`${link}/order/reject?id=${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if(result.success){
                    console.log(result)
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
                ctx.setRerender((prev) => !prev);
            }).catch(error => error);
    };

    async function responseCart(id) {
        await setOrderId(id);
        await window.pay();
    }

    return (
        <div className="wrap">
            <RequestTabs
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
                counterNewResponse={props.counterNewResponse}
                setCounterNewResponse={props.setCounterNewResponse}
                counter={props.counter}
            />
            <div className="request_cart__scroll">
                <CustomScrollbar style={{ height: heightScroll }}>
                    {props.activeTab === "newRequests"
                        ? //новые заявки
                          newRequests.map((item) =>
                              //вид карточки при оплате заявки
                              newResponses.find((el) => el === item.id) ? (
                                  <NewResponseCart key={item.id} item={item} />
                              ) : (
                                  <RequestCart
                                      key={item.id}
                                      dropRequest={dropRequest}
                                      responseCart={responseCart}
                                      item={item}
                                  />
                              )
                          )
                        : //вы откликнулись
                          confirmRequests.map((item) => <ConfirmedRequests key={item.id} item={item} />)}
                </CustomScrollbar>
            </div>
        </div>
    );
};

export default RequestsList;
