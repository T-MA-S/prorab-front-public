import { useEffect, useState } from "react";
import axios from "axios";

import { NonViewedIcon } from "../../../components/icons/NotViewedIcon";
import { ViewedIcon } from "../../../components/icons/ViewedIcon";
import MessageField from "../../../UI/MessageField/MessageField";
import noAvatar from "../../../assets/images/stubs/avatar.svg";
import getHost, { url } from "../../../store/host-store";
import { token } from "../../../App";
import s from "./style.module.scss";
import { isNull } from "url/util";

const Dialog = ({ id, userData, setRerender }) => {
    const [messages, setMessages] = useState([]);

    const [attachedFiles, setAttachedFiles] = useState([]);
    const [textInput, setTextInput] = useState("");
    const disabled = textInput === "" && attachedFiles.length === 0;

    const fetchChatMessages = () => {
        // Получаем сообщения после первой загрузки стр
        fetch(
            getHost({
                controller: "chat-message",
                action: "user-messages-by-id",
                id,
                expand: "fromUser, files",
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
                    setMessages(result.data);
                }
            });
    };

    useEffect(() => {
        if (id !== null) {
            fetchChatMessages();
        }
    }, []);

    useEffect(() => {
        if (id !== null) {
            setMessages([]);
            //очистка формы
            setTextInput("");
            // очищаем выбранные изображения
            setAttachedFiles([]);
            //повторный запрос для отображения нового сообщения
            fetchChatMessages();
        }
    }, [id]);

    // Отправка сообщения в поддержку
    const sendMessage = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("text", textInput);
        formData.append("to_user_id", id);

        // Отправка если выбрано изображение
        if (attachedFiles.length > 0) {
            attachedFiles.map((file) => {
                formData.append("file[]", file);
            });
        }

        axios
            .post(
                getHost({
                    controller: "chat-message",
                }),
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                //очистка формы
                setTextInput("");
                //повторный запрос для отображения нового сообщения
                fetchChatMessages();
                // очищаем выбранные изображения
                setAttachedFiles([]);
                //ререндерим список сообщений, чтобы обновилось последнее в диалогах
                setRerender((prev) => !prev);
            })
            .catch((err) => console.log(err));
    };

    if (messages.length > 0) {
        return (
            <div className={s.dialog}>
                <div>
                    {Object.keys(userData).length > 0 && (
                        <div className={s.top}>
                            <div className={s.user_info}>
                                {userData.img === null ? (
                                    <img alt="avatar" src={noAvatar}></img>
                                ) : (
                                    <img alt="avatar" src={url + userData.img}></img>
                                )}
                                <p>{userData.name}</p>
                            </div>
                        </div>
                    )}
                    <div className={s.dialog__wrapper}>
                        {messages.map((message) => {
                            return isUserMessage(message) ? (
                                <div className={`${s.from_user} ${s.message_wrapper}`} key={message.id}>
                                    {message.fromUser?.avatar === null ? (
                                        <img className={s.avatar} alt="avatar" src={noAvatar}></img>
                                    ) : (
                                        <img
                                            className={s.avatar}
                                            alt="avatar"
                                            src={url + message.fromUser?.avatar}></img>
                                    )}
                                    <div className={s.message}>
                                        <span className={s.date}>
                                            {message.fromUser?.name} {message.created}
                                        </span>
                                        <div className={`${s.text} ${s.user_message}`}>
                                            {getImages(message).map((img) => (
                                                <img key={img.file} alt={img.id} src={url + img.file}></img>
                                            ))}
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`${s.from_support} ${s.message_wrapper}`} key={message.id}>
                                    {message.fromUser?.avatar === null ? (
                                        <img className={s.avatar} src={noAvatar} alt="avatar" />
                                    ) : (
                                        <img className={s.avatar} src={url + message.fromUser?.avatar} alt="avatar" />
                                    )}
                                    <div className={s.message}>
                                        <span className={s.date}>
                                            {message.fromUser?.name} {message.created}
                                        </span>
                                        <div className={`${s.text} ${s.support_message}`}>
                                            {getImages(message).map((img, i) => (
                                                <img key={i} alt={img.id} src={url + img.file}></img>
                                            ))}
                                            <p>{message.text}</p>
                                        </div>
                                        {message.viewed ? (
                                            <div className={s.message__view_time}>
                                                <span>{message.view_time}</span>
                                                <ViewedIcon />
                                            </div>
                                        ) : (
                                            <div className={s.message__view_time}>
                                                <NonViewedIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={s.message_field}>
                    <MessageField
                        textInput={textInput}
                        onTextChange={setTextInput}
                        onSendMessage={sendMessage}
                        onFilesChange={setAttachedFiles}
                        attachedFiles={attachedFiles}
                        disabled={disabled}
                    />
                </div>
            </div>
        );
    }
};

function isUserMessage(message) {
    return message.to_user_id === null;
}
function getImages(message) {
    return message?.files || [];
}
export default Dialog;
