import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Pagestructure from "./Pagestructure";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Pagestructure />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
