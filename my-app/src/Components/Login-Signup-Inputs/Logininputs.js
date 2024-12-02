import React, { useEffect, useState, useCallback } from "react";
import { Button, Input, Form, Typography, Layout, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginSignupContext } from "../../Context/IndexAllContext";
import { loginHandler } from "../../services/LoginSignUpServices";

const { Title, Text } = Typography;
const { Content } = Layout;

function LoginInputs() {
  const { dispatch, email, password } = useLoginSignupContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      dispatch({ type: "EMAIL", payload: storedEmail });
      dispatch({ type: "PASSWORD", payload: storedPassword });
    }
  }, [dispatch]);

  const submitLoginData = useCallback(
    async (e) => {
      try {
        await loginHandler(email, password, dispatch);
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          navigate("/explore");
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setError("Failed to login. Please try again.");
      }
    },
    [email, password, dispatch, navigate]
  );

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setError("");
      setIsDisabled(false);
    } else {
      setError("All fields must be filled.");
      setIsDisabled(true);
    }
  }, [email, password]);

  const setGuestLoginData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/users/1");
      console.log("Data fetched!!");
      if (!response.ok) {
        throw new Error("Failed to fetch guest data");
      }
      const guestUser = await response.json();

      form.setFieldsValue({
        email: guestUser.email,
        password: guestUser.password,
      });

      dispatch({ type: "EMAIL", payload: guestUser.email });
      dispatch({ type: "PASSWORD", payload: guestUser.password });

      localStorage.setItem("email", guestUser.email);
      localStorage.setItem("password", guestUser.password);

      message.info("Guest Login Activated");
    } catch (error) {
      console.error("Failed to fetch guest data:", error);
      message.error("Failed to activate guest login. Please try again.");
    }
  }, [form, dispatch]);

  return (
    <Layout
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        justifyContent: "center",
      }}
    >
      <Content
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login Page
        </Title>
        <Form layout="vertical" form={form} onFinish={submitLoginData}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              style={{ borderRadius: "4px" }}
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                dispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6,
              },
            ]}
          >
            <Input.Password
              style={{ borderRadius: "4px" }}
              placeholder="Enter your password"
              onChange={(e) =>
                dispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </Form.Item>

          {error && <Text type="danger">{error}</Text>}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={isDisabled}
            >
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={setGuestLoginData}>
              Guest Login
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center" }}>
          Not a member?{" "}
          <Link to="/signup" style={{ color: "#1890ff" }}>
            Signup
          </Link>{" "}
          here
        </Text>
      </Content>
    </Layout>
  );
}

export default LoginInputs;
