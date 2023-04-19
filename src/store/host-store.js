export const link = `https://api.foreman-go.ru`; // ЕСЛИ ЛЬЕМ НА MAIN
// export const link = `http://formantestapi.tw1.ru`; // ЕСЛИ ЛЬЕМ НА ТЕСТ
// export const frontLink = `http://formantestfront.tw1.ru`; // ЕСЛИ ЛЬЕМ НА ТЕСТ
export const frontLink = `https://foreman-go.ru`; // ЕСЛИ ЛЬЕМ НА MAIN
export const url = `${link}/uploads/`;

function getHost(object) {
    const keys = Object.keys(object); // ['filter', 'expand']

    const controllerStr = object.controller;
    const actionStr = object.action !== undefined ? `/${object.action}` : "";
    let filterStr = "";
    let expandStr = "";
    let paginationStr = "";
    let pageStr = "";
    let idStr = "";
    let phoneStr = "";

    keys.forEach((el) => {
        switch (el) {
            case "filter":
                const filterKeys = Object.keys(object[el]); // ['depth', 'id']
                filterKeys.forEach((key) => {
                    filterStr += `&filter[${key}]=${object[el][key]}`;
                });
                return filterStr;
            case "expand":
                expandStr = `&expand=${object[el]}`;
                return expandStr;
            case "id":
                idStr = `&id=${object[el]}`;
                return idStr;
            case "phone":
                phoneStr = `&phone=${object[el]}`;
                return phoneStr;
            case "pagination":
                if (typeof object[el] === "number") {
                    paginationStr += `&pagination=${object[el]}`;
                } else if (typeof object[el] === "object") {
                    const paginationKeys = Object.keys(object[el]); // ['pageSize', 'page']
                    paginationKeys.forEach((key) => {
                        switch (key) {
                            case "pageSize":
                                return (paginationStr += `&pagination[pageSize]=${object[el][key]}`);
                            case "page":
                                return (pageStr += `&page=${object[el][key]}`);
                            default:
                        }
                    });
                }
                break;
            default:
        }
    });

    return `${link}/${controllerStr}${actionStr}?${idStr}${phoneStr}${expandStr}${filterStr}${paginationStr}${pageStr}`;
}

export default getHost;
