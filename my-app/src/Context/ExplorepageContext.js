import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";

const explorePage = createContext();
export const useExplorePageContext = () => useContext(explorePage);

function ExplorepageContext({ children }) {
  const [isActive, setActive] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

  function reducerFn(state, action) {
    switch (action.type) {
      case "APIVIDEOSDATA":
        return { ...state, videosdata: action.payload };
      case "DELETE_VIDEO":
        return {
          ...state,
          videosdata: state.videosdata.filter(
            (video) => video.id !== action.payload
          ),
        };
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

  const { videosdata } = state;

  const fetchVideos = useCallback(async () => {
    dispatch({ type: "LOADINGSPINNER", payload: true });
    try {
      const response = await fetch("http://localhost:3001/videos");
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      dispatch({ type: "APIVIDEOSDATA", payload: data });
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      dispatch({ type: "LOADINGSPINNER", payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const createVideo = useCallback(
    async (newVideo) => {
      try {
        const response = await fetch("http://localhost:3001/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVideo),
        });
        if (!response.ok) throw new Error("Failed to create video");

        const addedVideo = await response.json();
        dispatch({
          type: "APIVIDEOSDATA",
          payload: [...videosdata, addedVideo],
        });
      } catch (error) {
        console.error("Error creating video:", error);
      }
    },
    [videosdata, dispatch]
  );

  const updateVideo = useCallback(
    async (id, updatedVideo) => {
      try {
        const response = await fetch(`http://localhost:3001/videos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVideo),
        });
        if (!response.ok) throw new Error("Failed to update video");

        const updatedData = await response.json();
        dispatch({
          type: "APIVIDEOSDATA",
          payload: videosdata.map((video) =>
            video.id === id ? updatedData : video
          ),
        });
      } catch (error) {
        console.error("Error updating video:", error);
      }
    },
    [videosdata, dispatch]
  );

  const deleteVideo = useCallback(
    async (videoId) => {
      try {
        await fetch(`http://localhost:3001/videos/${videoId}`, {
          method: "DELETE",
        });
        dispatch({ type: "DELETE_VIDEO", payload: videoId });
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    },
    [dispatch]
  );

  const memoizedVideos = useMemo(() => {
    console.log("memo triggered");
    return videosdata.filter(
      (video) => video.category === "All" || video.category === state.category
    );
  }, [videosdata, state.category]);

  return (
    <explorePage.Provider
      value={{
        state,
        dispatch,
        isActive,
        setActive,
        videosdata: memoizedVideos,
        likedVideos,
        setLikedVideos,
        createVideo,
        updateVideo,
        deleteVideo,
        fetchVideos,
      }}
    >
      {children}
    </explorePage.Provider>
  );
}

export default ExplorepageContext;
