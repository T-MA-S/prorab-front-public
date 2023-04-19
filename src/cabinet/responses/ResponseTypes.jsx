import UIstyle from "../../UI/ObjectsTypes/style.module.sass";
import { url } from "../../store/host-store";
import style from "./style.module.sass";

const ResponseTypes = ({ toggleCategory, type, category, activeTab }) => {
    return (
        <div className={style.response__types}>
            <h6 className="cabinet__redesign_subtitle">Категории:</h6>
            <div>
                <div className={UIstyle.categories}>
                    {category.map((item) => (
                        <div
                            key={item.type}
                            className={`${UIstyle.item} ${type == item.type ? UIstyle.active : ""}`}
                            onClick={() => type !== item.type && toggleCategory(item.type)}>
                            <img className={UIstyle.type_img} src={url + item.image} alt="" />
                            <h5 className={UIstyle.title}>{item.title}</h5>
                            {activeTab === "customer"
                                ? item.confirmedOrdersCountByTypeClient > 0 && (
                                      <span>+{item.confirmedOrdersCountByTypeClient}</span>
                                  )
                                : item.confirmedOrdersCountByTypeImplementer > 0 && (
                                      <span>+{item.confirmedOrdersCountByTypeImplementer}</span>
                                  )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResponseTypes;
