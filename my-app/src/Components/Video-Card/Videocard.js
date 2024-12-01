import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Для перехода
import { HeartOutlined } from "@ant-design/icons";
import DeleteVideoButton from "../VideoButtons/DeleteVideoButton";

const { Title } = Typography;

function Videocard({ video, likeVideo }) {
  const { id, title, videoUrl, creator_pic } = video;
  const navigate = useNavigate(); // Хук для навигации

  const handleCardClick = () => {
    navigate(`/video/${id}/edit`);
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        backgroundColor: "#1a202c",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={videoUrl}
          title={title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px 8px 0 0",
          }}
          allowFullScreen
        />
      </div>
      <Row
        onClick={handleCardClick}
        align="middle"
        style={{ marginTop: "8px" }}
      >
        <Col>
          <Avatar src={creator_pic} size={40} />
        </Col>
        <Col style={{ marginLeft: "8px" }}>
          <Title level={5} style={{ color: "white", margin: 0 }}>
            {title}
          </Title>
        </Col>
      </Row>
      <DeleteVideoButton
        videoId={video.id}
        onClick={(e) => {
          {
            e.stopPropagation();
          }
        }}
      />
      <Button
        type="primary"
        icon={<HeartOutlined />}
        style={{ marginTop: "8px" }}
        onClick={(e) => {
          e.stopPropagation();
          likeVideo(video);
        }}
      >
        Like
      </Button>
    </Card>
  );
}

export default Videocard;
