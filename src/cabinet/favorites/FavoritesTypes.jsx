import ObjectsTypes from "../../UI/ObjectsTypes/ObjectsTypes";
import style from "./style.module.sass";

const FavoritesTypes = ({ toggleCategory, type, category }) => {
    return (
        <div className={style.favorites__types}>
            <h6 className="cabinet__redesign_subtitle">Категории:</h6>
            <div className={style.categories}>
                <ObjectsTypes toggleCategory={toggleCategory} type={type} category={category} />
            </div>
        </div>
    );
};

export default FavoritesTypes;
