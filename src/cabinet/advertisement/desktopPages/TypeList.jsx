import "../../cabinet.sass";
import { url } from "../../../store/host-store";

const TypeList = ({ onTypeChange, type, category }) => {
    return (
        <div className="top">
            {category.map((item, i) => (
                <div
                    key={i}
                    className={`item ${Number(type) === Number(item.type) ? "active" : ""}`}
                    onClick={() => onTypeChange(item.type)}>
                    <div className="img">
                        <img src={url + item.image} alt="" />
                    </div>
                    <div>
                        <h5 className="title">{item.title}</h5>
                        {/*<p>Объявлений: {item.objectsCountByType}</p>*/}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TypeList;
