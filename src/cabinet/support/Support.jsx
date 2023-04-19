import { useContext, useEffect, useState } from "react";
import axios from "axios";

import CustomScrollbar from "../../UI/Scrollbar/CustomScrollbar";
import MessageField from "../../UI/MessageField/MessageField";
import DeviceContext from "../../store/device-context";
import Loader from "../../components/loader/Loader";
import getHost from "../../store/host-store";
import FAQNavigation from "./FAQNavigation";
import style from "./style.module.sass";
import { token } from "../../App";
import Dialog from "./Dialog";
import Header from "./Header";
import moment from "moment";

const Support = () => {
    const [mesagges, setMessages] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const disabled = textInput === "" && attachedFiles.length === 0;
    const device = useContext(DeviceContext);

    const fetchChatMessages = () => {
        // Получаем сообщения после первой загрузки стр
        fetch(
            getHost({
                controller: "chat-message",
                action: "user-messages",
                expand: "files",
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
                setLoading(false);
                if (result.success) {
                    setMessages(getDates(result.data));
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            }).catch(error => console.log(error));
    };

    // Отправка сообщения в поддержку
    const sendMessage = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("text", textInput);

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
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function getDates(messageList) {
        const data = messageList;
        const result = {};
        Object.values(data).forEach((item) => {
            const date = moment(item.created).format("DD.MM.YYYY");
            if (!result[date]) {
                result[date] = [];
            }
            result[date].push(item);
        });

        return result;
    }

    return (
        <div className="cabinet__redesign_container">
            <h3 className="cabinet__redesign_title">Служба поддержки</h3>

            <div className={style.support}>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <Header />
                        <FAQNavigation />
                        {device.isMobile ? (
                            <CustomScrollbar style={{ height: 300 }}>
                                <div className={style.dialog}>
                                    <Dialog data={mesagges} />
                                </div>
                            </CustomScrollbar>
                        ) : (
                            <CustomScrollbar>
                                <div className={style.dialog}>
                                    <Dialog data={mesagges} />
                                </div>
                            </CustomScrollbar>
                        )}

                        <div className={style.messageField}>
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
                )}
            </div>
        </div>
    );
};

export default Support;
