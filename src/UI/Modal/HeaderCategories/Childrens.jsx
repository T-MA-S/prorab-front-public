import { useContext } from "react";
import { NavLink } from "react-router-dom";

import ModalsContext from "../../../store/modals-context";
import s from "./style.module.sass";

const Childrens = ({ childrens, currentSubcategory, type }) => {
    const ctx = useContext(ModalsContext);

    const correctPath = type === 0 ? "spetsialnaya-tehnika" : type === 1 ? "brigady" : "";
    return (
        <div className={s.childrens}>
            <h3>{currentSubcategory.title}</h3>
            {childrens.map((category) => {
                return (
                    <NavLink
                        key={category.id}
                        className={s.childrens__item}
                        to={{ pathname: `/catalog/${correctPath}` }}
                        onClick={ctx.toggleMenu}
                        state={{ from: category.id, title: category.title, item: category }}>
                        {category.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Childrens;
