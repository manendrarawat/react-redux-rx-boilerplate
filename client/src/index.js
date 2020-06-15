import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from 'src/store';

import App from 'src/app.jsx';

render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("app"));
