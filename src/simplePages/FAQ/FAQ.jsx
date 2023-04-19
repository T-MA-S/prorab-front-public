import { useState, useEffect } from "react";

import getHost, { link } from "../../store/host-store";
import Loader from "../../components/loader/Loader";
import style from "./style.module.scss";
import { token } from "../../App";
import Section from "./Section";

const FAQ = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [sections, setSections] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(
            getHost({
                controller: "faq-type",
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
                console.log("tab", result);
                if (result.success) {
                    setTabs(result.data);
                    setCurrentTab(result.data[0].id);
                }
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "faq-section",
                filter: {
                    type_id: currentTab,
                },
                pagination: 0,
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
                console.log("section", result);
                if (result.success) {
                    setSections(result.data);
                }
            });
    }, [currentTab]);

    useEffect(() => {
        let urlLink = `${link}/faq-element?pagination=0`;

        fetch(urlLink, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("elemnt", result);
                if (result.success) {
                    setElements(result.data);
                }
            });
    }, [sections]);

    return (
        <div className={style.FAQ}>
            <section className={style.FAQ__wrapper}>
                <div className={`container`}>
                    <h1>Часто задаваемые вопросы</h1>
                    <p>
                        В данном разделе мы собрали всю необходимую информацию о сервисе и постарались ответить на все
                        важные вопросы.
                    </p>
                </div>
            </section>
            {loading ? (
                <div className={style.FAQ__load}>
                    <Loader />
                </div>
            ) : (
                <>
                    <section className={style.FAQ__nav}>
                        <div className={`${style.wrapper} container`}>
                            {tabs.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`${style.tab} ${currentTab === item.id ? style.active : ""}`}
                                        onClick={() => setCurrentTab(item.id)}>
                                        {item.title}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    <section className="container">
                        <div className={style.acc}>
                            {sections.map((el) => {
                                return <Section key={el.id} title={el.title} elements={elements} id={el.id} />;
                            })}
                        </div>
                    </section>
                    <section className={style.FAQ__nav}>
                        <div className={`${style.wrapper} container`}>
                            {tabs.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`${style.tab} ${currentTab === item.id ? style.active : ""}`}
                                        onClick={() => setCurrentTab(item.id)}>
                                        {item.title}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default FAQ;
