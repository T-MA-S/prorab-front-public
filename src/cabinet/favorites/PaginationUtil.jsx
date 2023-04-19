import { Pagination } from "@mui/material";

const PaginationUtil = ({ count, setPage }) => {
    const handlePaginate = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    return (
        <Pagination
            shape={"rounded"}
            hideNextButton={true}
            hidePrevButton={true}
            onChange={handlePaginate}
            count={count}
        />
    );
};

export default PaginationUtil;
