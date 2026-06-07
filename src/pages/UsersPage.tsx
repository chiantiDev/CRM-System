import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import {getUsers} from "../store/users/Slice/usersSlice.ts";
import {selectUsersRequest} from "../Modules/users/selectors.ts";
import {Avatar, Flex, Table, Tag, Tooltip, Typography} from "antd";
import type { TableProps } from 'antd';
import {Link} from "react-router";
import {UserOutlined} from "@ant-design/icons";
import {User} from "../types/users.ts";
const { Text } = Typography;

const usersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: usersData } = useAppSelector(selectUsersRequest);
  const totalAmount = usersData?.meta.totalAmount ?? 0;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUsers({ page: currentPage, limit: 20 }));
  }, [dispatch, currentPage]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const dataSource: User[] = usersData?.data
    ? usersData.data.map((user) => ({
      key: user.id,
      id: user.id,
      username: user.username,
      email: user.email,
      date: user.date,
      isBlocked: user.isBlocked,
      roles: user.roles,
      phoneNumber: user.phoneNumber || 'Не указан',
    }))
    : [];

  const columns: TableProps<User>['columns'] = [

    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      render: (name: string, record) => (
        <>
          <Link to={`/home/user/${record.id}`} >
            <Tooltip title="Перейти к профилю">
              <Avatar style={{ backgroundColor: '#7f265c', }} icon={<UserOutlined />} />
            </Tooltip>
          </Link>
          <Text style={{marginLeft: '16px'}}>{name}</Text>
        </>
      )
    },
    {
      title: 'Email пользователя',
      dataIndex: 'email',
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      render: (text: string) => {
        if (!text) return '-';
        return new Date(text).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      title: 'Статус блокировки',
      dataIndex: 'isBlocked',
      render: (status: boolean) => {
        const statusText = status ? 'blocked' : 'active';
        const color = status ? 'red' : 'green';
        return (
          <Tag color={color}>
            {statusText.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      render: (roles: string[]) => (
        <Flex gap="small" align="center" wrap>
          {roles.map((role) => {
            let color
            if (role === 'USER') {
              color = 'cyan';
            }
            if (role === 'ADMIN') {
              color = 'gold';
            }
            if (role === 'MODERATOR') {
              color = 'purple';
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumber',
    },
  ];


  return (
    <Table
      scroll={{ y: 'calc(100vh - 120px)' }}
      dataSource={dataSource}
      columns={columns}
      pagination={
        totalAmount >= 20
          ? {
            placement: ['bottomCenter'],
            onChange: onChange,
            total: totalAmount,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            current: currentPage,
            pageSize: 20,
            showSizeChanger: false,
          } : false}
    />
  )
}
export default usersPage;