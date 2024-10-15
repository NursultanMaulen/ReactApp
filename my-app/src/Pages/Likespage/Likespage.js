import React from "react";
import { useMemo } from "../../Utils/CustomUtils";
import { Layout, Typography, Card } from "antd";
import { Footer, Header, Sidebar } from "../../Components/IndexAllComponents";
import { useLikeContext } from "../../Context/LikespageContext";

const { Content } = Layout;
const { Title } = Typography;

function Likespage() {
  const { getLikedVideos } = useLikeContext();
  const likedVideos = useMemo(() => getLikedVideos, [getLikedVideos]);
  return (
    <div>
      <Header />

      <Layout style={{ marginTop: "60px", background: "#fff" }}>
        <Sidebar />
        <Layout
          style={{ padding: "24px", marginLeft: "250px", background: "#fff" }}
        >
          <Content style={{ maxWidth: "1200px" }}>
            <Title level={2}>
              {false ? "Liked Videos" : "You haven’t liked any videos yet."}
            </Title>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            ></div>
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </div>
  );
}

export default Likespage;
