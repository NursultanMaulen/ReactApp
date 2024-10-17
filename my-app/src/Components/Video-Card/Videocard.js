import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useLikeContext } from "../../Context/LikespageContext";

const { Title } = Typography;

function Videocard({ video, likeVideo }) {
  const { _id, title, videoUrl, creator_pic } = video;
  const { setLikesFn } = useLikeContext();

  const [videoTitle, setVideoTitle] = useState(title);

  const memoizedVideo = useMemo(() => {
    console.log("Memoized video data", videoTitle);
    return { ...video, title: videoTitle };
  }, [video, videoTitle]);

  const handleLike = () => {
    setLikesFn({ type: "ADD_TO_LIKES", payload: memoizedVideo });
  };

  const handleChangeTitle = () => {
    setVideoTitle((prevTitle) =>
      prevTitle === "New Video Title" ? "New Video Title" : "New Video Title"
    );
  };

  console.log("Component rendered");

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
          title={videoTitle}
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
            {videoTitle}
          </Title>
        </Col>
      </Row>
      <Button
        type="primary"
        icon={<HeartOutlined />}
        style={{ marginTop: "8px" }}
        onClick={handleLike}
      >
        Like
      </Button>

      <Button
        type="default"
        style={{ marginTop: "8px" }}
        onClick={handleChangeTitle}
      >
        Change Video Title
      </Button>
    </Card>
  );
}

export default Videocard;
