import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Row, Col, Spin } from "antd";
import { Footer, Header, Sidebar } from "../../Components/IndexAllComponents";
import { useLoginSignupContext } from "../../Context/LoginSignupContext";
import Videocard from "../../Components/Video-Card/Videocard";
import { useExplorePageContext } from "../../Context/ExplorepageContext";

const { Content } = Layout;
const { Title } = Typography;

function LikesPage() {
  const { loginData, isAuthenticated } = useLoginSignupContext();
  const { state, fetchVideos, likeVideo } = useExplorePageContext();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      if (isAuthenticated && loginData) {
        try {
          const userId = loginData.id;

          // Fetch user data to get updated liked videos
          const userResponse = await fetch(
            `http://localhost:3001/users/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await userResponse.json();

          // Fetch all videos from API
          const videosResponse = await fetch("http://localhost:3001/videos");
          if (!videosResponse.ok) {
            throw new Error("Failed to fetch videos");
          }
          const allVideos = await videosResponse.json();

          // Filter liked videos based on userData
          const filteredVideos = allVideos.filter((video) =>
            userData.likedVideos.includes(video.id)
          );
          setVideos(filteredVideos);
        } catch (error) {
          console.error("Error fetching liked videos:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchLikedVideos();
  }, [isAuthenticated, loginData]);

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
      <Layout>
        <Sidebar />
        <Content
          style={{
            // padding: "24px",
            // marginTop: "60px",
            // marginBottom: "80px",
            // marginLeft: "150px",
            backgroundColor: "#fff",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            {videos.length > 0
              ? "Liked Videos"
              : "You haven’t liked any videos yet."}
          </Title>
          <Row gutter={[16, 16]} justify="center">
            {videos.map((video) => (
              <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
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

export default LikesPage;
