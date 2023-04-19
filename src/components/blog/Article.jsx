import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import advMob from "../../assets/images/blog-advertising-mob.png";
import adv2 from "../../assets/images/blog-advertising2.jpg";
import adv1 from "../../assets/images/blog-advertising.jpg";
import { ClockGreyIcon } from "../icons/ClockGreyIcon";
import getHost, { url } from "../../store/host-store";
import { CommentIcon } from "../icons/CommentIcon";
import { UserIcon } from "../icons/UserIcon";
import { PostIcon } from "../icons/PostIcon";
import { EyeIcon } from "../icons/EyeIcon";
import style from "./style.module.scss";
import { token } from "../../App";

const Article = () => {
    const [name, setName] = useState({ value: "", invalid: false });
    const [email, setEmail] = useState({ value: "", invalid: false });
    const [comment, setComment] = useState({ value: "", invalid: false });
    const [success, setSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            fio: name.value,
            email: email.value,
            comment: comment.value,
        };
    };

    const params = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "blog-article",
                action: params.id,
                expand: "section",
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
                    setArticle(result.data);
                }
            });
    }, []);
    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <section className={style.article_page}>
            <div className="container">
                <div className={style.article_page__wrapper}>
                    <div className={style.content}>
                        <div className={style.top}>
                            <p>
                                <ClockGreyIcon />
                                <span>{article.created}</span>
                            </p>
                            <p className={style.category}>{article.section?.title}</p>
                            <p>
                                <EyeIcon />
                                Просмотров:
                                <span> {article.view_count}</span>
                            </p>
                            <p>
                                Комментариев:
                                <span> {article.comments}</span>
                            </p>
                        </div>
                        <div className={style.bottom}>
                            <h1>{article.title}</h1>
                            <img src={url + article.image}></img>
                            <div className={style.from_backend} dangerouslySetInnerHTML={createMarkup(article.text)} />

                            {/* <section className={style.feedback} id="order">
                                    <h2>Отправить комментарий</h2>
                                    <form onSubmit={submit}>
                                        <div className={style.inputs_wrapper}>
                                            <label>
                                                <span>ФИО</span>
                                                <input
                                                    placeholder="Введите ФИО"
                                                    type="text"
                                                    onChange={(e) => setName({ ...name, value: e.target.value })}></input>
                                                <UserIcon />
                                                {name.invalid && <span className={style.error}>{"error"}</span>}
                                            </label>
                                            <label>
                                                <span>Email</span>
                                                <input
                                                    placeholder="Введите e-mail"
                                                    type="email"
                                                    onChange={(e) => setEmail({ ...email, value: e.target.value })}></input>
                                                <PostIcon />
                                                {email.invalid && <span className={style.error}>{"error"}</span>}
                                            </label>
                                        </div>
                                        <label className={style.textarea_wrapper}>
                                            <span>Комментарий</span>
                                            <textarea
                                                placeholder="Поле с комментарием"
                                                onChange={(e) =>
                                                    setComment({ ...comment, value: e.target.value })
                                                }></textarea>
                                            <CommentIcon />
                                            {success && <span className={style.success}>Заявка успешно отправлена</span>}
                                        </label>
                                        <div className={style.submit}>
                                            <button type="submit">Отправить комментарий</button>
                                            <p>
                                                При нажатии кнопки, вы подтверждаете согласие с условиями
                                                <NavLink to="/userTerm"> пользовательского соглашения </NavLink>и
                                                <NavLink to="/privacy"> политикой обработки данных.</NavLink>
                                            </p>
                                        </div>
                                    </form>
                                </section> */}
                        </div>
                    </div>
                    <div className={style.adv}>
                        <img src={adv1} alt=""></img>
                        <img src={adv2} alt=""></img>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Article;
