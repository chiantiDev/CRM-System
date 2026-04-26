import {FC} from "react";
import {Link, Outlet} from "react-router";
import {Layout, Menu} from "antd";
const { Sider, Content } = Layout;
import type { MenuProps } from 'antd';

const HomePage: FC = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <Link to="/" />,
      label: 'Todos',
    },
    {
      key: '2',
      icon: <Link to="profilepage" />,
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