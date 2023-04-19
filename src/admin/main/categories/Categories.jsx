import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";

import noPhoto from "../../../assets/images/stubs/object-mob.png";
import { EditIcon } from "../../../components/icons/EditIcon";
import { AddIcon } from "../../../components/icons/AddIcon";
import getHost, { url } from "../../../store/host-store";
import Loader from "../../../components/loader/Loader";
import { token } from "../../../App";

let theme = createTheme();
theme = createTheme(theme, {
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: "0",
                },
                content: {
                    [theme.breakpoints.down("md")]: {
                        margin: "10px 0",
                    },
                    margin: "0",
                    "&.Mui-expanded": {
                        margin: "0",
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "::before": {
                        display: "none",
                    },
                    boxShadow: "none",
                    "&.Mui-expanded": {
                        margin: "0",
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: "0",
                },
            },
        },
    },
});

const Categories = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(
            getHost({
                controller: "category",
                action: "admin-list",
                filter: {
                    depth: 0,
                },
            }),
            {
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result.data);
                if (result.success) {
                    setCategory(result.data);
                }
            });
    }, []);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (category.length > 0) {
        return (
            <div className="admin__layout">
                <h3>Категории</h3>
                <div className="admin__list-titles admin__list-titles_categories">
                    <p>Фото</p>
                    <p>Название</p>
                    <p>Объявлений</p>
                    <p>Подкатегорий</p>
                </div>
                <ThemeProvider theme={theme}>
                    {category.map((el) => (
                        <Accordion key={el.id} expanded={expanded === el.id} onChange={handleChange(el.id)}>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <div className="admin__content-card admin__content-card_categories" key={el.id}>
                                    {el.image === null ? (
                                        <img src={noPhoto} alt="category" />
                                    ) : (
                                        <img src={url + el.image} alt="category" />
                                    )}
                                    <p>{el.title}</p>
                                    <p>{el.objectCount}</p>
                                    <p>{el.amountOfChildren}</p>
                                    <div className="admin__content-card_btns">
                                        <NavLink
                                            to={{
                                                pathname: `add/${el.id}`,
                                            }}
                                            state={{ parent_id: el.id, type: el.type, depth: el.depth }}>
                                            <AddIcon />
                                        </NavLink>
                                        <NavLink to={`edit/${el.id}`}>
                                            <EditIcon />
                                        </NavLink>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {el.children.map((subcategory) => {
                                    return subcategory.type !== 2 ? (
                                        <Accordion key={subcategory.id} className="admin__content-card_subwrapper">
                                            <AccordionSummary>
                                                <div className="admin__content-card admin__content-card_subcategories">
                                                    {subcategory.image === null ? (
                                                        <img src={noPhoto} alt="category" />
                                                    ) : (
                                                        <img src={url + subcategory.image} alt="category" />
                                                    )}
                                                    <p>{subcategory.title}</p>
                                                    <p>{subcategory.objectCount}</p>
                                                    <p>{subcategory.amountOfChildren}</p>
                                                    <div className="admin__content-card_btns">
                                                        <NavLink
                                                            to={{
                                                                pathname: `add/${subcategory.id}`,
                                                            }}
                                                            state={{
                                                                type: subcategory.type,
                                                                parent_id: subcategory.id,
                                                                depth: subcategory.depth,
                                                            }}>
                                                            <AddIcon />
                                                        </NavLink>
                                                        <NavLink to={`edit/${subcategory.id}`}>
                                                            <EditIcon />
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="admin__content-card_childwrapper">
                                                    {subcategory.children.map((children) => {
                                                        return (
                                                            <div
                                                                key={children.id}
                                                                className="admin__content-card admin__content-card_childrens">
                                                                <p>{children.title}</p>
                                                                <p>{children.objectCount}</p>
                                                                <div className="admin__content-card_btns">
                                                                    <NavLink to={`edit/${children.id}`}>
                                                                        <EditIcon />
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    ) : (
                                        <div key={subcategory.id} className="admin__content-card_subwrapper">
                                            <div className="admin__content-card admin__content-card_subcategories">
                                                {subcategory.image === null ? (
                                                    <img src={noPhoto} alt="category" />
                                                ) : (
                                                    <img src={url + subcategory.image} alt="category" />
                                                )}
                                                <p>{subcategory.title}</p>
                                                <p>{subcategory.objectCount}</p>
                                                <div></div>
                                                <div className="admin__content-card_btns">
                                                    <NavLink
                                                        to={`add/${subcategory.id}`}
                                                        state={{
                                                            type: subcategory.type,
                                                            parent_id: subcategory.id,
                                                            depth: subcategory.depth,
                                                        }}>
                                                        <AddIcon />
                                                    </NavLink>
                                                    <NavLink to={`edit/${subcategory.id}`}>
                                                        <EditIcon />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </ThemeProvider>
            </div>
        );
    } else {
        return (
            <div className="admin__layout">
                <Loader />
            </div>
        );
    }
};

export default Categories;
