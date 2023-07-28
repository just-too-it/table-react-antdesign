import React, { useEffect, useState } from "react";
import { Button, Modal, Space } from "antd";
import { Search } from "../Search/Search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDataValidate } from "../../store/entities/users/usersSlice";
import { UserForm } from "../UserForm/UserForm";
import { selectIsDataValidate } from "../../store/entities/users/users.selectors";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isValidate = useAppSelector(selectIsDataValidate);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isValidate) {
      setIsModalOpen(false);
      dispatch(setDataValidate(false));
    }
  }, [dispatch, isValidate]);

  return (
    <Space size="large" style={{ marginBottom: "15px" }}>
      <Search />

      <Button type="primary" onClick={showModal}>
        Добавить
      </Button>

      {isModalOpen && (
        <Modal
          title="Добавление пользователя"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button type="primary" htmlType="submit" form="create-form">
              Добавить
            </Button>,
          ]}
        >
          <UserForm />
        </Modal>
      )}
    </Space>
  );
};
