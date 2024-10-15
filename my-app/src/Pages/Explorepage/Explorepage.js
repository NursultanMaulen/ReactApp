import React from "react";
import { useExplorePageContext } from "../../Context/ExplorepageContext"; // Adjust the import path
import Videocard from "../../Components/Video-Card/Videocard"; // Adjust the import path
import Sidebar from "../../Components/Sidebar/Sidebar"; // Adjust the import path
import Header from "../../Components/Header/Header"; // Adjust the import path
import Footer from "../../Components/Footer/Footer"; // Adjust the import path
import { Layout, Spin, Row, Col } from "antd";

const { Content } = Layout;

function ExplorePage() {
  const { state, likeVideo } = useExplorePageContext();
  const { videosdata, isLoading } = state;

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ background: "#fff" }}>
        {" "}
        <Header />
        <Content style={{ padding: "24px" }}>
          <Row gutter={[16, 16]} justify="center">
            {videosdata.map((video) => (
              <Col key={video._id} xs={24} sm={12} md={8} lg={6}>
                <Videocard video={video} likeVideo={likeVideo} />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default ExplorePage;
