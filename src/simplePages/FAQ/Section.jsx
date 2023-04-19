import { ThemeProvider, createTheme } from "@mui/material/styles";
import style from "./style.module.scss";
import Element from "./Element";

let theme = createTheme();
theme = createTheme(theme, {
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down("md")]: {
                        padding: "0 13px",
                    },
                    padding: "0 38px",
                },
                content: {
                    [theme.breakpoints.down("md")]: {
                        margin: "10px 0",
                    },
                    margin: "24px 0",
                    "&.Mui-expanded": {
                        [theme.breakpoints.down("md")]: {
                            margin: "10px 0",
                        },
                        margin: "24px 0",
                    },
                    "& .MuiTypography-body1": {
                        fontWeight: "600",
                        [theme.breakpoints.down("md")]: {
                            fontSize: "14px",
                            lineHeight: "17px",
                        },
                        fontSize: "24px",
                        lineHeight: "29px",
                        fontFamily: "Gilroy",
                        color: "#546EDB",
                    },
                },
                expandIconWrapper: {
                    [theme.breakpoints.down("md")]: {
                        "& svg": {
                            width: "28px",
                            height: "28px",
                        },
                    },
                    "&.Mui-expanded": {
                        transform: "rotate(45deg)",
                        "& circle": {
                            fill: "#546EDB",
                        },
                    },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    ":first-of-type": {
                        borderRadius: "15px 15px 15px 15px",
                    },
                    ":last-of-type": {
                        borderRadius: "15px 15px 15px 15px",
                    },
                    "::before": {
                        display: "none",
                    },
                    boxShadow: "none",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    marginBottom: "15px",
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down("md")]: {
                        padding: "13px",
                        gap: "8px",
                    },
                    padding: "17px 38px",
                    gap: "20px",
                    "& .MuiTypography-root": {
                        fontFamily: "Gilroy",
                        lineHeight: "20px",
                        [theme.breakpoints.down("md")]: {
                            fontSize: "13px",
                        },
                    },
                },
            },
        },
        MuiCollapse: {
            styleOverrides: {
                entered: {
                    transition: "border-top .3s ease-in-out",
                    borderTop: "1px solid #DEDEDE",
                },
            },
        },
    },
});

const Section = ({ title, elements, id }) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <h2>{title}</h2>
                <Element data={elements.filter((el) => el.section_id === id)} />
            </ThemeProvider>
        </div>
    );
};

export default Section;
