import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {deleteUser, getUsers} from "@/store/users/Slice/usersSlice";
import {selectDeleteUserStatus, selectUsersRequest, selectUsersStatus} from "@/Modules/users/usersSelectors.ts";
import {Avatar, Button, Flex, message, Popconfirm, Space, Table, Tag, Tooltip, Input} from "antd";

const {Search} = Input;
import type {TableProps} from 'antd';
import {Link} from "react-router";
import {UserOutlined, UserDeleteOutlined} from "@ant-design/icons";
import {User} from "@/types/users";
import {selectProfileRequest} from "@/Modules/profile/profileSelectors.ts";

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

const UsersPage: React.FC = () => {
  console.log('рендер')
  const dispatch = useAppDispatch();
  const {data: usersData} = useAppSelector(selectUsersRequest);
  const {data: userData} = useAppSelector(selectProfileRequest);
  const isAdmin = userData?.roles.some((role) => role.toLowerCase() === 'admin') ?? false;
  const {isLoading: isLoadingUsers} = useAppSelector(selectUsersStatus);
  const {isLoaded: isDeletingUser} = useAppSelector(selectDeleteUserStatus);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sortParams, setSortParams] = useState<{ field?: string; order?: 'asc' | 'desc' }>({});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    dispatch(getUsers({
      sortBy: sortParams.field,
      sortOrder: sortParams.order,
      page: currentPage - 1,
      limit: 20,
      search: debouncedSearch || undefined,
    }));
  }, [dispatch, currentPage, sortParams, debouncedSearch, isDeletingUser]);


  const handleTableChange: TableProps<User>['onChange'] = (pagination, _filters, sorter) => {
    if (pagination.current) {
      setCurrentPage(pagination.current);
    }

    if (!Array.isArray(sorter)) {
      setSortParams({
        field: sorter.field as string,
        order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
      });
    }
  };

  const getHighlightedText = useCallback((text: string, search: string | undefined) => {
    if (!search) return text;
    const safeSearch = search.replace(/[.*+?^${}()|[\]]/g, '$&');
    const regex = new RegExp(`(${safeSearch.trim()})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} style={{backgroundColor: '#ffc069', padding: 0}}>
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

  const dataSource = useMemo(() => {
    if (!usersData?.data) return [];
    return usersData.data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      date: user.date,
      isBlocked: user.isBlocked,
      roles: user.roles,
      phoneNumber: user.phoneNumber || 'Не указан',
    }));
  }, [usersData?.data]);

  const columns: ColumnsType<User> = [
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
      render: (text) => getHighlightedText(text, search),
    },
    {
      title: 'Email пользователя',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      render: (text) => getHighlightedText(text, search),
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
        <Search prefix={<UserOutlined/>} placeholder="Найти пользователя" size="large" allowClear
                loading={isLoadingUsers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
      </Tooltip>
      <Table
        scroll={{y: 'calc(100vh - 160px)'}}
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
        loading={isLoadingUsers}
        pagination={{
          placement: ['bottomCenter'],
          current: currentPage,
          pageSize: 20,
          total: usersData?.meta?.totalAmount ?? 0,
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} пользователей`,
          showSizeChanger: false,
          itemRender: (_current, _type, originalElement) => {
            if ((usersData?.meta?.totalAmount ?? 0) < 20) return null;
            return originalElement;
          },
        }}
      />
    </>
  )
}
export default UsersPage;