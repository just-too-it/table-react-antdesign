import React, { FC, useState } from "react";
import { Form, Input, InputNumber, DatePicker } from "antd";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { User } from "../../store/entities/users/users.types";
import {
  addUser,
  editUser,
  setDataValidate,
} from "../../store/entities/users/usersSlice";
import { useAppDispatch } from "../../store/hooks";

interface UserFormNewProps {
  user?: User;
}

export const UserForm: FC<UserFormNewProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [birthday, setBirthday] = useState<string>("");

  const dateFormat = "DD-MM-YYYY";

  const initialValues = {
    name: user?.name || "",
    age: user?.age || "",
    profession: user?.profession || "",
    birthday: user?.birthday ? dayjs(user?.birthday, dateFormat) : null,
  };

  const onFinish = (values: User) => {
    if (user) {
      dispatch(editUser({ ...values, id: user.id, birthday }));
    } else {
      dispatch(
        addUser({
          ...values,
          id: uuidv4(),
          birthday,
        })
      );
    }
    dispatch(setDataValidate(true));
    form.resetFields();
  };

  return (
    <Form
      id={user ? "edit-form" : "create-form"}
      form={form}
      name="User"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Возраст"
        name="age"
        rules={[{ required: true, message: "Пожалуйста, введите возраст!" }]}
      >
        <InputNumber min={1} max={100} />
      </Form.Item>

      <Form.Item
        label="Дата рождения"
        name="birthday"
        rules={[
          { required: true, message: "Пожалуйста, введите дату рождения!" },
        ]}
      >
        <DatePicker
          onChange={(date, dateString) => setBirthday(dateString)}
          format={dateFormat}
        />
      </Form.Item>

      <Form.Item label="Профессия" name="profession">
        <Input />
      </Form.Item>
    </Form>
  );
};
