import { useContext, useEffect, useState } from "react";

import ModalsContext from "../../../store/modals-context";
import DeviceContext from "../../../store/device-context";
import Loader from "../../../components/loader/Loader";
import ParentsCategories from "./ParentsCategories";
import getHost, { link } from "../../../store/host-store";
import Subcategories from "./Subcategories";
import { token } from "../../../App";
import Childrens from "./Childrens";
import s from "./style.module.sass";
import CustomScrollbar from "../../Scrollbar/CustomScrollbar";

const MainCategories = () => {
    const [categories, setCategorires] = useState([]);
    const [sublist, setSublist] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [currentSubcategory, setCurrentSubcategory] = useState({});
    const [childrens, setChildrens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState();
    const device = useContext(DeviceContext);
    const ctx = useContext(ModalsContext);

    const [page, setPage] = useState("main");

    useEffect(() => {
        fetch(`${link}/category?pagination=0&sort=title`, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setLoading(false);
                    setCategorires(result.data);
                }
            });
    }, []);

    const toggleParent = (category) => {
        if (device.isMobile) {
            setPage("list");
        }
        setType(category.type);
        setCurrentCategory(category);
        setCurrentSubcategory({});
        setSublist(categories.filter((item) => item.parent_id === category.id));
        setChildrens([]);
    };

    const toggleSub = (category) => {
        if (device.isMobile) {
            setPage("childrens");
        }
        setCurrentSubcategory(category);
        setChildrens(categories.filter((item) => item.parent_id === category.id));
    };

    return (
        <div className={s.categories}>
            {device.isMobile ? (
                <>
                    {page === "main" &&
                        (loading ? (
                            <Loader />
                        ) : (
                            <>
                                <button className={s.back_mob} onClick={ctx.toggleCategories}>
                                    Вернуться назад
                                </button>
                                <ParentsCategories
                                    categories={categories}
                                    toggleParent={toggleParent}
                                    currentCategory={currentCategory}
                                />
                            </>
                        ))}
                    {page === "list" && (
                        <>
                            <button className={s.back_mob} onClick={() => setPage("main")}>
                                Вернуться назад
                            </button>
                            <button className={s.btn_back} onClick={() => setPage("main")}>
                                Назад
                            </button>
                            <Subcategories
                                sublist={sublist}
                                currentCategory={currentCategory}
                                currentSubcategory={currentSubcategory}
                                type={type}
                                toggleSub={toggleSub}
                            />
                        </>
                    )}
                    {page === "childrens" && (
                        <>
                            <button className={s.back_mob} onClick={() => setPage("list")}>
                                Вернуться назад
                            </button>
                            <button className={s.btn_back} onClick={() => setPage("list")}>
                                Назад
                            </button>
                            <Childrens currentSubcategory={currentSubcategory} childrens={childrens} type={type} />
                        </>
                    )}
                </>
            ) : loading ? (
                <Loader />
            ) : (
                <>
                    <ParentsCategories
                        categories={categories}
                        toggleParent={toggleParent}
                        currentCategory={currentCategory}
                    />
                    {sublist.length > 0 && (
                        <CustomScrollbar>
                            <Subcategories
                                sublist={sublist}
                                currentCategory={currentCategory}
                                currentSubcategory={currentSubcategory}
                                type={type}
                                toggleSub={toggleSub}
                            />
                        </CustomScrollbar>
                    )}
                    {childrens.length > 0 && (
                        <CustomScrollbar>
                            <Childrens currentSubcategory={currentSubcategory} childrens={childrens} type={type} />
                        </CustomScrollbar>
                    )}
                </>
            )}
        </div>
    );
};

export default MainCategories;
