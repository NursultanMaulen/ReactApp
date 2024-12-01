import { NavLink as Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, SearchOutlined, LikeOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider
      width={150}
      style={{
        height: "calc(100vh - 60px)", // Высота экрана минус Header
        position: "fixed",
        top: 60, // Учитываем Header
        left: 0,
        background: "#fff",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)", // Добавим тень для визуального разделения
        zIndex: 1000, // Убедимся, что Sidebar выше других элементов
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
