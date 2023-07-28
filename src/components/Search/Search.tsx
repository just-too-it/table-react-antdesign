import { Space, Input } from "antd";
import { useAppDispatch } from "../../store/hooks";
import { setQuery } from "../../store/entities/users/usersSlice";

const { Search: SearchAtnD } = Input;

export const Search = () => {
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    dispatch(setQuery(value));
  };

  return (
    <Space direction="vertical">
      <SearchAtnD
        placeholder="Введите текст"
        allowClear
        enterButton="Поиск"
        size="middle"
        onSearch={onSearch}
      />
    </Space>
  );
};
