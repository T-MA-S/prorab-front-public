import React from "react";

const UseLazy = (url) => {
    return(
        React.lazy(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return import('../../' + url)
        })
    )
}

export default UseLazy;