import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import {getUsers} from "../store/users/Slice/usersSlice.ts";
import {selectUsersRequest} from "../Modules/users/selectors.ts";
import {Pagination} from "antd";

const usersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: usersData } = useAppSelector(selectUsersRequest);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    dispatch(getUsers({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (usersData?.data) {
      console.log('Актуальные данные юзеров:', usersData.data);
    }
  }, [usersData]);

  const onChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    console.log(`Переход на страницу: ${page}, Элементов на странице: ${size}`);
  };

  return (
      <Pagination
        onChange={onChange}
        total={usersData?.meta.totalAmount}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        defaultPageSize={20}
        defaultCurrent={1}
      />
  )
}
export default usersPage;