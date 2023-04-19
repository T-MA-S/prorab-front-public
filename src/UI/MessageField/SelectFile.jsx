import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { Box, Button } from "@mui/material";
import style from "./style.module.scss";

const SelectFile = ({ onFilesChange, attachedFiles }) => {
    const deleteImg = (e, url) => {
        e.preventDefault();
        onFilesChange(attachedFiles.filter((urls) => urls !== url));
    };

    const chooseFiles = (e) => {
        onFilesChange(Array.from(e.target.files));
    };

    const valueRefreshHandler = (event) => {
        event.currentTarget.value = null;
    };

    return (
        <div className={style.photos}>
            {attachedFiles.map((file) => {
                return (
                    <Box key={file.name}>
                        <div>
                            <img src={URL.createObjectURL(file)} alt="" height="100px" />
                            <button onClick={(e) => deleteImg(e, file)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </Box>
                );
            })}
            <input
                accept="image/*"
                type="file"
                multiple
                id="select-image"
                style={{ display: "none" }}
                onClick={valueRefreshHandler}
                onInput={chooseFiles}
            />
            <label htmlFor="select-image" className={style.bg}>
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                        background: "transparent",
                        boxShadow: "none",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}></Button>
            </label>
        </div>
    );
};

export default SelectFile;
