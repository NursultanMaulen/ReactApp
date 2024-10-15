import { React, toast } from "../Utils/CustomUtils";
import { users } from "../backend/users";

export const logoutHandler = () => {
  localStorage.clear();
  toast.success("Logout success!.");
};

export const signUpHandler = async () => {
  try {
    toast.success("Signup success!.");
  } catch (error) {
    console.log(error);
  }
};

export const loginHandler = async (email, password, dispatch) => {
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    const token = "mock-token";
    localStorage.setItem("token", token);

    dispatch({ type: "LOGINDATA", payload: foundUser });

    toast.success(`Welcome ${foundUser.name}!`);
  } else {
    toast.error("Invalid email or password");
  }
};
