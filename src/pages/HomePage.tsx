import React from "react";
import {Link, Outlet, useLocation} from "react-router";
import {Layout, Menu, type MenuProps} from "antd";
import {UnorderedListOutlined, UserOutlined} from "@ant-design/icons";

const { Sider, Content } = Layout;

const HomePage: React.FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const location = useLocation();
  const currentKey = location.pathname.split('/').pop() || 'todo';

  const menuItems: MenuItem[] = [
    {
      key: 'todo',
      icon: <UnorderedListOutlined />,
      label: <Link to="todo">Список задач</Link>,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="profile">Личный кабинет</Link>,
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