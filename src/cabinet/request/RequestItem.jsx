import "../cabinet.sass";
import { url } from "../../store/host-store";
import object from "../../assets/images/stubs/object-mob.png";
import RequestOrdersSvg from "./svg/RequestOrdersSvg";
import { useContext } from "react";
import DeviceContext from "../../store/device-context";
import CustomScrollbar from "../../UI/Scrollbar/CustomScrollbar";

const RequestItem = (props) => {
    const device = useContext(DeviceContext);
    return (
        <div className="scroll_if_needed scroll_if_needed_request">
            <div className="advers___title">Объявления:</div>
            <CustomScrollbar style={{paddingRight: "21px"}}>
            {props?.object.length > 0
                ? props?.object.map((item) => (
                      <div
                          key={item.id}
                          dataindex={item.id}
                          className={`cabinet_ads__item ${item.amountOfNewOrders < 1 && "empty"} ads_item_request ${
                              props.objectId === item.id ? "active" : ""
                          }`}
                          onClick={() => {
                              props.getObjectId(item.id);
                              if (device.isMobile) {
                                  props.setMobileVisibleCart(true);
                              }
                          }}>
                          {/*<div className="options">*/}
                          {/*    <button className="btn"><span></span><span></span><span></span></button>*/}
                          {/*    <div className="block">*/}
                          {/*        <a href="#" className="link">Редактировать</a>*/}
                          {/*        <a href="#" className="link">Деактивировать</a>*/}
                          {/*        <a href="#" className="link">Удалить</a>*/}
                          {/*    </div>*/}
                          {/*</div>*/}

                          <div className="img">
                              {item.image === null ? (
                                  <img src={object} alt="object" />
                              ) : (
                                  <img src={url + item.image.filename} alt="object" />
                              )}
                          </div>

                          <div className="radio_box">
                              <h3 className="title">{item.name}</h3>
                              <div className="radio_request__flex">
                                  <div className="radio">
                                      <h5>{item.price_1} ₽</h5>
                                      <span>{item.price_1_name}</span>
                                  </div>
                                  <div className="radio">
                                      <h5>{item.price_2} ₽</h5>
                                      <span>{item.price_2_name}</span>
                                  </div>
                              </div>
                          </div>
                          <div className="request_top_cart_right">
                              <div className="request_orders__item">
                                  <RequestOrdersSvg />
                                  <div className="timed_number">{item.amountOfNewOrders}</div>
                              </div>
                          </div>
                      </div>
                  ))
                : "Нет объявлений"}
            </CustomScrollbar>
        </div>
    );
};

export default RequestItem;
