import { useExplorePageContext } from "../../Context/ExplorepageContext";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useLoginSignupContext } from "../../Context/LoginSignupContext";

function DeleteVideoButton({ videoId }) {
  const { deleteVideo } = useExplorePageContext();
  const { state: authState } = useLoginSignupContext();
  const { isAuthenticated } = authState;

  return (
    <Button
      icon={<DeleteOutlined />}
      danger
      onClick={() => deleteVideo(videoId)}
      disabled={!isAuthenticated}
    ></Button>
  );
}

export default DeleteVideoButton;
