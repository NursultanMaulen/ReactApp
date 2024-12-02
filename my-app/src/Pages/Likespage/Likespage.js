import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Row, Col, Spin } from "antd";
import { Footer, Header, Sidebar } from "../../Components/IndexAllComponents";
import { useLoginSignupContext } from "../../Context/LoginSignupContext";

const { Content } = Layout;
const { Title } = Typography;

function LikesPage() {
  const { loginData, isAuthenticated } = useLoginSignupContext();
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
            padding: "24px",
            marginTop: "60px",
            marginBottom: "80px",
            marginLeft: "150px",
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
                <Card
                  title={video.title}
                  hoverable
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="200"
                    src={video.videoUrl}
                    frameBorder="0"
                    allowFullScreen
                    title={video.title}
                    style={{ borderRadius: "8px 8px 0 0" }}
                  ></iframe>
                </Card>
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
