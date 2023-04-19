import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import CartProductTop from "./CartProductTop";
import CartFeedback from "./CartFeedback";
import Similar from "./Similar";
import { token } from "../../../App";
import "./CartProduct.sass";
import authContext from "../../../store/auth-context";
import getHost, { link } from "../../../store/host-store";

const CartProduct = (props) => {
    const ctx = useContext(authContext);

    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [userId, setUserId] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [isSimilar, setIsSimilar] = useState([]);

    const params = useParams();

    const urlProduct = `${link}/object/${
        ctx.isUserId ? `user-view?id=` + params.id + "&" : params.id + "?"
    }expand=user, images`;

    useEffect(() => {
        fetch(
            getHost({
                controller: "user",
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
                setUserId(result.data);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(urlProduct, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setProduct(result.data);
                console.log(result.data);
                setIsSimilar(result.data.id);
                return result.data;
            })
            .then((url) => {
                fetch(
                    getHost({
                        controller: "user",
                        action: url.user_id,
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
                        props.onUserData(result.data);
                        setUser(result.data);
                        return result.data;
                    });

                fetch(
                    getHost({
                        controller: "object",
                        action: `${ctx.isUserId ? "all" : ""}`,
                        filter: {
                            category_id: url.category_id,
                        },
                        expand: "user",
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
                        console.log(result);
                        setSimilar(result.data);
                    });

                fetch(
                    getHost({
                        controller: "mark",
                        filter: {
                            user_to_id: url.user_id,
                        },
                        expand: "userFrom",
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
                        setFeedback(result.data);
                        console.log(result.data)
                        props.getIdPage(params.id);
                    });
            });
    }, [urlProduct, ctx.rerender]);

    return (
        <>
            <CartProductTop product={product} user={user} />
            <CartFeedback feedback={feedback} setUserId={setUserId} userId={userId} />
            <Similar similar={similar} isSimilar={isSimilar} />
        </>
    );
};

export default CartProduct;
