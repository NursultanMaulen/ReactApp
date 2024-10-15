import React from "react";
import {
  Footer,
  Header,
  Logininputs,
  Sidebar,
} from "../../Components/IndexAllComponents";

function Loginpage() {
  return (
    <div>
      <Header />
      <div
        className="login-page-sidebar"
        style={{ display: "flex", marginLeft: "10rem" }}
      >
        <Sidebar />
        <Logininputs />
      </div>
      <Footer />
    </div>
  );
}

export default Loginpage;
