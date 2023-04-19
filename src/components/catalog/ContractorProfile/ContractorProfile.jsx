import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import DeviceContext from "../../../store/device-context";
import AuthContext from "../../../store/auth-context";
import getHost from "../../../store/host-store";
import UserFeedback from "./UserFeedback";
import Loader from "../../loader/Loader";
import ObjectsList from "./ObjectsList";
import { isAppstore, token } from "../../../App";
import UserInfo from "./UserInfo";
import Types from "./Types";
import ArrowBack from "../../../cabinet/request/svg/ArrowBack";

const ContractorProfile = () => {
    const params = useParams();
    const id = params.id;
    const device = useContext(DeviceContext);
    const ctx = useContext(AuthContext);
    const [type, setType] = useState(0);
    const [category, setCategory] = useState([]);
    const [objectsData, setObjectsData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1); // Страница пагинации
    const [loading, setLoading] = useState(true);
    const [rerender, setRerender] = useState(false);

    let fetchLink = ctx.userData?.id
        ? getHost({
              controller: "object",
              action: "all",
              filter: {
                  user_id: id,
                  type,
              },
          })
        : getHost({
              controller: "object",
              filter: {
                  user_id: id,
                  type,
              },
          });

    fetchLink += device.isMobile ? `&pagination[pageSize]=4&page=${page}` : "";

    const toggleCategory = () => {
        setLoading(true);
        fetch(fetchLink, {
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json().then((data) => ({ data, headers: res.headers })))
            .then((result) => {
                console.log("objects", result);
                setLoading(false);
                if (result.data.success) {
                    setObjectsData(result.data.data);
                    setPageCount(parseInt(result.headers.get("X-Pagination-Page-Count")));
                }
            });
    };

    useEffect(() => {
        fetch(
            getHost({
                controller: "category",
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
                console.log("category:", result);
                setLoading(false);
                if (result.success) {
                    setCategory(result.data);
                }
            });

        fetch(
            getHost({
                controller: "user",
                action: "guest-view",
                id,
                expand: "marksTo, marksTo.userFrom, favourites",
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
                console.log("userInfo", result);
                setLoading(false);
                if (result.success) {
                    setUserData(result.data);
                }
            });
    }, []);

    useEffect(() => {
        toggleCategory(type);
    }, [type, rerender]);

    const navigate = useNavigate();

    return loading ? (
        <Loader />
    ) : (
        <>
            {isAppstore && (
                <div className="container">
                    <button className="app__back_btn" onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
                        <ArrowBack />
                        Вернуться назад
                    </button>
                </div>
            )}
            <UserInfo data={userData} />
            <div className="container">
                <Types toggleCategory={setType} type={type} category={category} />
                <ObjectsList
                    data={objectsData}
                    pageCount={pageCount}
                    setPage={setPage}
                    userMark={userData?.mark}
                    setRerender={setRerender}
                />
                {userData?.marksTo?.length > 0 && <UserFeedback data={userData?.marksTo} />}
            </div>
        </>
    );
};

export default ContractorProfile;
