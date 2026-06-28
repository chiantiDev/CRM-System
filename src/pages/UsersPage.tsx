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
  Tooltip,
  Input,
  Modal,
  Select,
  Radio,
} from "antd";
import {UserOutlined, UserDeleteOutlined, StopOutlined, CheckCircleOutlined, EditOutlined} from "@ant-design/icons";
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

  const isAdmin = userData?.roles.some((role) => role.toLowerCase() === 'admin') ?? false;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortParams, setSortParams] = useState<{ field?: string; order?: 'asc' | 'desc' }>({});
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isBlocked, setIsBlocked] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    phoneNumber: user.phoneNumber || 'Не указан',
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

  const [messageApi, holder] = message.useMessage();
  const deleteUserConfirm = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      messageApi.success('Пользователь удален');
    } catch (error) {
      messageApi.error('Ошибка запроса удаления пользователя');
    }
  };

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
      <Tooltip
        placement={"bottomLeft"}
        title="Поиск по имени или email">
        <Input
          prefix={<UserOutlined/>}
          placeholder="Найти пользователя"
          size="large"
          allowClear
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </Tooltip>

      <Table<User>
        scroll={{y: 'calc(100vh - 160px)'}}
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
          render={(text) => highlightedText(text, debouncedSearch)}/>

        <Table.Column<User>
          title="Email пользователя"
          dataIndex="email"
          key="email"
          sorter={true}
          render={(text) => highlightedText(text, debouncedSearch)}
        />

        <Table.Column<User>
          title="Дата регистрации"
          dataIndex="date"
          key="date"
          render={(text: string) => {
            if (!text) return '-';
            return new Date(text).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
          }}
        />

        <Table.Column<User>
          title="Статус блокировки"
          dataIndex="isBlocked"
          key="isBlocked"
          filterIcon={isAdmin ? undefined : () => null}
          filterDropdown={({setSelectedKeys, selectedKeys}) => (
            <div style={{padding: 12}}>
              <Radio.Group
                value={selectedKeys[0] || 'all'}
                onChange={(e) => {
                  setSelectedKeys([e.target.value]);
                  e.target.value === 'all' ? setIsBlocked(undefined) : e.target.value === 'blocked' ? setIsBlocked(true) : setIsBlocked(false);
                  setCurrentPage(0)
                }}
                style={{display: 'flex', flexDirection: 'column', gap: '8px'}}
              >
                <Radio value="all">Все пользователи</Radio>
                <Radio value="blocked">Только заблокированные пользователи</Radio>
                <Radio value="active">Только активные пользователи</Radio>
              </Radio.Group>
            </div>
          )}
          render={(status: boolean) => {
            const statusText = status ? 'blocked' : 'active';
            const color = status ? 'red' : 'green';
            return <Tag color={color}>{statusText.toUpperCase()}</Tag>;
          }}
        />

        <Table.Column<User>
          title="Роли"
          dataIndex="roles"
          key="roles"
          render={(roles: string[]) => (
            <Flex gap="small" align="center" wrap>
              {roles.map((role) => {
                const ROLE_COLORS: Record<Roles, string> = {
                  USER: 'cyan',
                  ADMIN: 'gold',
                  MODERATOR: 'purple',
                };
                return (
                  <Tag color={ROLE_COLORS[role as Roles] || 'default'} key={role}>
                    {role.toUpperCase()}
                  </Tag>
                );
              })}
            </Flex>
          )}
        />

        <Table.Column<User>
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"/>

        <Table.Column<User>
          title="Действия"
          key="actions"
          render={(_, record) => (
            <Space>
              <Link to={`/user/${record.id}`}>
                <Tooltip title="Профиль">
                  <Avatar style={{backgroundColor: '#7f265c'}} icon={<UserOutlined/>}/>
                </Tooltip>
              </Link>
              {isAdmin &&
                  <Popconfirm
                      title="Удалить?"
                      description="Подтвердите действие"
                      onConfirm={() => deleteUserConfirm(record.id)}
                      okText="Подтвердить"
                      cancelText="Отменить"
                  >
                      <Tooltip title="Удалить">
                          <Button
                              style={{
                                width: '32px',
                                height: '30px',
                                padding: '0',
                                border: 'none',
                                borderRadius: '50%'
                              }}>
                              <Avatar style={{backgroundColor: '#e4464e'}} icon={<UserDeleteOutlined/>}/>
                          </Button>
                      </Tooltip>
                  </Popconfirm>
              }
              {isAdmin &&
                  <>
                      <Tooltip title="Изменить роли">
                          <Button onClick={() => {
                            setIsModalOpen(true)
                            setCurrentRoles(record.roles)
                          }}
                                  style={{
                                    width: '32px',
                                    height: '30px',
                                    padding: '0',
                                    border: 'none',
                                    borderRadius: '50%'
                                  }}>
                              <Avatar style={{backgroundColor: '#7f265c'}} icon={<EditOutlined/>}/>
                          </Button>
                      </Tooltip>
                      <Modal
                          title="Добавьте или удалите роли и подтвердите действие"
                          open={isModalOpen}
                          onOk={() => editRolesConfirm(record.id, {roles: currentRoles})}
                          onCancel={() => setIsModalOpen(false)}
                          okButtonProps={{disabled: currentRoles.length === 0}}
                      >
                          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                              <Select
                                  mode="multiple"
                                  allowClear
                                  style={{width: '100%'}}
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
                          </div>
                      </Modal>
                  </>
              }
              {!record.isBlocked ?
                <Popconfirm
                  title="Заблокировать?"
                  description="Подтвердите действие"
                  onConfirm={() => blockedUserConfirm(record.id)}
                  okText="Подтвердить"
                  cancelText="Отменить"
                >
                  <Tooltip title="Заблокировать">
                    <Button
                      style={{width: '32px', height: '30px', padding: '0', border: 'none', borderRadius: '50%'}}>
                      <Avatar style={{backgroundColor: '#e4464e'}} icon={<StopOutlined/>}/>
                    </Button>
                  </Tooltip>
                </Popconfirm> :
                isAdmin &&
                  <Popconfirm
                      title="Разблокировать?"
                      description="Подтвердите действие"
                      onConfirm={() => unblockedUserConfirm(record.id)}
                      okText="Подтвердить"
                      cancelText="Отменить"
                  >
                      <Tooltip title="Разблокировать">
                          <Button
                              style={{
                                width: '32px',
                                height: '30px',
                                padding: '0',
                                border: 'none',
                                borderRadius: '50%'
                              }}>
                              <Avatar style={{backgroundColor: '#6eae54'}} icon={<CheckCircleOutlined/>}/>
                          </Button>
                      </Tooltip>
                  </Popconfirm>
              }
            </Space>
          )}
        />
      </Table>
    </>
  )
}
export default UsersPage;