import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import CreateCategory from "./main/categories/CreateCategory";
import ArticleCreate from "./main/blog/create/ArticleCreate";
import EditCategory from "./main/categories/EditCategory";
import Categories from "./main/categories/Categories";
import DeviceContext from "../store/device-context";
import OneObject from "./main/objects/OneObject";
import CreateRole from "./main/roles/CreateRole";
import AdminOneUser from "./main/users/OneUser";
import Objects from "./main/objects/Objects";
import Support from "./main/support/Support";
import EditRole from "./main/roles/EditRole";
import AdminAside from "./aside/AdminAside";
import AdminInfo from "./main/AdminInfo";
import Blog from "./main/blog/main/Blog";
import Users from "./main/users/Users";
import Roles from "./main/roles/Roles";
import AdminStatistic from "./main/AdminStatistic";
import AdminReports from "./main/AdminReports";
import AdminMailing from "./main/AdminMailing";
import AdminPromo from "./main/AdminPromo";
import ArticleEdit from "./main/blog/create/ArticleEdit";
import Funds from "./main/charity/main/Funds";
import FundCreate from "./main/charity/create/FundCreate";
import FundEdit from "./main/charity/create/FundEdit";

const Admin = () => {
    const device = useContext(DeviceContext);

    return (
        <section className="container">
            <div className="cabinet__box">
                {device.openAside && <AdminAside />}
                <div className="admin">
                    {device.isMobile && (
                        <button className="open-admin-menu" onClick={device.toggleAside}>
                            <div className="line">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            Меню
                        </button>
                    )}

                    <Routes>
                        <Route path="/" element={<AdminInfo />}></Route>

                        <Route path="/objects" element={<Objects />}></Route>
                        <Route path="/objects/:id" element={<OneObject />}></Route>

                        <Route path="/users" element={<Users />}></Route>
                        <Route path="/users/:id" element={<AdminOneUser />}></Route>

                        <Route path="/category" element={<Categories />}></Route>
                        <Route path="category/edit/:id" element={<EditCategory />}></Route>
                        <Route path="category/add/:id" element={<CreateCategory />}></Route>

                        <Route path="/support" element={<Support />}></Route>

                        <Route path="/roles" element={<Roles />}></Route>
                        <Route path="roles/edit/:id" element={<EditRole />}></Route>
                        <Route path="roles/create" element={<CreateRole />}></Route>
                        <Route path="blog" element={<Blog />}></Route>
                        <Route path="blog/edit/:id" element={<ArticleEdit />}></Route>
                        <Route path="blog/create" element={<ArticleCreate />}></Route>
                        <Route path="charity" element={<Funds />}></Route>
                        <Route path="charity/create" element={<FundCreate />}></Route>
                        <Route path="charity/edit/:id" element={<FundEdit />}></Route>

                        {/* <Route path="/promo" element={<AdminPromo data={dataUsers} />}></Route>
                        <Route path="/reports" element={<AdminReports data={dataUsers} />}></Route>
                        <Route path="/mailing" element={<AdminMailing data={dataUsers} />}></Route>
                        <Route path="/statistic" element={<AdminStatistic data={dataUsers} />}></Route> */}
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default Admin;
