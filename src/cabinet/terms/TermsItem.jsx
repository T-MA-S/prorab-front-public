import style from "./style.module.sass";
import CustomScrollbar from "../../UI/Scrollbar/CustomScrollbar";

const TermsItem = ({ data, currentBlock }) => {
    const content = data.find((el) => el.title === currentBlock);

    return (
        <div className={`${style.terms_item} cabinet__terms_list`}>
            <CustomScrollbar>
                <div className={style.terms__content_wrapper}>
                    <div>{content.content}</div>
                </div>
            </CustomScrollbar>
        </div>
    );
};

export default TermsItem;
