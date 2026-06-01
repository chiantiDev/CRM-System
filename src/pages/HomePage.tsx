import React, {useEffect} from "react";
import {Link, Outlet, useLocation} from "react-router";
import {Layout, Menu, type MenuProps} from "antd";
const { Sider, Content } = Layout;
import {ScheduleOutlined, UserOutlined, ProfileOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import {getProfileUser} from "../store/profile/Slices/profileSlice.ts";
import {selectProfileRequest} from "../Modules/profile/selectors.ts";

const HomePage: React.FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const location = useLocation();
  const currentKey = location.pathname.split('/').pop() || 'todo';

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfileUser())
  }, [dispatch]);
  const { data: userData } = useAppSelector(selectProfileRequest);
  const isAdminOrModer = userData?.roles.find((role) => role.toLowerCase() === 'admin' || role === 'moderator' )

  const menuItems: MenuItem[] = [
    {
      key: 'todo',
      icon: <ScheduleOutlined />,
      label: <Link to="todo">Список задач</Link>,
    },
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: <Link to="profile">Личный кабинет</Link>,
    },
    isAdminOrModer ?
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="users">Пользователи</Link>,
    } : null,
  ];

  return (
    <Layout>
      <Sider theme="light" collapsible>
        <Menu
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomePage