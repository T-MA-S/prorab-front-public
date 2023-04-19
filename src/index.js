import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import { AuthContextProvide } from "./store/auth-context";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.sass";
import { DeviceContextProvide } from "./store/device-context";
import { ModalsContextProvide } from "./store/modals-context";
import {Provider} from "react-redux";
import store from "./store/redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
	<BrowserRouter>
		<AuthContextProvide>
			<DeviceContextProvide>
				<ModalsContextProvide>
					<App />
				</ModalsContextProvide>
			</DeviceContextProvide>
		</AuthContextProvide>
	</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
