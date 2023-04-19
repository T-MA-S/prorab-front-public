import { useContext, useState } from "react";

import ModalsContext from "../../../../store/modals-context";
import SearchingResults from "./SearchingResults";
import style from "./style.module.sass";

const Searching = () => {
    const [input, setInput] = useState("");
    const modal = useContext(ModalsContext);

    const onSearch = (e) => {
        e.preventDefault();
        modal.closeModal();
        //переадресация на страницу
        window.location.replace(`/search?q=${input}`);
    };

    return (
        <div className={style.searching}>
            <form className={style.searching__form} onSubmit={onSearch}>
                <input
                    type="search"
                    placeholder="Поиск по объявлениям"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={modal.searchingModal}></input>
                <button type="submit"></button>
            </form>
            {modal.openModal === "searching" && <SearchingResults value={input} setInput={setInput} />}
        </div>
    );
};

export default Searching;
