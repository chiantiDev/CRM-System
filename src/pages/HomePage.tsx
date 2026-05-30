import React from "react";
import {Link, Outlet, useLocation} from "react-router";
import {Layout, Menu, type MenuProps} from "antd";
const { Sider, Content } = Layout;
import {ScheduleOutlined, UserOutlined, ProfileOutlined} from "@ant-design/icons";

const HomePage: React.FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const location = useLocation();
  const currentKey = location.pathname.split('/').pop() || 'todo';

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
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="users">Пользователи</Link>,
    },
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