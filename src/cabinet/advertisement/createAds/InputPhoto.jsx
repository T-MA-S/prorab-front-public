import "../../cabinet.sass";
import { ImageIcon } from "../../../components/icons/ImageIcon";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";

const InputPhoto = ({ images, onLoad, onDelete, maxCount = 1, limitText, id = "select_img" }) => {
    let selectedFiles = [];
    const handleMultipleImages = (event) => {
        selectedFiles = [...event.target.files].slice(0, maxCount);
        onLoad(selectedFiles);
        console.log(selectedFiles);
    };

    const deleteImg = (e, url) => {
        e.preventDefault();
        onDelete(images.filter((urls) => urls !== url));
    };

    const valueRefreshHandler = (event) => {
        event.currentTarget.value = null;
    };

    return (
        <div className="input_foto_wrap">
            <div className="input_photo_text">
                <span>* </span>Фото не должно содержать контактные данные и прочую информацию, которая нарушает правила
                сервиса Прораб.
                <span className="db mt14">{limitText}</span>
            </div>
            <div className="imagesMultiple">
                {images?.map((file) => {
                    return (
                        <div key={file.name}>
                            <img src={URL.createObjectURL(file)} alt="" />
                            <button onClick={(e) => deleteImg(e, file)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className={`input_foto_div ${images.length > 0 && "true"}`}>
                <input
                    accept="image/*"
                    type="file"
                    id={id}
                    style={{ display: "none" }}
                    name="images[]"
                    multiple
                    onInput={handleMultipleImages}
                    onClick={valueRefreshHandler}
                />
                <label htmlFor={id} className="input_foto">
                    <h5>
                        <ImageIcon />
                        Добавить <br /> фото
                    </h5>
                </label>
            </div>
        </div>
    );
};

export default InputPhoto;
