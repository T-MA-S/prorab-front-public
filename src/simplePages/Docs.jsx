import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const Docs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <ul className="docs-list">
                <li>
                    <NavLink to="/rules" className="item">
                        <span>1.</span>&nbsp;<p>Правила сервиса</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/userTerm" className="item">
                        <span>2.</span>&nbsp;<p>Пользовательское соглашение</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/privacy" className="item">
                        <span>3.</span>&nbsp;<p>Политика конфиденциальности</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/agreement" className="item">
                        <span>4.</span>&nbsp;<p>Согласие на обработку персональных данных</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/personalData" className="item">
                        <span>5.</span>&nbsp;<p>Правила политики обработки персональных данных</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Docs;
