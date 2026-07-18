import React, {useEffect} from "react";
import {Link, Outlet, useLocation} from "react-router";
import {Layout, Menu, type MenuProps} from "antd";
const { Sider, Content } = Layout;
import {ScheduleOutlined, UserOutlined, ProfileOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {getProfileUser} from "@/store/profile/Slices/profileSlice";
import {selectProfileRequest} from "@/Modules/profile/profileSelectors.ts";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfileUser())
  }, [dispatch]);

  const { data: userData } = useAppSelector(selectProfileRequest);
  const isAdminOrModer = userData?.roles.some((role) => ['ADMIN', 'MODERATOR'].includes(role)) ?? false;

  type MenuItem = Required<MenuProps>['items'][number];
  const menuItems: MenuItem[] = [
    {
      key: '/todo',
      icon: <ScheduleOutlined />,
      label: <Link to="/todo">Список задач</Link>,
    },
    {
      key: '/profile',
      icon: <ProfileOutlined />,
      label: <Link to="/profile">Личный кабинет</Link>,
    },
    isAdminOrModer ?
    {
      key: '/users',
      icon: <UserOutlined />,
      label: <Link to="/users">Пользователи</Link>,
    } : null,
  ];

  return (
    userData &&
    <Layout>
      <Sider theme="light" collapsible>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
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