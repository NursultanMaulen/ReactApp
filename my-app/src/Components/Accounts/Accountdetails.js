import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Button, Typography, Card, Form, Input, message } from "antd";
import { useNavigate } from "../../Utils/CustomUtils";
import { useLoginSignupContext } from "../../Context/IndexAllContext";
import { logoutHandler } from "../../services/LoginSignUpServices";

const { Title } = Typography;

function Accountdetails() {
  const { loginData, dispatch } = useLoginSignupContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    likedVideos: [],
  });
  const [form] = Form.useForm();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (loginData && loginData.name && loginData.email) {
      localStorage.setItem("userData", JSON.stringify(loginData));
      updateUserDataState(loginData);
    } else if (storedUserData) {
      updateUserDataState(storedUserData);
    }
  }, [loginData]);

  const updateUserDataState = useCallback(
    (newUserData) => {
      setUserData((prevUserData) => {
        if (
          prevUserData.name === newUserData.name &&
          prevUserData.email === newUserData.email &&
          prevUserData.password === newUserData.password &&
          prevUserData.likedVideos === newUserData.likedVideos
        ) {
          return prevUserData;
        }
        return newUserData;
      });
      form.setFieldsValue(newUserData);
    },
    [form]
  );

  const logOutUserFromApp = useCallback(() => {
    logoutHandler(dispatch);
    localStorage.removeItem("userData");
    navigate("/login");
  }, [navigate]);

  const dataSource = useMemo(() => {
    return [
      {
        key: "1",
        name: userData.name,
        email: userData.email,
      },
    ];
  }, [userData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Logout",
      key: "logout",
      render: () => (
        <Button type="primary" danger onClick={logOutUserFromApp}>
          Logout
        </Button>
      ),
    },
  ];

  const updateUserData = async (values) => {
    const updatedUserData = {
      ...userData,
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/users/${userData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await fetchUserData(userData.id);
      message.success("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      message.error("Failed to update user data. Please try again.");
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userData.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      logOutUserFromApp();
      message.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete account. Please try again.");
    }
  };

  return (
    <Card style={{ maxWidth: "1000px", margin: "auto", padding: "24px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Account Details
      </Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <Form
        form={form}
        layout="vertical"
        onFinish={updateUserData}
        initialValues={userData}
        style={{ marginTop: "24px" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update User Data
        </Button>
      </Form>

      <Button
        type="primary"
        danger
        style={{ marginTop: "16px" }}
        onClick={deleteAccount}
      >
        Delete Account
      </Button>
    </Card>
  );
}

export default Accountdetails;
