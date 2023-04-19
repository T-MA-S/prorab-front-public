import { url } from "../../store/host-store";
import style from "./style.module.sass";

const ObjectsTypes = ({ toggleCategory, type, category }) => {
    return (
        <div className={style.categories}>
            {category.map((item) => (
                <div
                    key={item.type}
                    className={`${style.item} ${type == item.type ? style.active : ""}`}
                    onClick={() => toggleCategory(item.type)}>
                    <img className={style.type_img} src={url + item.image} alt="" />
                    <h5 className={style.title}>{item.title}</h5>
                </div>
            ))}
        </div>
    );
};

export default ObjectsTypes;
