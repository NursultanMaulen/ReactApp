import React, { useEffect, useState } from "react";
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
    // Проверяем, есть ли данные пользователя в localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (loginData && loginData.name && loginData.email) {
      // Сохраняем данные из контекста в localStorage
      localStorage.setItem("userData", JSON.stringify(loginData));
      setUserData(loginData);
    } else if (storedUserData) {
      // Если данные есть в localStorage, устанавливаем их в состояние
      setUserData(storedUserData);
    }
  }, [loginData]);

  function logOutUserFromApp() {
    logoutHandler();
    // Очищаем данные из localStorage при выходе
    localStorage.removeItem("userData");
    navigate("/login");
  }

  // Данные для таблицы
  const dataSource = [
    {
      key: "1",
      name: userData.name,
      email: userData.email,
    },
  ];

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

  return (
    <Card style={{ maxWidth: "1000px", margin: "auto", padding: "24px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Account Details
      </Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
}

export default Accountdetails;
