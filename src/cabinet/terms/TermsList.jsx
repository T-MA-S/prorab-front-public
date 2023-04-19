import style from "./style.module.sass";

const TermsList = ({ data, setActivePage, setCurrentBlock, currentBlock }) => {
    const toggleContent = (title) => {
        setCurrentBlock(title);
        setActivePage("Item");
    };
    return (
        <div className={style.terms_list}>
            {data.map((el, i) => {
                return (
                    <div
                        key={el.title}
                        className={`${style.title} ${el.title === currentBlock ? style.active : ""}`}
                        onClick={() => toggleContent(el.title)}>
                        <span>0{i + 1}</span>
                        <p>{el.title}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TermsList;
