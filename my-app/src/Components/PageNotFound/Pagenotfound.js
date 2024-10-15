import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Image, Space, Layout } from "antd";
import Footer from "../Footer/Footer"; // Assuming Footer remains unchanged
import Header from "../Header/Header"; // Assuming Header remains unchanged

const { Title, Text } = Typography;
const { Content } = Layout;

function Pagenotfound() {
  const [counter, setCounter] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 1100);

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [counter, navigate]);

  return (
    <Layout>
      <Header />
      <Content
        style={{
          textAlign: "center",
          minHeight: "100vh",
          padding: "24px",
          background: "#f0f2f5",
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ color: "#40a9ff", fontSize: "28px" }}>
            {" "}
            {/* Smaller Title */}
            Page Not Found
          </Title>
          <Text style={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.65)" }}>
            {" "}
            {/* Smaller Text */}
            Oops! The page you're looking for does not exist.
          </Text>
          <Text style={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.45)" }}>
            {" "}
            {/* Smaller Text */}
            You will be redirected to the homepage in {counter} seconds.
          </Text>
          <Image
            src="https://svgshare.com/i/hXD.svg"
            alt="404"
            preview={false}
            style={{ maxWidth: "300px", marginTop: "24px" }} // Smaller Image
          />
          <Button type="primary" size="small" onClick={() => navigate("/")}>
            {" "}
            {/* Smaller Button */}
            Go to Homepage
          </Button>
        </Space>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Pagenotfound;