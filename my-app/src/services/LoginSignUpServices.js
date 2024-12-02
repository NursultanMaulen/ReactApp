import { React, toast } from "../Utils/CustomUtils";
import { useLoginSignupContext } from "../Context/LoginSignupContext"; // Добавляем импорт контекста

export const logoutHandler = (dispatch) => {
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  toast.success("Logout success!");
};

export const signUpHandler = async (userData) => {
  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    toast.success("Signup success!");
  } catch (error) {
    console.error("Error during signup:", error);
    toast.error("Signup failed. Please try again.");
  }
};

export const loginHandler = async (email, password, dispatch) => {
  try {
    dispatch({ type: "LOADING", payload: true });

    const response = await fetch("http://localhost:3001/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const token = "mock-token";
      localStorage.setItem("token", token);

      localStorage.setItem("userData", JSON.stringify(foundUser));

      dispatch({ type: "LOGINDATA", payload: foundUser });

      toast.success(`Welcome ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Failed to login. Please try again.");
  } finally {
    dispatch({ type: "LOADING", payload: false });
  }
};
