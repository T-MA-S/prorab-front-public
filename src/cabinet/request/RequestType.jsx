import "../cabinet.sass";
import { url } from "../../store/host-store";

const RequestType = (props) => {
    return (
        <div className="top">
            {props.typeCategory.map((item) => (
                <div
                    key={item.type}
                    className={`item ${Number(props.typeId) === Number(item.type) ? "active" : ""}`}
                    onClick={() => {
                        props.resetObjects(item.type);
                    }}>
                    <div className="img">
                        <img src={url + item.image} alt="" />
                    </div>

                    <h5 className="title">{item.title}</h5>

                    {item.newOrdersCountByType > 0 && <p>+{item.newOrdersCountByType}</p>}
                </div>
            ))}
        </div>
    );
};

export default RequestType;
