import { useExplorePageContext } from "../../Context/ExplorepageContext";
import { Button } from "antd";
import { useLoginSignupContext } from "../../Context/LoginSignupContext";

function AddVideoButton() {
  const { createVideo } = useExplorePageContext();
  const { state: authState } = useLoginSignupContext();
  const { isAuthenticated } = authState;

  const handleAddVideo = () => {
    const newVideo = {
      title: "ADDED VIDEO",
      description: "Description of the new video",
      category: "Frontend Development",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
      videoUrl: "https://www.youtube.com/embed/TBIjgBVFjVI",
      creator_pic:
        "https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s160-c-k-c0x00ffffff-no-rj",
      creator_name: "FireShip",
    };

    createVideo(newVideo);
  };

  return (
    <Button disabled={!isAuthenticated} onClick={handleAddVideo}>
      Add Video
    </Button>
  );
}

export default AddVideoButton;
