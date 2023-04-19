import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import InputPhoto from "../../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../../components/icons/ArrowLeftIcon";
import getHost from "../../../../store/host-store";
import { token } from "../../../../App";
import s from "./style.module.sass";

const FundCreate = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState([]);
    const [logo, setLogo] = useState([]);

    const [success, setSuccess] = useState(false);
    const editorRef = useRef(null);

    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image[0]);
        formData.append("logo", logo[0]);
        formData.append("link", link);

        if (editorRef.current) {
            formData.append("text", editorRef.current.getContent());
        }

        axios
            .post(
                getHost({
                    controller: "charity-fund",
                }),
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
            .then((result) => {
                console.log(result);
                if (result.data.success) {
                    setSuccess(true);
                }
            });
    };

    return (
        <div className="admin__layout">
            <form className={s.layout} onSubmit={submitHandler}>
                <div className={s.top_wrapper}>
                    <div className={s.title}>
                        <div className="admin__back-arrow" onClick={() => history(-1)}>
                            <ArrowLeftIcon />
                        </div>
                        <h3>Создание фонда</h3>
                    </div>
                    <div>
                        <button className="admin__btn-blue">Сохранить</button>
                        {success && (
                            <div className={s.success}>
                                <span className="admin__success">Фонд создан успешно</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={s.photos_wrapper}>
                    <div>
                        <p className={s.photos_wrapper__title}>Логотип фонда:</p>
                        <InputPhoto
                            images={logo}
                            onLoad={setLogo}
                            id={"logo"}
                            onDelete={setLogo}
                            limitText={"Вы можете добавить 1 фото."}
                        />
                    </div>

                    <div>
                        <p className={s.photos_wrapper__title}>Изображение для фонда:</p>
                        <InputPhoto
                            images={image}
                            onLoad={setImage}
                            id={"image"}
                            onDelete={setImage}
                            limitText={"Вы можете добавить 1 фото."}
                        />
                    </div>
                </div>

                <div className={s.bottom_wrapper}>
                    <input
                        type="text"
                        placeholder="Название фонда"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ссылка на фонд"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            height: 350,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default FundCreate;
