import style from "./style.module.scss";
import SelectFile from "./SelectFile";

const MessageField = ({ textInput, disabled, onFilesChange, attachedFiles, onTextChange, onSendMessage }) => {
    return (
        <form className={style.form}>
            <div className={style.form_wrapper}>
                <input
                    value={textInput}
                    className={style.input}
                    onChange={(e) => onTextChange(e.target.value)}
                    type="text"
                    placeholder="Написать сообщение"
                />
                <button
                    disabled={disabled}
                    className={disabled ? `${style.disabled}` : ""}
                    onClick={(e) => onSendMessage(e)}></button>
            </div>
            <SelectFile onFilesChange={onFilesChange} attachedFiles={attachedFiles} />
        </form>
    );
};

export default MessageField;
