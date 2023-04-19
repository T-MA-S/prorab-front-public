import { useContext } from "react";
import moment from "moment";

import RequestRatingStarSvg from "../request/svg/RequestRatingStarSvg";
import { WhiteStarIcon } from "../../components/icons/WhiteStarIcon";
import RequestCalendarSvg from "../request/svg/RequestCalendarSvg";
import RequestAddressSvg from "../request/svg/RequestAddressSvg";
import CustomScrollbar from "../../UI/Scrollbar/CustomScrollbar";
import { BucketIcon } from "../../components/icons/BucketIcon";
import RequestOrdersSvg from "../request/svg/RequestOrdersSvg";
import object from "../../assets/images/stubs/object-mob.png";
import { ClockIcon } from "../../components/icons/ClockIcon";
import RequestRubleSvg from "../request/svg/RequestRubleSvg";
import avatar from "../../assets/images/stubs/avatar.svg";
import telegram from "../../assets/images/telegram.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import DeviceContext from "../../store/device-context";
import ModalsContext from "../../store/modals-context";
import getHost, { url } from "../../store/host-store";
import viber from "../../assets/images/viber.svg";
import style from "./style.module.sass";
import { token } from "../../App";
import AuthContext from "../../store/auth-context";

const ResponseContractor = ({
    objects,
    objectId,
    setResponseTab,
    activeContractorCount,
    getContractorArchive,
    archiveContractorCount,
    responseTab,
    requests,
    setObjectId,
    setRequestArchive,
    activeCard,
    requestsArchive,
    mobileVisibleCart,
    setMobileVisibleCart,
    setActiveContractorCount,
    setRerender,
    setArchiveContractorCount,
}) => {
    let heightScroll = mobileVisibleCart ? 570 : 510;
    const device = useContext(DeviceContext);
    const modal = useContext(ModalsContext);
    const ctx = useContext(AuthContext);

    const onDeleteResponse = (id) => {
        fetch(
            getHost({
                controller: "order",
                action: "add-deleted",
                id,
            }),
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setRerender((prev) => !prev);
                    ctx.setRerender((prev) => !prev);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    };

    return (
        <div className={style.response__list_contractor}>
            <div className={style.response__objects}>
                <h6 className="cabinet__redesign_subtitle">Объявления:</h6>

                {objects.length > 0
                    ? objects.map((item) => {
                          return (
                              <div
                                  onClick={() => {
                                      setObjectId(item.id);
                                      objectId !== item.id &&
                                          setActiveContractorCount(0) &&
                                          setArchiveContractorCount(0);
                                      setRequestArchive([]);
                                      setResponseTab(0);
                                      if (device.isMobile) {
                                          setMobileVisibleCart(true);
                                      }
                                  }}
                                  className={`${style.cart} ${objectId === item.id && style.active} ${
                                      item.amountOfConfirmedOrders < 1 ? style.empty : ""
                                  }`}
                                  key={item.id}>
                                  {item.image === null ? (
                                      <img className={style.obj_img} src={object} alt="object" />
                                  ) : (
                                      <img className={style.obj_img} src={url + item.image.filename} alt="object" />
                                  )}

                                  <div className={style.text}>
                                      <h3>{item.name}</h3>
                                      <div className={style.prices}>
                                          <div>
                                              <h5>{item.price_1} ₽</h5>
                                              <span>{item.price_1_name}</span>
                                          </div>
                                          <div>
                                              <h5>{item.price_2} ₽</h5>
                                              <span>{item.price_2_name}</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className={style.counter}>
                                      <RequestOrdersSvg />
                                      <div className={style.count}>{item.amountOfConfirmedOrders}</div>
                                  </div>
                              </div>
                          );
                      })
                    : "Нет объявлений"}
            </div>
            {objectId !== 0 && (
                <div className={`${style.response__order} ${mobileVisibleCart && style.visible}`}>
                    <div className={style.response__order_tabs}>
                        <p
                            className={`${style.response__order_tab} ${responseTab === 0 ? style.active : ""}`}
                            onClick={() => {
                                setResponseTab(0);
                            }}>
                            Активные ({activeContractorCount})
                        </p>
                        <p
                            className={`${style.response__order_tab} ${responseTab === 1 ? style.active : ""}`}
                            onClick={() => {
                                setResponseTab(1);
                                getContractorArchive();
                            }}>
                            Архив ({archiveContractorCount})
                        </p>
                    </div>
                    <CustomScrollbar style={{ height: heightScroll }} renderTrack={renderTrack}>
                        {/* мапятся активные заявки */}
                        <div style={{ padding: "0 20px" }}>
                            {responseTab === 0
                                ? requests.map((item) => {
                                      return (
                                          <div
                                              key={item.id}
                                              className={`${style.response__order_cart} ${
                                                  activeCard === item.id && style.active
                                              }`}>
                                              <div className={style.response__order_cart_top}>
                                                  <div className={style.response__order_cart_wrap}>
                                                      {item.user.avatar === null ? (
                                                          <img src={avatar} alt="" />
                                                      ) : (
                                                          <img src={url + item.user.avatar} alt="" />
                                                      )}

                                                      <div>
                                                          <p className={style.response__order_cart_name}>
                                                              {item.user.name}
                                                          </p>
                                                          <div>
                                                              <div className={style.response__order_cart_id}>
                                                                  ID 5658264
                                                              </div>
                                                              {item.user.mark === null ? (
                                                                  <div>
                                                                      <span>Нет рейтинга</span>
                                                                      <RequestRatingStarSvg />
                                                                      <span
                                                                          className={style.response__order_cart_rating}>
                                                                          {item?.user?.mark}
                                                                      </span>
                                                                  </div>
                                                              ) : (
                                                                  <div>
                                                                      <span>Рейтинг</span>
                                                                      <RequestRatingStarSvg />
                                                                      <span
                                                                          className={style.response__order_cart_rating}>
                                                                          {item?.user?.mark}
                                                                      </span>
                                                                  </div>
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className={style.response__order_cart_data}>
                                                      <div>№525454</div>
                                                      <div>{moment(item.created).format("DD.MM.YYYY")}</div>
                                                      <div>{moment(item.created).format("HH:mm")}</div>
                                                  </div>
                                              </div>

                                              <div>
                                                  <div className={style.response__order_data}>
                                                      <div className={style.response__order_data_date}>
                                                          <span>
                                                              <RequestCalendarSvg />
                                                              Дата работы
                                                          </span>

                                                          <p>
                                                              {moment(item.date_from).format("DD.MM.YYYY")} -
                                                              {moment(item.date_from)
                                                                  .add(item.duration, "days")
                                                                  .format("DD.MM.YYYY")}
                                                          </p>
                                                      </div>

                                                      <div className={style.response__order_data_time}>
                                                          <span>
                                                              <ClockIcon />
                                                              Время
                                                          </span>
                                                          <p>
                                                              {item.time_from} - {item.time_to}
                                                          </p>
                                                      </div>

                                                      <div className={style.response__order_data_paid}>
                                                          <span>
                                                              <RequestRubleSvg />
                                                              Оплата
                                                          </span>
                                                          <p>
                                                              {item.payment_from} - {item.payment_to} ₽
                                                          </p>
                                                      </div>
                                                  </div>

                                                  {item.about.length > 0 && <p>{item.about}</p>}

                                                  {item.address && (
                                                      <div>
                                                          <RequestAddressSvg />
                                                          {item.address}
                                                      </div>
                                                  )}

                                                  <a
                                                      href={`tel:${item.user.phone}`}
                                                      className={style.response__order_call}>
                                                      Позвонить
                                                  </a>

                                                  <div className={style.contact__messangers}>
                                                      {/*<div>*/}
                                                      {/*    <div className={style.links}>*/}
                                                      {/*        <a href={`tel:${item?.user?.whatsapp}`}>*/}
                                                      {/*            <img src={whatsapp} alt="wa"></img>*/}
                                                      {/*        </a>*/}
                                                      {/*        <a href={`tel:${item?.user?.telegram}`}>*/}
                                                      {/*            <img src={telegram} alt="wa"></img>*/}
                                                      {/*        </a>*/}
                                                      {/*        <a href={`tel:${item?.user?.viber}`}>*/}
                                                      {/*            <img src={viber} alt="wa"></img>*/}
                                                      {/*        </a>*/}
                                                      {/*    </div>*/}
                                                      {/*</div>*/}

                                                      <div className={style.contact__messangers_btns}>
                                                          <div
                                                              className={style.contact__messangers_feedback}
                                                              onClick={() => {
                                                                  modal.feedbackModal(item.user_id);
                                                              }}>
                                                              <WhiteStarIcon />
                                                          </div>
                                                          <div
                                                              className={style.contact__messangers_del}
                                                              onClick={() => onDeleteResponse(item.id)}>
                                                              <BucketIcon />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : requestsArchive.map((item) => {
                                      // мапятся архивные заявки
                                      return (
                                          <div
                                              key={item.id}
                                              className={`${style.response__order_cart} ${style.finish}`}>
                                              <p className={style.finish_text}>Заявка завершена</p>
                                              <div className={style.response__order_cart_top}>
                                                  <div className={style.response__order_cart_wrap}>
                                                      {item.user.avatar === null ? (
                                                          <img src={avatar} alt="" />
                                                      ) : (
                                                          <img src={url + item.user.avatar} alt="" />
                                                      )}

                                                      <div>
                                                          <p className={style.response__order_cart_name}>
                                                              {item.user.name}
                                                          </p>
                                                          <div>
                                                              <div className={style.response__order_cart_id}>
                                                                  ID 5658264
                                                              </div>
                                                              {item.user.mark === null ? (
                                                                  <div className={style.response__order_cart_rating}>
                                                                      <span>Нет рейтинга</span>
                                                                      <RequestRatingStarSvg />
                                                                      <span>{item?.user?.mark}</span>
                                                                  </div>
                                                              ) : (
                                                                  <div className={style.response__order_cart_rating}>
                                                                      <span>Рейтинг</span>
                                                                      <RequestRatingStarSvg />
                                                                      <span>{item?.user?.mark}</span>
                                                                  </div>
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className={style.response__order_cart_data}>
                                                      <div>№525454</div>
                                                      <div>{moment(item.created).format("DD.MM.YYYY")}</div>
                                                      <div>{moment(item.created).format("HH:mm")}</div>
                                                  </div>
                                              </div>

                                              <div className={style.response__order_cart_bottom}>
                                                  <div className={style.response__order_data}>
                                                      <div className={style.response__order_data_date}>
                                                          <span>
                                                              <RequestCalendarSvg />
                                                              Дата работы
                                                          </span>

                                                          <p>
                                                              {moment(item.date_from).format("DD.MM.YYYY")} -
                                                              {moment(item.date_from)
                                                                  .add(item.duration, "days")
                                                                  .format("DD.MM.YYYY")}
                                                          </p>
                                                      </div>

                                                      <div className={style.response__order_data_time}>
                                                          <span>
                                                              <ClockIcon />
                                                              Время
                                                          </span>
                                                          <p>
                                                              {item.time_from} - {item.time_to}
                                                          </p>
                                                      </div>

                                                      <div className={style.response__order_data_paid}>
                                                          <span>
                                                              <RequestRubleSvg />
                                                              Оплата
                                                          </span>
                                                          <p>
                                                              {item.payment_from} - {item.payment_to} ₽
                                                          </p>
                                                      </div>
                                                  </div>

                                                  {item.about.length > 0 && (
                                                      <p className={style.response__order_descr}>{item.about}</p>
                                                  )}

                                                  {item.address && (
                                                      <div className={style.response__order_location}>
                                                          <RequestAddressSvg />
                                                          {item.address}
                                                      </div>
                                                  )}

                                                  <div className={`${style.response__order_call} ${style.disabled}`}>
                                                      Позвонить
                                                  </div>

                                                  <div className={style.contact__messangers}>
                                                      {/*<div>*/}
                                                      {/*    <div className={`${style.links} ${style.disabled}`}>*/}
                                                      {/*        <div>*/}
                                                      {/*            <img src={whatsapp} alt="wa"></img>*/}
                                                      {/*        </div>*/}
                                                      {/*        <div>*/}
                                                      {/*            <img src={telegram} alt="wa"></img>*/}
                                                      {/*        </div>*/}
                                                      {/*        <div>*/}
                                                      {/*            <img src={viber} alt="wa"></img>*/}
                                                      {/*        </div>*/}
                                                      {/*    </div>*/}
                                                      {/*</div>*/}

                                                      <div className={style.contact__messangers_btns}>
                                                          <div
                                                              className={style.contact__messangers_feedback}
                                                              onClick={() => {
                                                                  modal.feedbackModal(item.user_id);
                                                              }}>
                                                              <WhiteStarIcon />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })}
                        </div>
                    </CustomScrollbar>
                </div>
            )}
        </div>
    );
};

export default ResponseContractor;

function renderTrack({ style, ...props }) {
    const track = {
        background: "#E7EAF5",
        borderRadius: "20px",
        height: "100%",
        right: "5px",
    };
    return <div style={{ ...style, ...track }} {...props} />;
}
