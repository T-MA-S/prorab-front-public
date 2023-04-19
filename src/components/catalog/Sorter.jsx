import './catalog.sass'
import React from "react";

const Sorter = props => {
    return (
        <div className={props.className}>
            <p>Сортировать по: </p>
            <button className={props.selected === 1 ? 'active item' : 'item'} onClick={() => {
                props.setSelected(1);
            }}>Рейтингу</button>
            <span>|</span>
            <button className={props.selected === 2 ? 'active item' : 'item'} onClick={() => {
                props.setSelected(2);
            }}>Обновлению</button>
        </div>
    )
}

export default Sorter;