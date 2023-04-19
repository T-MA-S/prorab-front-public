import { useContext } from "react";
import s from "./style.module.sass";
import { NavLink } from "react-router-dom";

import { ArrowBlackIcon } from "../../../components/icons/ArrowBlackIcon";
import ModalsContext from "../../../store/modals-context";

const Subcategories = ({ sublist, currentCategory, type, toggleSub, currentSubcategory }) => {
    const ctx = useContext(ModalsContext);

    return (
        <div className={`${s.list_categories} ${type === 2 ? s.realty : ""}`}>
            <h3>{currentCategory.title}</h3>
            {sublist.map((category) => {
                if (type !== 2) {
                    return (
                        <div
                            key={category.id}
                            className={`${s.list_categories__item} ${
                                currentSubcategory.id === category.id ? s.active : ""
                            }`}
                            onClick={() => toggleSub(category)}>
                            <h5>{category.title}</h5>
                            <div className={s.elements}>
                                <span>{category.amountOfChildren}</span>
                                <ArrowBlackIcon />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <NavLink
                            to={{ pathname: `/catalog/nedvizhimost` }}
                            onClick={ctx.toggleMenu}
                            state={{ from: category.id, title: category.title, item: category }}
                            key={category.id}
                            className={`${s.list_categories__item} `}>
                            <h5>{category.title}</h5>
                        </NavLink>
                    );
                }
            })}
        </div>
    );
};

export default Subcategories;
