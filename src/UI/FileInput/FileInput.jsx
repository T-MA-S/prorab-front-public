import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

import { IncorrectIcon } from "../../components/icons/IncorrectIcon";
import { CorrectIcon } from "../../components/icons/CorrectIcon";
import "react-image-crop/src/ReactCrop.scss";
import style from "./style.module.sass";
import "./fileinput.sass";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

function FileInput({ getImg }) {
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const blobUrlRef = useRef("");
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const scale = 1;
    const rotate = 0;
    const aspect = 1;

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error("Crop canvas does not exist");
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error("Failed to create blob");
            }
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
            const newPhoto = new File([blob], "avatar.png", { type: "image/png" });
            getImg(newPhoto);
            setImgSrc("");
        });
    }

    useDebounceEffect(
        async () => {
            if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
                canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
            }
        },
        0,
        [completedCrop, scale, rotate]
    );

    const closeModal = () => {
        setImgSrc("");
    };

    return (
        <div className={style.fileinput}>
            <div className={style.input_wrapper}>
                <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{ display: "none" }}
                    onChange={onSelectFile}
                />
                <label htmlFor="select-image" className="select__image">
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
            {!!imgSrc && (
                <div className={style.fileinput__modal_overlay}>
                    <span className={style.fileinput__modal_overlay_close} onClick={closeModal}></span>
                    <div className={style.fileinput__modal}>
                        <h4>Загрузка фотографии</h4>
                        <p className={style.descr}>Поместите фото профиля в выбранную область</p>
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}>
                            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
                        </ReactCrop>

                        {!!completedCrop && (
                            <>
                                <div className={style.canvas}>
                                    <canvas ref={previewCanvasRef} />
                                </div>

                                <div className={style.btns}>
                                    <div
                                        className={`${style.btn__wrapper} ${style.btn__wrapper_save}`}
                                        onClick={onDownloadCropClick}>
                                        <p className={style.btn__wrapper__text}>Сохранить</p>
                                        <span className={style.btn__save}>
                                            <CorrectIcon />
                                        </span>
                                    </div>
                                    <div
                                        className={`${style.btn__wrapper} ${style.btn__wrapper_cancel}`}
                                        onClick={closeModal}>
                                        <p className={style.btn__wrapper__text}>Отмена</p>
                                        <span className={style.btn__cancel}>
                                            <IncorrectIcon />
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
    const TO_RADIANS = Math.PI / 180;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = 1;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.rotate(rotateRads);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

    ctx.restore();
}

function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
}

export default FileInput;
