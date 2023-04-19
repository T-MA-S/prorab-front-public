import { Pagination } from "@mui/material";

const PaginationPattern = ({ pageCount, setChange, page = 1 }) => {
    return (
        <Pagination
            hideNextButton={true}
            shape={"rounded"}
            hidePrevButton={true}
            onChange={setChange}
            count={pageCount}
            page={page}
        />
    );
};

export default PaginationPattern;
