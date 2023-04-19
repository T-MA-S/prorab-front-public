import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import getHost, { url } from "../../../store/host-store";
import s from "../style.module.scss";
import { token } from "../../../App";

function Brigades() {
    const [error, setError] = useState(null);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
                filter: {
                    depth: 1,
                    type: 1,
                },
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then(
                (result) => setCategory(result.data),
                (error) => {
                    setError(error);
                }
            );
    }, []);
    if (error) {
        return <div className="error__react_module">Произошла ошибка загрузка модуля, перезагрузите страницу</div>;
    } else {
        return (
            <section className={s.brigades}>
                <div className="container">
                    <h2>Бригады</h2>
                    <div className={s.brigades__box}>
                        {category.map((item) => (
                            <NavLink
                                to={{ pathname: "/catalog/brigady" }}
                                state={{ from: item.id, title: item.title, item }}
                                key={item.id}>
                                <div className={s.wrapper}>
                                    <div className={s.img_wrapper}>
                                        <img src={url + item.image} alt="" />
                                    </div>
                                </div>
                                <p>{item.title}</p>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Brigades;
