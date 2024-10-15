import React from "react";
import { Layout, Row, Col } from "antd";
import {
  Footer,
  Header,
  Hero,
  Sidebar,
} from "../../Components/IndexAllComponents";

const { Content } = Layout;

function Homepage() {
  return (
    <Layout style={{ minHeight: "100vh", height: "100%" }}>
      <Header />
      <Layout style={{ background: "#fff" }}>
        <Row style={{ height: "100%" }}>
          <Col
            xs={24}
            md={6}
            style={{ padding: "16px", display: { base: "none", md: "block" } }}
          >
            <Sidebar /> {/* Sidebar only shown on medium and larger screens */}
          </Col>

          <Col xs={24} md={18}>
            <Content
              style={{
                padding: "24px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "10vh",
              }}
            >
              <Hero />
            </Content>
          </Col>
        </Row>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Homepage;
