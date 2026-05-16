import {FC} from "react";
import {Link, Outlet} from "react-router";
import {Layout, Menu, type MenuProps} from "antd";
const { Sider, Content } = Layout;

const HomePage: FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <Link to="todo" />,
      label: 'Todos',
    },
    {
      key: '2',
      icon: <Link to="profile" />,
      label: 'Profile',
    },
  ];

  return (
      <Layout>
        <Sider theme="light">
          <Menu mode="inline"
                defaultSelectedKeys={['1']}
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