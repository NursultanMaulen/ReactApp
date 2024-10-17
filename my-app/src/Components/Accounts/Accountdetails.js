import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Button, Typography, Card } from "antd";
import { useNavigate } from "../../Utils/CustomUtils";
import { useLoginSignupContext } from "../../Context/IndexAllContext";
import { logoutHandler } from "../../services/LoginSignUpServices";

const { Title } = Typography;

function Accountdetails() {
  const { loginData } = useLoginSignupContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    console.log("useEffect rendered");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (loginData && loginData.name && loginData.email) {
      localStorage.setItem("userData", JSON.stringify(loginData));
      updateUserDataState(loginData);
    } else if (storedUserData) {
      updateUserDataState(storedUserData);
    }
  }, [loginData]);

  const updateUserDataState = useCallback((newUserData) => {
    setUserData((prevUserData) => {
      if (
        prevUserData.name === newUserData.name &&
        prevUserData.email === newUserData.email
      ) {
        return prevUserData;
      }
      return newUserData;
    });
  }, []);

  const logOutUserFromApp = useCallback(() => {
    logoutHandler();
    localStorage.removeItem("userData");
    navigate("/login");
  }, [navigate]);

  const dataSource = useMemo(() => {
    console.log("useMemo called");
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

  function updateUserData() {
    const newUserData = {
      name: "Updated User",
      email: "updateduser@example.com",
    };
    updateUserDataState(newUserData);

    localStorage.setItem("userData", JSON.stringify(newUserData));
  }

  function updateUserData2() {
    const newUserData = {
      name: "Updated User2",
      email: "updateduser2@example.com",
    };
    updateUserDataState(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  }

  return (
    <Card style={{ maxWidth: "1000px", margin: "auto", padding: "24px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Account Details
      </Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <Button onClick={updateUserData} type="primary">
        Update User Data
      </Button>
      <Button onClick={updateUserData2} type="primary">
        Update User Data2
      </Button>
    </Card>
  );
}

export default Accountdetails;
