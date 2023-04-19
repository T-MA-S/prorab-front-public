import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Select from "react-select";

import { DropdownIndicator } from "../../../components/header/headerTop/headerSelects/selects";
import { customStyles } from "../../../components/header/headerTop/headerSelects/selects";
import { ArrowLeftIcon } from "../../../components/icons/ArrowLeftIcon";
import objImg from "../../../assets/images/stubs/object.png";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

//опции статуса объявления
const options = [
    { value: 0, label: "Ожидает подтверждения" },
    { value: 1, label: "Подтверждено" },
    { value: 2, label: "Отклонено" },
];

const OneObject = () => {
    const params = useParams();
    const history = useNavigate();

    const id = params.id;
    const [currentObject, setCurrentObject] = useState({});
    const [statusApprove, setStatusApprove] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //данные по объявлению
    useEffect(() => {
        fetch(
            getHost({
                controller: "object",
                action: id,
                expand: "city, city.region, city.region.country, category",
            }),
            {
                method: "GET",
                crossDomain: true,
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setCurrentObject(result.data);
                //селекты статуса объявления
                setStatusApprove({
                    value: result.data.status,
                    label:
                        result.data.status === 0 ? "Ожидает" : result.data.status === 1 ? "Подтверждено" : "Отклонено",
                });
            });
    }, [id]);

    const onDelete = () => {
        fetch(
            getHost({
                controller: "object",
                action: id,
            }),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    //пока перенаправляем, позже можно добавить модалку
                    window.location.replace("/admin/objects");
                } else {
                    setSuccess(false);
                    setError(true);
                }
            });
    };

    const submitHandler = () => {
        // формируем статус объявления
        let data = {
            status: statusApprove.value,
        };

        fetch(
            getHost({
                controller: "object",
                action: id,
            }),
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setSuccess(true);
                    setError(false);
                } else {
                    setSuccess(false);
                    setError(true);
                }
            });
    };

    if (Object.keys(currentObject).length > 0) {
        return (
            <div className="admin__layout">
                <div className="admin_one-object_top">
                    <div className="admin_one-object_top-left">
                        <button className="admin__back-arrow" onClick={() => history(-1)}>
                            <ArrowLeftIcon />
                        </button>
                        <div>
                            <h3>Объявление #{currentObject.id}</h3>
                            <span>Дата регистрации: {currentObject.created}</span>
                        </div>
                    </div>
                    <div className="admin_one-object_top-right">
                        <button className="admin__btn-transparent" onClick={onDelete}>
                            Удалить
                        </button>
                        <button className="admin__btn-blue" onClick={submitHandler}>
                            Сохранить
                        </button>
                    </div>
                    {success && <span className="admin_one-object_success">Статус объявления изменён</span>}
                    {error && (
                        <span className="admin_one-object_error">Упс, что-то пошло не так. Попробуйте позже</span>
                    )}
                </div>
                <div className="admin_one-object_bottom">
                    <div className="admin_one-object_bottom-left">
                        <p>{currentObject.name}</p>
                        <p>{currentObject.model}</p>
                        <p>
                            {currentObject.price_1}
                            <span>за час</span>
                        </p>
                        <p>
                            {currentObject.price_2}
                            <span>за смену</span>
                        </p>
                        <p className="admin_one-object_bottom-left_category">{currentObject.category?.title}</p>
                        <p className="admin_one-object_textfield">{currentObject.about}</p>
                        <div className="admin_one-object_location">
                            <p>{currentObject.city?.region?.country?.name}</p>
                            <p>{currentObject.city?.region?.name}</p>
                            <p>{currentObject.city?.name}</p>
                        </div>
                    </div>
                    <div className="admin_one-object_bottom-right">
                        <Select
                            className="selects"
                            styles={customStyles}
                            components={{ DropdownIndicator }}
                            options={options}
                            placeholder={"Выбор"}
                            value={statusApprove}
                            onChange={(value) => setStatusApprove(value)}
                        />
                        <div className="imgs-wrapper">
                            {currentObject.image === null ? (
                                <img src={objImg} alt="obj" />
                            ) : (
                                <img src={url + currentObject.image.filename} alt="obj" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="admin__layout">
                <Loader />
            </div>
        );
    }
};

export default OneObject;
