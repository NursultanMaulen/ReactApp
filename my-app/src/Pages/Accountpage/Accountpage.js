import React from "react";
import { Layout } from "antd";
import {
  Accountdetails,
  Footer,
  Header,
  Sidebar,
} from "../../Components/IndexAllComponents";

const { Content } = Layout;

function Accountpage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />

      <Layout style={{ marginTop: "60px" }}>
        {" "}
        <Sidebar />
        <Layout style={{ padding: "24px", marginLeft: "250px" }}>
          {" "}
          <Content style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Accountdetails />
          </Content>
        </Layout>
      </Layout>

      {/* Footer */}
      <Footer />
    </Layout>
  );
}

export default Accountpage;
