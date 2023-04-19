import { ArrowBlackIcon } from "../../../components/icons/ArrowBlackIcon";
import brigades from "../../../assets/images/index/category-brigades.png";
import realty from "../../../assets/images/index/category-realty.png";
import spec from "../../../assets/images/index/category-spec.png";
import s from "./style.module.sass";

const categoriesImgs = [spec, brigades, realty];

const ParentsCategories = ({ currentCategory, categories, toggleParent }) => {
    const parents = categories.filter((el) => el.depth === 0);
    return (
        <div className={s.parent}>
            {parents.map((category) => {
                return (
                    <div
                        key={category.id}
                        className={`${s.parent__item} ${currentCategory.id === category.id ? s.active : ""} `}
                        onClick={() => toggleParent(category)}>
                        <div className={s.wrapper}>
                            <img src={categoriesImgs.filter((el, index) => index + 1 === category.id)} alt="icon"></img>
                            <h5>{category.title}</h5>
                        </div>
                        <ArrowBlackIcon />
                    </div>
                );
            })}
        </div>
    );
};

export default ParentsCategories;
