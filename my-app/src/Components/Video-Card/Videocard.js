import { Link } from "react-router-dom";
import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useLikeContext } from "../../Context/LikespageContext";

const { Title } = Typography;

function Videocard({ video, likeVideo }) {
  const { _id, title, videoUrl, creator_pic } = video;

  const { setLikesFn } = useLikeContext();

  const handleLike = () => {
    setLikesFn({ type: "ADD_TO_LIKES", payload: video });
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
        margin: "16px",
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
      <Row align="middle" style={{ marginTop: "8px" }}>
        <Col>
          <Avatar src={creator_pic} size={40} /> 
        </Col>
        <Col style={{ marginLeft: "8px" }}>
          <Title level={5} style={{ color: "white", margin: 0 }}>
            {title}
          </Title>{" "}
          {/* Video title */}
        </Col>
      </Row>
      <Button
        type="primary"
        icon={<HeartOutlined />}
        style={{ marginTop: "8px" }}
        onClick={() => likeVideo(video)}
      >
        Like
      </Button>
    </Card>
  );
}

export default Videocard;
