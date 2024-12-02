import React, { useEffect } from "react";
import { useExplorePageContext } from "../../Context/ExplorepageContext";
import Videocard from "../../Components/Video-Card/Videocard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AddVideoButton from "../../Components/VideoButtons/AddVideoButton";
import { Layout, Spin, Row, Col } from "antd";
import { useLoginSignupContext } from "../../Context/IndexAllContext"; // Импортируем контекст авторизации

const { Content } = Layout;

function ExplorePage() {
  const { state, fetchVideos, likeVideo } = useExplorePageContext();
  const { videosdata, isLoading } = state;

  const { state: authState } = useLoginSignupContext(); // Достаем состояние авторизации
  const { isAuthenticated } = authState;

  useEffect(() => {
    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Header />
      <Layout style={{ background: "#fff" }}>
        <Sidebar />
        <Content style={{ padding: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <AddVideoButton disabled={!isAuthenticated} />
          </div>
          <Row gutter={[16, 16]} justify="center">
            {videosdata.map((video) => (
              <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
                <Videocard video={video} likeVideo={likeVideo} />
              </Col>
            ))}
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default ExplorePage;
