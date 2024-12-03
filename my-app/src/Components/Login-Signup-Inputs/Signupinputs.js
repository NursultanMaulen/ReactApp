import { useEffect, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useLoginSignupContext } from "../../Context/IndexAllContext";
import { signUpHandler } from "../../services/LoginSignUpServices";

const { Title, Text } = Typography;

function SignupInputs() {
  const { dispatch, name, email, password } = useLoginSignupContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      setError("");
      setIsDisabled(false);
    } else {
      setError("All fields must be filled.");
      setIsDisabled(true);
    }
  }, [name, email, password]);

  async function submitSignUpData(values) {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      likedVideos: [],
    };

    try {
      await signUpHandler(userData);
      message.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Failed to sign up. Please try again.");
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
        margin: "auto",
        padding: "24px",
        background: "#fff",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Signup Page
      </Title>
      <Form layout="vertical" onFinish={submitSignUpData}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              dispatch({ type: "NAME", payload: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              dispatch({ type: "EMAIL", payload: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              dispatch({ type: "PASSWORD", payload: e.target.value })
            }
            autoComplete="on"
            minLength={6}
          />
        </Form.Item>

        {error && <Text type="danger">{error}</Text>}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isDisabled} block>
            Signup
          </Button>
        </Form.Item>
      </Form>
      <Text style={{ marginTop: "16px", textAlign: "center" }}>
        Already a member?{" "}
        <Link to="/login" style={{ color: "#1890ff" }}>
          Login here
        </Link>
      </Text>
    </div>
  );
}

export default SignupInputs;
