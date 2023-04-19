import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { DropdownIndicator } from "../../../../components/header/headerTop/headerSelects/selects";
import { customStyles2 } from "../../../../components/header/headerTop/headerSelects/selects";
import InputPhoto from "../../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../../components/icons/ArrowLeftIcon";
import getHost, { link } from "../../../../store/host-store";
import { token } from "../../../../App";
import s from "./style.module.sass";

const ArticleCreate = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState([]);
    const [options, setOptions] = useState([]);
    const [success, setSuccess] = useState(false);
    const editorRef = useRef(null);

    const history = useNavigate();

    const loadOptions = (inputValue, callback) => {
        let options = [];
        axios
            .create({
                baseURL: `${link}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            .get(`blog-section?expand=articles`)
            .then((response) => {
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.title,
                        value: permission.id,
                    });
                    callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
                });
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("section_id", options.value);
        formData.append("image", image[0]);

        if (editorRef.current) {
            formData.append("text", editorRef.current.getContent());
        }

        axios
            .post(
                getHost({
                    controller: "blog-article",
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
                        <h3>Создание статьи</h3>
                    </div>
                    <div>
                        <button className="admin__btn-blue">Сохранить</button>
                        {success && (
                            <div className={s.success}>
                                <span className="admin__success">Статья создана успешно</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={s.photo_wrapper}>
                    <InputPhoto
                        images={image}
                        onLoad={setImage}
                        onDelete={setImage}
                        limitText={"Вы можете добавить 1 фото."}
                    />
                </div>

                <div className={s.bottom_wrapper}>
                    <input
                        type="text"
                        placeholder="Название статьи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <AsyncSelect
                        key={options}
                        components={{ DropdownIndicator }}
                        placeholder={"Выбрать"}
                        cacheOptions
                        defaultOptions
                        onChange={setOptions}
                        value={options}
                        styles={customStyles2}
                        loadOptions={loadOptions}
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

export default ArticleCreate;
