import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");

export const users = [
  {
    _id: uuid(),
    name: "Guest",
    email: "example@mail.com",
    password: "123123123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
