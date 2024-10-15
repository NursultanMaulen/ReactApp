import { Link } from "react-router-dom";
import { useExplorePageContext } from "../../Context/IndexAllContext";
import { Layout, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdLogin, MdAccountCircle } from "react-icons/md";

const { Header: AntHeader } = Layout;

function Header() {
  const { dispatch } = useExplorePageContext();
  const token = localStorage.getItem("token");

  return (
    <AntHeader style={{ background: "#fff", padding: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "64px",
          padding: "0 20px",
        }}
      >
        <Link to="/" style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={require("../../assets/delivery-box.png")}
              alt="logo"
              style={{ marginRight: "8px", height: "40px", width: "40px" }}
            />
            <span
              style={{ fontSize: "24px", fontWeight: "bold", color: "purple" }}
            >
              Stream
            </span>
            <span
              style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}
            >
              Box
            </span>
          </div>
        </Link>

        <div style={{ flex: 1, margin: "0 20px" }}>
          <Input
            placeholder="Search item"
            style={{ maxWidth: "600px", width: "100%" }}
            onChange={(e) => {
              dispatch({ type: "SEARCHBAR", payload: e.target.value });
              console.log(e.target.value);
            }}
            suffix={<SearchOutlined />}
          />
        </div>

        <div style={{ flexShrink: 0 }}>
          {!token ? (
            <Link to="/login">
              <Button type="primary" icon={<MdLogin />}>
                Login
              </Button>
            </Link>
          ) : (
            <Link to="/accounts">
              <Button type="primary" icon={<MdAccountCircle />}>
                Account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AntHeader>
  );
}

export default Header;
