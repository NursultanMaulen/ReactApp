import { NavLink as Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, SearchOutlined, LikeOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider
      width={150}
      style={{
        height: "calc(100vh - 60px)",
        position: "fixed",
        top: 60,
        left: 0,
        background: "#fff",
      }}
    >
      <Menu mode="inline" style={{ height: "100%" }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<SearchOutlined />}>
          <Link to="/explore">Explore</Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<LikeOutlined />}>
          <Link to="/likes">Likes</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
