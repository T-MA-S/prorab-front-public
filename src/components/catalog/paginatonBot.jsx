import React from "react";
import "./catalog.sass";
import { Pagination } from "@mui/material";
import { paginationMaxPageCount } from "./Catalog";

const PaginationBot = (props) => {
    const handlePaginate = (event, value) => {
        props.getPage(value);
        props.sets([]);
    };

    return (
        <Pagination
            shape={"rounded"}
            hideNextButton={true}
            hidePrevButton={true}
            onChange={handlePaginate}
            count={paginationMaxPageCount}
        />
    );
};

export default PaginationBot;
