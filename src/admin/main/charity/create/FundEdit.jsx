import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import InputPhoto from "../../../../cabinet/advertisement/createAds/InputPhoto";
import { ArrowLeftIcon } from "../../../../components/icons/ArrowLeftIcon";
import { DeleteIcon } from "../../../../components/icons/DeleteIcon";
import getHost, { url } from "../../../../store/host-store";
import Loader from "../../../../components/loader/Loader";
import { token } from "../../../../App";
import s from "./style.module.sass";

const FundEdit = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [success, setSuccess] = useState(false);
    const [textFromAPI, setTextFromApi] = useState("");
    const [loading, setLoading] = useState(true);

    const editorRef = useRef(null);

    const history = useNavigate();
    const location = useLocation();

    //текущее и добавленое изображения
    const [currentImages, setCurrentImages] = useState(null);
    const [downloadImages, setDownloadImages] = useState([]);

    //текущее и добавленое лого
    const [currentLogo, setCurrentLogo] = useState(null);
    const [downloadLogo, setDownloadLogo] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //подгрузка данных с бэка по статье
    useEffect(() => {
        fetch(
            getHost({
                controller: "charity-fund",
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

                setLoading(false);

                if (result.success) {
                    setTitle(result.data.title);
                    setLink(result.data.link);
                    setCurrentImages(result.data.image);
                    setCurrentLogo(result.data.logo);
                    setTextFromApi(result.data.text);
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

        let selectedLogo =
            downloadLogo.length > 0
                ? downloadLogo[0]
                : currentLogo !== undefined && currentLogo !== null
                ? currentLogo[0]
                : null;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("link", link);
        formData.append("image", selectedImg);
        formData.append("logo", selectedLogo);

        if (editorRef.current) {
            formData.append("text", editorRef.current.getContent());
        }

        axios
            .put(
                getHost({
                    controller: "charity-fund",
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
                console.log(result);
                if (result.data.success) {
                    setSuccess(true);
                }
            });
    };

    const deleteCurrentImage = (e) => {
        if (currentImages === undefined) {
            return;
        }
        e.preventDefault();
        setCurrentImages(null);
    };

    const deleteCurrentLogo = (e) => {
        if (currentLogo === undefined) {
            return;
        }
        e.preventDefault();
        setCurrentLogo(null);
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
                            <h3>Редактировать карточку фонда</h3>
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
                    <div className={s.photos_wrapper}>
                        <div>
                            <p className={s.photos_wrapper__title}>Логотип фонда:</p>
                            {currentLogo !== undefined && currentLogo !== null && (
                                <div className="imagesMultiple">
                                    <div className="input_foto_wrap">
                                        <img src={url + currentLogo} alt="" />
                                        <button onClick={(e) => deleteCurrentLogo(e)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentLogo === null && (
                                <InputPhoto
                                    images={downloadLogo}
                                    onLoad={setDownloadLogo}
                                    onDelete={setDownloadLogo}
                                    limitText={"Вы можете добавить 1 фото."}
                                />
                            )}
                        </div>
                        <div>
                            <p className={s.photos_wrapper__title}>Изображение для фонда:</p>
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

export default FundEdit;
