import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import { DropdownIndicator } from "../../../../components/header/headerTop/headerSelects/selects";
import { customStyles2 } from "../../../../components/header/headerTop/headerSelects/selects";
import InputPhoto from "../../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../../components/icons/ArrowLeftIcon";
import { DeleteIcon } from "../../../../components/icons/DeleteIcon";
import getHost, { link, url } from "../../../../store/host-store";
import Loader from "../../../../components/loader/Loader";
import { token } from "../../../../App";
import s from "./style.module.sass";

const ArticleEdit = () => {
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState({});
    const [success, setSuccess] = useState(false);
    const [textFromAPI, setTextFromApi] = useState("");
    const [loading, setLoading] = useState(true);

    const editorRef = useRef(null);

    const history = useNavigate();
    const location = useLocation();

    //текущее и добавленое изображения
    const [currentImages, setCurrentImages] = useState(null);
    const [downloadImages, setDownloadImages] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //подгрузка данных с бэка по статье
    useEffect(() => {
        fetch(
            getHost({
                controller: "blog-article",
                action: location.state.id,
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
                    setTitle(result.data.title);
                    setCurrentImages(result.data.image);
                    setTextFromApi(result.data.text);

                    fetch(
                        getHost({
                            controller: "blog-section",
                            filter: {
                                id: result.data.section_id,
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
                            setLoading(false);
                            //установка селекта
                            setOptions({
                                value: result.data[0].id,
                                label: result.data[0].title,
                            });
                        });
                }
            });
    }, [location.state.id]);

    const submitHandler = (e) => {
        e.preventDefault();

        let selectedImg =
            downloadImages.length > 0
                ? downloadImages[0]
                : currentImages !== undefined && currentImages !== null
                ? currentImages[0]
                : null;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("section_id", options.value);
        formData.append("image", selectedImg);

        if (editorRef.current) {
            formData.append("text", editorRef.current.getContent());
        }

        axios
            .put(
                getHost({
                    controller: "blog-article",
                    action: location.state.id,
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
                if (result.data.success) {
                    setSuccess(true);
                }
            });
    };

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

    const deleteCurrentImage = (e) => {
        if (currentImages === undefined) {
            return;
        }
        e.preventDefault();
        setCurrentImages(null);
    };

    return (
        <div className="admin__layout">
            {loading ? (
                <Loader />
            ) : (
                <form className={s.layout} onSubmit={submitHandler}>
                    <div className={s.top_wrapper}>
                        <div className={s.title}>
                            <div className="admin__back-arrow" onClick={() => history(-1)}>
                                <ArrowLeftIcon />
                            </div>
                            <h3>Редактировать статью</h3>
                        </div>
                        <div>
                            <button className="admin__btn-blue">Сохранить</button>
                            {success && (
                                <div className={s.success}>
                                    <span className="admin__success">Изменения сохранены</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={s.photo_wrapper}>
                        {currentImages !== undefined && currentImages !== null && (
                            <div className="imagesMultiple">
                                <div className="input_foto_wrap">
                                    <img src={url + currentImages} alt="" />
                                    <button onClick={(e) => deleteCurrentImage(e)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentImages === null && (
                            <InputPhoto
                                images={downloadImages}
                                onLoad={setDownloadImages}
                                onDelete={setDownloadImages}
                                limitText={"Вы можете добавить 1 фото."}
                            />
                        )}
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
                            initialValue={textFromAPI}
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
            )}
        </div>
    );
};

export default ArticleEdit;
