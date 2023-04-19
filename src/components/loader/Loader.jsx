import s from "./style.module.scss";

const Loader = () => {
    // Реализация через css bg, тк при тестах контентное подгружается слишком долго
    return (
        <div className={s.loader}>
            <div className={s.loader_img}></div>
        </div>
    );
};

export default Loader;
