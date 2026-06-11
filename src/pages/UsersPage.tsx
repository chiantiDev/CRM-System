import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {deleteUser, getUsers} from "@/store/users/Slice/usersSlice";
import {selectDeleteUserStatus, selectUsersRequest, selectUsersStatus} from "@/Modules/users/usersSelectors.ts";
import {Avatar, Button, Flex, message, Popconfirm, Space, Table, Tag, Tooltip, Input} from "antd";
const { Search } = Input;
import type {TableProps} from 'antd';
import {Link} from "react-router";
import {UserOutlined, UserDeleteOutlined} from "@ant-design/icons";
import {User, UserFilters} from "@/types/users";
import {selectProfileRequest} from "@/Modules/profile/profileSelectors.ts";

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {data: usersData} = useAppSelector(selectUsersRequest);
  const {data: userData} = useAppSelector(selectProfileRequest);
  const isAdmin = userData?.roles.some((role) => role.toLowerCase() === 'admin') ?? false;
  const { isLoading: isLoadingUsers } = useAppSelector(selectUsersStatus);
  const { isLoaded: isDeletingUser } = useAppSelector(selectDeleteUserStatus);

  const [params, setParams] = useState<UserFilters>({
    search: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    limit: 20,
    page: 1,
  })

  // const [searchValue, setSearchValue] = useState<string>("");
  //
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setParams((prev) => ({
  //       ...prev,
  //       search: searchValue.trim() || undefined,
  //       page: 1,
  //     }));
  //   }, 500);
  //
  //   return () => clearTimeout(timer);
  // }, [searchValue]);

  useEffect(() => {
    dispatch(getUsers(params));
  }, [dispatch, params, isDeletingUser]);

  const handleTableChange: TableProps<User>['onChange'] = (pagination, _filters, sorter) => {
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter
    setParams((prev) => ({
      ...prev,
      page: pagination.current ?? 1,
      sortBy: currentSorter ? (currentSorter.field as string) : undefined,
      sortOrder: currentSorter.order === 'ascend'
        ? 'asc'
        : currentSorter.order === 'descend'
          ? 'desc'
          : undefined,
    }))
  };

  const getHighlightedText = useCallback((text: string, search: string | undefined) => {
    if (!search) return text;

    const safeSearch = search.replace(/[.*+?^${}()|[\]]/g, '$&');
    const regex = new RegExp(`(${safeSearch})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} style={{ backgroundColor: '#ffc069', padding: 0 }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  }, []);

  const [messageApi, holder] = message.useMessage();
  const confirm = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      messageApi.success('Пользователь удален');
    } catch (error) {
      messageApi.error('Ошибка запроса удаления пользователя');
    }
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
      title: 'Администрирование',
      key: 'administration',
      render: (_, record) => (
        <Space>
          <Link to={`/home/user/${record.id}`}>
            <Tooltip title="Перейти к профилю">
              <Avatar style={{backgroundColor: '#7f265c',}} icon={<UserOutlined/>}/>
            </Tooltip>
          </Link>
          {isAdmin ?
            <Popconfirm
              title="Удалить пользователя?"
              description="Подтвердите действие"
              onConfirm={() => confirm(record.id)}
              okText="Удалить"
              cancelText="Отменить"
            >
              <Tooltip title="Удалить пользователя">
                <Button style={{width: '32px', height: '30px', padding: '0', border: 'none', borderRadius: '50%'}}>
                  <Avatar style={{backgroundColor: '#e4464e',}} icon={<UserDeleteOutlined/>}/>
                </Button>
              </Tooltip>
            </Popconfirm>
            : null}
        </Space>
      )
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (text) => getHighlightedText(text, params.search),
    },
    {
      title: 'Email пользователя',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      render: (text) => getHighlightedText(text, params.search),
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
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
      key: 'isBlocked',
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
      key: 'roles',
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
      key: 'phoneNumber',
    },
  ];

  return (
    <>
      {holder}
      <Tooltip placement={"bottomLeft"} title="Поиск по имени или email">
        <Search prefix={<UserOutlined/>} placeholder="Найти пользователя" size="large" allowClear loading={isLoadingUsers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParams({search: e.target.value})}/>
      </Tooltip>
      <Table
        scroll={{y: 'calc(100vh - 160px)'}}
        dataSource={dataSource}
        rowKey="key"
        columns={columns}
        onChange={handleTableChange}
        loading={isLoadingUsers}
        pagination={{
              placement: ['bottomCenter'],
              total: usersData?.meta.totalAmount ?? 0,
              showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} пользователей`,
              current: params.page,
              pageSize: 20,
              showSizeChanger: false,
            }}
      />
    </>
  )
}
export default UsersPage;