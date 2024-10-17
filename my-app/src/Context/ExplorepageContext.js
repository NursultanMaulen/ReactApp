import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "../Utils/CustomUtils.js";
import { videos } from "../backend/videos.js"; 

const explorePage = createContext();
export const useExplorePageContext = () => useContext(explorePage);

function ExplorepageContext({ children }) {
  const [isActive, setActive] = useState("false");
  const [likedVideos, setLikedVideos] = useState([]);

  function reducerFn(state, action) {
    switch (action.type) {
      case "APIVIDEOSDATA":
        return { ...state, videosdata: action.payload };
      case "LOADINGSPINNER":
        return { ...state, isLoading: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFn, {
    videosdata: [],
    isLoading: false,
    search: "",
    category: {
      All: false,
    },
  });

  const { category, search, videosdata } = state;

  useEffect(() => {
    dispatch({ type: "LOADINGSPINNER", payload: true });

    dispatch({ type: "APIVIDEOSDATA", payload: videos });

    dispatch({ type: "LOADINGSPINNER", payload: false });
  }, []);

  const likeVideo = (video) => {
    setLikedVideos((prev) => [...prev, video]);
  };

  return (
    <explorePage.Provider
      value={{ state, dispatch, isActive, setActive, videosdata }}
    >
      {children}
    </explorePage.Provider>
  );
}

export default ExplorepageContext;
