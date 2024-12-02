import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "../Utils/CustomUtils";
import { toast } from "react-toastify";

const loginSignupContext = createContext();
export const useLoginSignupContext = () => useContext(loginSignupContext);

function LoginSignupContext({ children }) {
  const [state, dispatch] = useReducer(reducerFn, {
    name: "",
    email: "",
    password: "",
    loginData: {},
    likedVideos: [],
    isAuthenticated: false,
  });

  function reducerFn(state, action) {
    switch (action.type) {
      case "NAME":
        return { ...state, name: action.payload };
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "LOGINDATA":
        return { ...state, loginData: action.payload, isAuthenticated: true };
      case "LOGOUT":
        return {
          ...state,
          name: "",
          email: "",
          password: "",
          loginData: {},
          likedVideos: [],
          isAuthenticated: false,
        };
      case "ADD_TO_LIKES":
        return {
          ...state,
          likedVideos: [...state.likedVideos, action.payload],
        };
      case "REMOVE_FROM_LIKES":
        return {
          ...state,
          likedVideos: state.likedVideos.filter((id) => id !== action.payload),
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("userData"));
      dispatch({ type: "LOGINDATA", payload: user });
    }
  }, []);

  const handleLikeVideo = async (videoId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${state.loginData.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      let updatedLikedVideos;
      if (!userData.likedVideos.includes(videoId)) {
        updatedLikedVideos = [...new Set([...userData.likedVideos, videoId])];
        toast.success("Video liked!");
      } else {
        updatedLikedVideos = userData.likedVideos.filter(
          (id) => id !== videoId
        );
        toast.info("Video unliked!");
      }

      const updatedUserData = {
        ...userData,
        likedVideos: updatedLikedVideos,
      };

      await updateUserDataOnServer(state.loginData.id, updatedUserData);

      dispatch({ type: "UPDATE_LIKED_VIDEOS", payload: updatedLikedVideos });
    } catch (error) {
      console.error("Error updating liked videos:", error);
      toast.error("Failed to update liked videos. Please try again.");
    }
  };

  const updateUserDataOnServer = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update liked videos.");
    }
  };

  const { name, email, password, likedVideos, loginData, isAuthenticated } =
    state;

  return (
    <loginSignupContext.Provider
      value={{
        state,
        dispatch,
        name,
        email,
        password,
        loginData,
        likedVideos,
        isAuthenticated,
        handleLikeVideo,
      }}
    >
      {children}
    </loginSignupContext.Provider>
  );
}

export default LoginSignupContext;
