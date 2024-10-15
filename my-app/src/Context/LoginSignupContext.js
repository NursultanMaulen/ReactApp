import { createContext, useContext, useReducer } from "../Utils/CustomUtils";

const loginSignupContext = createContext();
export const useLoginSignupContext = () => useContext(loginSignupContext);

function LoginSignupContext({ children }) {
  const [state, dispatch] = useReducer(reducerFn, {
    name: "",
    email: "",
    password: "",
    loginData: {},
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
        return { ...state, loginData: action.payload };

      default:
        return state;
    }
  }

  const { name, email, password, loginData } = state;

  return (
    <div>
      <loginSignupContext.Provider
        value={{
          state,
          dispatch,
          name,
          email,
          password,
          loginData,
        }}
      >
        {children}
      </loginSignupContext.Provider>
    </div>
  );
}

export default LoginSignupContext;
