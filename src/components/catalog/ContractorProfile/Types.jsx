import ObjectsTypes from "../../../UI/ObjectsTypes/ObjectsTypes";
import style from "./style.module.sass";

const Types = ({ toggleCategory, type, category }) => {
    return (
        <div className={style.types}>
            <h3 className={style.title}>Категории объявлений:</h3>
            <ObjectsTypes toggleCategory={toggleCategory} type={type} category={category} />
        </div>
    );
};

export default Types;
