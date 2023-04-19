import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import object from "../../assets/images/stubs/object-mob.png";
import { ClockGreyIcon } from "../icons/ClockGreyIcon";
import getHost, { url } from "../../store/host-store";
import style from "./style.module.scss";
import { token } from "../../App";

const Blog = () => {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "blog-section",
                expand: "articles",
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    setTabs(result.data);
                }
            });

        fetch(
            getHost({
                controller: "blog-article",
                filter: {
                    section_id: activeTab,
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
            .then((result) => {
                console.log(result);

                if (result.success) {
                    setArticles(result.data);
                }
            });
    }, []);

    const toggleTabs = (id) => {
        setActiveTab(id);

        fetch(
            getHost({
                controller: "blog-article",
                filter: {
                    section_id: id,
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
            .then((result) => {
                if (result.success) {
                    setArticles(result.data);
                }
            });
    };

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div className={style.blog}>
            <section className={style.blog__wrapper}>
                <div className={`container`}>
                    <h1>Блог</h1>
                    <p>
                        Мы предоставляем полезную и актуальную информацию для людей связанных со строительной тематикой.
                    </p>
                </div>
            </section>
            <section className={style.blog__nav}>
                <div className="container">
                    <div className={style.wrapper}>
                        <div className={style.tabs}>
                            {tabs.map((el) => {
                                return (
                                    <div
                                        key={el.id}
                                        onClick={() => toggleTabs(el.id)}
                                        className={`${style.tab} ${el.id === activeTab ? style.active : ""}`}>
                                        {el.title}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={style.form_wrapper}>
                            <form>
                                <input type="search" placeholder="Поиск"></input>
                                <button type="submit"></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.blog__articles}>
                <div className="container">
                    <ul>
                        {articles.map((el) => {
                            return (
                                <li key={el.id}>
                                    <NavLink to={`/article/${el.id}`}>
                                        {el.image === null ? (
                                            <img src={object} alt="blog" />
                                        ) : (
                                            <img src={url + el.image} alt="blog" />
                                        )}
                                        <div className={style.text}>
                                            <div className={style.date_wrapper}>
                                                <ClockGreyIcon />
                                                <span>{el.created}</span>
                                            </div>
                                            <h4>{el.title}</h4>
                                            <div
                                                className={style.text_wrapper}
                                                dangerouslySetInnerHTML={createMarkup(el.preview)}
                                            />
                                            <button>Подробнее</button>
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Blog;
