import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import DeleteVideoButton from "../VideoButtons/DeleteVideoButton";
import { useLoginSignupContext } from "../../Context/IndexAllContext";

const { Title } = Typography;

function Videocard({ video }) {
  const { id, title, videoUrl, creator_pic } = video;
  const navigate = useNavigate();

  const { state, handleLikeVideo } = useLoginSignupContext();
  const { likedVideos, isAuthenticated } = state;

  const handleCardClick = () => {
    if (isAuthenticated) {
      navigate(`/video/${id}/edit`);
    }
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
        onClick={isAuthenticated ? handleCardClick : null}
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
          e.stopPropagation();
        }}
      />
      <Button
        type="primary"
        icon={likedVideos.includes(id) ? <HeartFilled /> : <HeartOutlined />}
        style={{ margin: "8px" }}
        disabled={!isAuthenticated}
        onClick={(e) => {
          e.stopPropagation();
          handleLikeVideo(id);
        }}
      >
        {likedVideos.includes(id) ? "Liked" : "Like"}
      </Button>
    </Card>
  );
}

export default Videocard;
