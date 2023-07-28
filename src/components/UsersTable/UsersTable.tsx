import React, { FC, useEffect, useState } from "react";
import { Table as TableAntD, Space, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectIsDataValidate,
  selectQuery,
  selectUser,
  selectUsers,
} from "../../store/entities/users/users.selectors";
import { User } from "../../store/entities/users/users.types";
import {
  setDataValidate,
  setSelectedUser,
} from "../../store/entities/users/usersSlice";
import { UserForm } from "../UserForm/UserForm";

export const UsersTable: FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(selectUsers);
  const query = useAppSelector(selectQuery);
  const selectedUser = useAppSelector(selectUser);
  const isValidate = useAppSelector(selectIsDataValidate);

  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteUser = (user: User) => {
    setUsers(users.filter((item) => item.id !== user.id));
  };

  const onEditUser = (user: User) => {
    dispatch(setSelectedUser(user));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<User> = [
    {
      key: "name",
      title: "ИМЯ",
      dataIndex: "name",
      sorter: (a, b) => b.name.localeCompare(a.name),
      defaultSortOrder: "descend",
    },
    {
      key: "age",
      title: "ВОЗРАСТ",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      defaultSortOrder: "descend",
    },
    {
      key: "birthday",
      title: "ДАТА РОЖДЕНИЯ",
      dataIndex: "birthday",
      sorter: (a, b) => b.birthday.localeCompare(a.birthday),
      defaultSortOrder: "descend",
    },
    {
      key: "profession",
      title: "ПРОФЕССИЯ",
      dataIndex: "profession",
      sorter: (a, b) => b.profession.localeCompare(a.profession),
      defaultSortOrder: "descend",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEditUser(record)}>
            <EditTwoTone style={{ color: "hotpink" }} />
          </Button>
          <Button onClick={() => onDeleteUser(record)}>
            <DeleteTwoTone style={{ color: "hotpink" }} />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (usersList.length > 0) {
      setUsers(usersList);
    }
  }, [usersList]);

  useEffect(() => {
    if (query !== "") {
      setUsers(
        usersList.filter(
          (item) =>
            item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
            item.age
              .toString()
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            item.birthday
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            item.profession
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
        )
      );
    } else {
      setUsers(usersList);
    }
  }, [query, usersList]);

  useEffect(() => {
    if (isValidate) {
      setIsModalOpen(false);
      dispatch(setDataValidate(false));
    }
  }, [dispatch, isValidate]);

  return (
    <>
      <TableAntD<User>
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.id}
        showSorterTooltip={false}
      />
      {isModalOpen && (
        <Modal
          title="Редактирование"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button type="primary" htmlType="submit" form="edit-form">
              Отредактировать
            </Button>,
          ]}
        >
          {selectedUser && <UserForm user={selectedUser} />}
        </Modal>
      )}
    </>
  );
};
