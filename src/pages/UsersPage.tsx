import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {blockedUser, deleteUser, editRolesUser, getUsers, unblockedUser} from "@/store/users/Slice/usersSlice";
import {
  selectBlockedUserStatus,
  selectDeleteUserStatus,
  selectEditRolesUserStatus,
  selectUnblockedUserStatus,
  selectUsersRequest,
  selectUsersStatus
} from "@/Modules/users/usersSelectors.ts";
import {
  Avatar,
  Button,
  Flex,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Input,
  Modal,
  Select,
  Radio,
  Typography,
  Dropdown,
} from "antd";

const {Title, Text, Link: LinkText} = Typography;
import {
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
  MoreOutlined
} from "@ant-design/icons";
import type {TableProps, TablePaginationConfig} from 'antd';
import {Link} from "react-router";
import {Roles, User, UserRolesRequest} from "@/types/users";
import {selectProfileRequest} from "@/Modules/profile/profileSelectors.ts";
import {highlightedText} from "@/helpers/highlightedText.tsx";

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {data: usersData} = useAppSelector(selectUsersRequest);
  const {data: userData} = useAppSelector(selectProfileRequest);
  const {isLoading: isLoadingUsers} = useAppSelector(selectUsersStatus);
  const {isLoaded: isDeletingUser} = useAppSelector(selectDeleteUserStatus);
  const {isLoaded: isBlockedUser} = useAppSelector(selectBlockedUserStatus);
  const {isLoaded: isUnblockedUser} = useAppSelector(selectUnblockedUserStatus);
  const {isLoaded: isEditRolesUser} = useAppSelector(selectEditRolesUserStatus);

  const isAdmin = userData?.roles.some((role) => ['ADMIN'].includes(role)) ?? false;
  const isModer = userData?.roles.some((role) => ['MODERATOR'].includes(role)) ?? false;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortParams, setSortParams] = useState<{ field?: string; order?: 'asc' | 'desc' }>({});
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isBlocked, setIsBlocked] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<number>(0);
  const [currentRoles, setCurrentRoles] = useState<Roles[]>([]);

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
      isBlocked: isBlocked
    }));
  }, [dispatch, currentPage, sortParams, debouncedSearch, isBlocked, isDeletingUser, isBlockedUser, isUnblockedUser, isEditRolesUser]);

  const dataSource: User[] = usersData?.data ? usersData?.data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    date: user.date,
    isBlocked: user.isBlocked,
    roles: user.roles,
    phoneNumber: user.phoneNumber,
  })) : []

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

  const handleFilterChange = (value: string) => {
    setCurrentPage(1);
    switch (value) {
      case 'all':
        setIsBlocked(undefined);
        break;
      case 'active':
        setIsBlocked(false);
        break;
      case 'blocked':
        setIsBlocked(true);
        break;
    }
  };

  const [messageApi, holder] = message.useMessage();
  const deleteUserConfirm = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      messageApi.success('Пользователь удален');
    } catch (error) {
      messageApi.error('Ошибка запроса удаления пользователя');
    }
  };

  const openUserRoles = (record: User): void => {
    setIsModalOpen(true)
    setCurrentRoles(record.roles)
    setEditingUserId(record.id)
  }

  const blockedUserConfirm = async (id: number): Promise<void> => {
    try {
      await dispatch(blockedUser(id)).unwrap();
      messageApi.success('Пользователь заблокирован');
    } catch (error) {
      messageApi.error('Ошибка запроса блокировки пользователя');
    }
  };

  const unblockedUserConfirm = async (id: number): Promise<void> => {
    try {
      await dispatch(unblockedUser(id)).unwrap();
      messageApi.success('Пользователь разблокирован');
    } catch (error) {
      messageApi.error('Ошибка запроса разблокировки пользователя');
    }
  };

  const saveCurrentRoles = (newRoles: Roles[]) => {
    setCurrentRoles(newRoles);
  };

  const editRolesConfirm = async (id: number, roles: UserRolesRequest): Promise<void> => {
    try {
      await dispatch(editRolesUser({id, roles})).unwrap();
      messageApi.success('Роли пользователя изменены');
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error('Ошибка запроса изменения ролей пользователя');
    }
  };

  const totalAmount = usersData?.meta?.totalAmount ?? 0;
  const itemRender = (_current: number, _type: string, originalElement: React.ReactNode) => {
    if (totalAmount < 20) return null;
    return originalElement;
  }
  const paginationConfig: TablePaginationConfig = {
    placement: ['bottomCenter'],
    current: currentPage,
    pageSize: 20,
    total: totalAmount,
    showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} из ${total} пользователей`,
    showSizeChanger: false,
    itemRender: itemRender,
  }

  return (
    <>
      {holder}
      <Flex align="center" style={{padding: '16px', gap: '16px'}}>
        <Title style={{flex: 3, margin: 0}} level={3}>Пользователи</Title>
        <Input
          style={{flex: 1}}
          prefix={<SearchOutlined/>}
          placeholder="Поиск по имени или email"
          size="large"
          allowClear
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        {isAdmin &&
          <Dropdown menu={{
            items: [
              {
                key: 'filter-group',
                label: (
                  <div style={{padding: 12}}>
                    <Radio.Group
                      defaultValue={'all'}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      style={{display: 'flex', flexDirection: 'column', gap: '8px'}}
                    >
                      <Radio value="all">Все пользователи</Radio>
                      <Radio value="active">Только активные пользователи</Radio>
                      <Radio value="blocked">Только заблокированные пользователи</Radio>
                    </Radio.Group>
                  </div>
                ),
              },
            ]
          }}>
            <Button size="large"><FilterOutlined/>Фильтр</Button>
          </Dropdown>
        }
      </Flex>
      <Table<User>
        scroll={{y: 'calc(100vh - 192px)'}}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
        loading={isLoadingUsers}
        pagination={paginationConfig}
      >
        <Table.Column<User>
          title={'Имя пользователя'}
          dataIndex={'username'}
          key={'username'}
          sorter={true}
          render={(value) => {
            return (
              <>
                <Avatar size={"small"} style={{marginRight: 8}} icon={<UserOutlined/>}/>
                <Text>{highlightedText(value, debouncedSearch)}</Text>
              </>
            )
          }}/>

        <Table.Column<User>
          title="Email пользователя"
          dataIndex="email"
          key="email"
          sorter={true}
          render={(value) =>
            <>
              <MailOutlined style={{marginRight: 8}}/>
              <LinkText href={`mailto:${value}`} underline>
                {highlightedText(value, debouncedSearch)}
              </LinkText>
            </>
          }
        />

        <Table.Column<User>
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"
          render={(value) => {
            if (!value) {
              return (
                <>
                  <PhoneOutlined style={{marginRight: 8}}/>
                  <Text>Не указан</Text>
                </>
              )
            } else {
              return (
                <>
                  <PhoneOutlined style={{marginRight: 8}}/>
                  <LinkText href={`tel:${value}`}>{value}</LinkText>
                </>
              )
            }
          }}
        />

        <Table.Column<User>
          title="Роли"
          dataIndex="roles"
          key="roles"
          render={(roles: Roles[]) => (
            <Flex gap="small" align="center" wrap>
              {roles.map((role) => <Tag key={role}>{role}</Tag>)}
            </Flex>
          )}
        />

        <Table.Column<User>
          title="Статус блокировки"
          dataIndex="isBlocked"
          key="isBlocked"
          render={(value) => value ? '+' : '-'}
        />

        <Table.Column<User>
          title="Дата регистрации"
          dataIndex="date"
          key="date"
          render={(text: string) => new Date(text).toLocaleDateString('ru-RU')}
        />

        <Table.Column<User>
          title="Действия"
          key="actions"
          render={(_, record) => (
            <Space>
              <Link to={`/user/${record.id}`}>
                <Button>Профиль</Button>
              </Link>
              {isModer && !isAdmin && !record.isBlocked &&
                <Popconfirm
                  title="Заблокировать?"
                  description="Подтвердите действие"
                  onConfirm={() => blockedUserConfirm(record.id)}
                  okText="Подтвердить"
                  cancelText="Отменить"
                >
                  <Button>Заблокировать</Button>
                </Popconfirm>
              }
              {isAdmin &&
                <Dropdown trigger={["click"]} menu={{
                  items: [
                    {
                      key: 'actions-group',
                      label: (
                        <Flex vertical gap="small">
                          {!record.isBlocked
                            ?
                            <Popconfirm
                              title="Заблокировать?"
                              description="Подтвердите действие"
                              onConfirm={() => blockedUserConfirm(record.id)}
                              okText="Подтвердить"
                              cancelText="Отменить"
                            >
                              <Button>Заблокировать</Button>
                            </Popconfirm>
                            :
                            <Popconfirm
                              title="Разблокировать?"
                              description="Подтвердите действие"
                              onConfirm={() => unblockedUserConfirm(record.id)}
                              okText="Подтвердить"
                              cancelText="Отменить"
                            >
                              <Button>Разблокировать</Button>
                            </Popconfirm>
                          }
                          <>
                            <Button onClick={() => openUserRoles(record)}>Изменить роли</Button>
                            <Popconfirm
                              title="Удалить?"
                              description="Подтвердите действие"
                              onConfirm={() => deleteUserConfirm(record.id)}
                              okText="Подтвердить"
                              cancelText="Отменить"
                            >
                              <Button>Удалить</Button>
                            </Popconfirm>
                          </>
                        </Flex>
                      ),
                    },
                  ]
                }}>
                  <Button><MoreOutlined/></Button>
                </Dropdown>
              }
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Добавьте или удалите роли и подтвердите действие"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{disabled: currentRoles.length === 0}}
      >
        <Flex gap="small" align="start">
          <Flex flex={1} vertical gap="small">
            <Select
              mode="multiple"
              allowClear
              placeholder="Пожалуйста, добавьте роль"
              value={currentRoles}
              onChange={saveCurrentRoles}
              status={currentRoles.length === 0 ? 'error' : ''}
              options={[
                {value: 'ADMIN', label: 'ADMIN'},
                {value: 'MODERATOR', label: 'MODERATOR'},
                {value: 'USER', label: 'USER'},
              ]}
            />
            {currentRoles.length === 0 && (
              <span
                style={{color: '#ff4d4f', fontSize: '12px'}}>Необходимо выбрать минимум одну роль</span>
            )}
          </Flex>
          <Space>
            <Button disabled={currentRoles.length === 0}
                    onClick={() => editRolesConfirm(editingUserId, {roles: currentRoles})} type="primary">
              ОК
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}
export default UsersPage;