import style from "./style.module.scss";

const VideoModal = () => {
    return (
        <div className="modal">
            <iframe
                className={style.frame}
                width="560"
                height="515"
                src="https://www.youtube.com/embed/v9pekZ6R8t4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
        </div>
    );
};

export default VideoModal;
