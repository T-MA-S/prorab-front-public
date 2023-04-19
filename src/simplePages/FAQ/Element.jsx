import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import style from "../style.module.scss";
import { Icon } from "./Icon";

const Element = ({ data }) => {
    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div className={style.acc}>
            {data.map((el) => {
                return (
                    <Accordion key={el.id}>
                        <AccordionSummary expandIcon={<Icon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography dangerouslySetInnerHTML={createMarkup(el.question)}></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography dangerouslySetInnerHTML={createMarkup(el.answer)}></Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
};

export default Element;
