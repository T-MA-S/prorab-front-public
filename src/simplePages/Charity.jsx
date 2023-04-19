import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { CommentIcon } from "../components/icons/CommentIcon";
import { PhoneIcon } from "../components/icons/PhoneIcon";
import { HeartIcon } from "../components/icons/HeartIcon";
import { UserIcon } from "../components/icons/UserIcon";
import { PostIcon } from "../components/icons/PostIcon";
import ModalRegister from "../UI/Modal/ModalRegister";
import getHost from "../store/host-store";
import InputMask from "react-input-mask";
import style from "./style.module.scss";
import { token } from "../App";
import { url } from "../store/host-store";

const errors = {
    name: "Необходимо заполнить «ФИО»",
    email: "Необходимо заполнить «Email»",
    phone: "Необходимо заполнить «Телефон»",
    fund: "Необходимо заполнить «Фонд»",
};

const Charity = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(
            getHost({
                controller: "charity-fund",
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
                    setData(result.data);
                }
            });
    }, []);

    const [name, setName] = useState({ value: "", invalid: false });
    const [email, setEmail] = useState({ value: "", invalid: false });
    const [phoneNumber, setPhoneNumber] = useState({ value: "", invalid: false });
    const [fund, setFund] = useState({ value: "", invalid: false });
    const [comment, setComment] = useState({ value: "", invalid: false });
    const [success, setSuccess] = useState(false);

    const [modal, setModal] = useState(false);

    function clearForm() {
        setSuccess(true);
        setModal(true);

        setName({ ...name, value: "", invalid: false });
        setEmail({ value: "", invalid: false });
        setPhoneNumber({ value: "", invalid: false });
        setFund({ value: "", invalid: false });
    }

    function showErrors(errorsList) {
        errorsList.forEach((error) => {
            switch (error.field) {
                case "fio":
                    console.log(name);
                    setName({ ...name, invalid: true });
                    break;
                case "email":
                    setEmail({ ...email, invalid: true });
                    break;
                case "phone":
                    setPhoneNumber({ ...phoneNumber, invalid: true });
                    break;
                case "fund":
                    setFund({ ...fund, invalid: true });
                    break;
                default:
            }
        });
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            fio: name.value,
            email: email.value,
            phone: phoneNumber.value,
            fund: fund.value,
            comment: comment.value,
        };

        fetch(
            getHost({
                controller: "charity",
            }),
            {
                method: "POST",
                crossDomain: true,
                headers: {
                    Accept: "application/json,",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
            .then((response) => response.json())
            .then((status) => {
                if (status.success) {
                    clearForm();
                } else {
                    showErrors(status.data);
                }
            });
    };

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div className={style.charity}>
            {modal && (
                <ModalRegister
                    title="Заявка отправлена!"
                    onClick={() => setModal(false)}
                    className="modal_register"
                    titleBtn="Ок"
                    classNameTitle="modal_title"
                    classNameBtn="modal_btn"
                />
            )}
            <section className={style.hero_wrapper}>
                <div className={`${style.hero} container`}>
                    <h1>Благотворительность</h1>
                    <p>
                        Мы стремимся не просто развивать проект, но и помогать нуждающимся и участвуем в важных
                        социальных проектах. Часть доходов мы направляем в благотворительные фонды. Желающие принять
                        участие в благотворительности, могут к нам присоединиться.
                    </p>
                    <a href="#order">
                        <div>Подать заявку</div>
                    </a>
                </div>
            </section>
            <div className="container">
                <section className={style.funds}>
                    <h2>Фонды, с которыми мы сотрудничаем</h2>
                    <div className={style.funds_wrapper}>
                        {data.map((el) => {
                            return (
                                <div key={el.id} className={style.funds_card}>
                                    <div className={style.top_wrapper}>
                                        <div>{el.logo === null ? "" : <img src={url + el.logo} alt=""></img>}</div>
                                        <p>{el.title}</p>
                                    </div>
                                    <h3>{el.title}</h3>
                                    <div
                                        className={style.descr}
                                        dangerouslySetInnerHTML={createMarkup(el.description)}
                                    />
                                    <div className={style.bottom_wrapper}>
                                        <img src={url + el.image} className={style.preview} alt=""></img>
                                        <a href={el.link} target="_blank" rel="noreferrer">
                                            Перейти
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
            <section className={style.feedback_wrapper}>
                <div className="container">
                    <div className={style.feedback} id="order">
                        <h2>ПРИСОЕДИНИТЬСЯ</h2>
                        <p className={style.feedback_descr}>
                            Ваш фонд может присоединиться к программе сервиса Прораб.
                        </p>
                        <form onSubmit={submit}>
                            <div className={style.inputs_wrapper}>
                                <label>
                                    <span>ФИО</span>
                                    <input
                                        placeholder="Введите ФИО"
                                        type="text"
                                        value={name.value}
                                        onChange={(e) => setName({ ...name, value: e.target.value })}></input>
                                    <UserIcon />
                                    {name.invalid && <span className={style.error}>{errors.name}</span>}
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input
                                        placeholder="Введите e-mail"
                                        type="email"
                                        value={email.value}
                                        onChange={(e) => setEmail({ ...email, value: e.target.value })}></input>
                                    <PostIcon />
                                    {email.invalid && <span className={style.error}>{errors.email}</span>}
                                </label>
                                <label>
                                    <span>Телефон</span>
                                    <InputMask
                                        mask="+7 (999) 999 9999"
                                        value={phoneNumber.value}
                                        placeholder="Введите телефон"
                                        onChange={(e) => setPhoneNumber({ ...phoneNumber, value: e.target.value })}
                                    />
                                    <PhoneIcon />
                                    {phoneNumber.invalid && <span className={style.error}>{errors.phone}</span>}
                                </label>
                                <label>
                                    <span>Фонд</span>
                                    <input
                                        placeholder="Наименование фонда"
                                        type="text"
                                        value={fund.value}
                                        onChange={(e) => setFund({ ...fund, value: e.target.value })}></input>
                                    <HeartIcon />
                                    {fund.invalid && <span className={style.error}>{errors.fund}</span>}
                                </label>
                            </div>
                            <label className={style.textarea_wrapper}>
                                <span>Комментарий</span>
                                <textarea
                                    placeholder="Поле с комментарием"
                                    onChange={(e) => setComment({ ...comment, value: e.target.value })}></textarea>
                                <CommentIcon />
                                {success && <span className={style.success}>Заявка успешно отправлена</span>}
                            </label>
                            <div className={style.submit}>
                                <button type="submit">Отправить</button>
                                <p>
                                    При нажатии кнопки, вы подтверждаете согласие с условиями
                                    <NavLink to="/userTerm"> пользовательского соглашения </NavLink>и
                                    <NavLink to="/privacy"> политикой обработки данных.</NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Charity;
