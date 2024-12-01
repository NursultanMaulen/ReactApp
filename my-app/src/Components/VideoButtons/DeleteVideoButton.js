import { useExplorePageContext } from "../../Context/ExplorepageContext";
import { Button } from "antd";

function DeleteVideoButton({ videoId }) {
  const { deleteVideo } = useExplorePageContext();

  return (
    <Button danger onClick={() => deleteVideo(videoId)}>
      Delete
    </Button>
  );
}

export default DeleteVideoButton;
