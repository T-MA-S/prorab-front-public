import { useState, useContext, useEffect } from "react";

import "../cabinet.sass";
import { token } from "../../App";
import DesktopAdsPage from "./DesktopAdsPage";
import AuthContext from "../../store/auth-context";
import getHost from "../../store/host-store";

const AdsMainPage = (props) => {
    const [category, setCategory] = useState([]);
    const [activeToggle, setActiveToggle] = useState(false);
    const ctx = useContext(AuthContext);

    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
                action: "account-list",
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
                if (result.success){
                    setCategory(result.data);
                }else{
                    if(result.status === 401){
                        localStorage.removeItem("token");
                        window.location.replace("/login");
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [ctx.rerender]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const deactivateHandler = (event, status) => {
        let data = {
            status: status === 1 ? 3 : 1,
            active: status === 0 ? 0 : 1,
        };
        fetch(
            getHost({
                controller: "object",
                action: event,
            }),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data),
            }
        )
        setActiveToggle(false);
    };

    const deleteHandler = async (event) => {
        await fetch(
            getHost({
                controller: "object",
                action: event,
            }),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ status: 4 }),
            }
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data);
                console.log(event);
            });
        await ctx.setRerender((prev) => !prev);
        setActiveToggle(false);
    };

    return (
        <>
            <DesktopAdsPage
                category={category}
                deactivateHandler={deactivateHandler}
                deleteHandler={deleteHandler}
                setActiveToggle={setActiveToggle}
                activeToggle={activeToggle}
            />
        </>
    );
};

export default AdsMainPage;
