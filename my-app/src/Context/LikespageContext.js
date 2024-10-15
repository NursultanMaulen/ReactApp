// LikespageContext.js
import { createContext, useContext, useReducer } from "../Utils/CustomUtils";

const likeContext = createContext();
export const useLikeContext = () => useContext(likeContext);

function LikespageContext({ children }) {
  function reducerFn(state, action) {
    switch (action.type) {
      case "ADD_TO_LIKES":
        return { ...state, addToLikes: [...state.addToLikes, action.payload] };
      case "GET_LIKED_VIDEOS":
        return { ...state, getLikedVideos: state.addToLikes };
      default:
        return state;
    }
  }

  const [state, setLikesFn] = useReducer(reducerFn, {
    addToLikes: [],
    getLikedVideos: [],
  });

  const { getLikedVideos, addToLikes } = state;

  return (
    <likeContext.Provider
      value={{
        getLikedVideos,
        setLikesFn,
        addToLikes,
      }}
    >
      {children}
    </likeContext.Provider>
  );
}

export default LikespageContext;
