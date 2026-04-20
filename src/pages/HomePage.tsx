import * as React from "react";
import {FC} from "react";
import {Link, Outlet} from "react-router";
import {Layout, Flex, Menu} from "antd";
const { Sider, Content } = Layout;
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const HomePage: FC = () => {
  const boxStyleLayout: React.CSSProperties = {
    backgroundColor: 'var(--color-background-400)',
  }

  const boxStyleSider: React.CSSProperties = {
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-background-200)',
    boxShadow: '0 0 5px 0 var(--color-shodow)',
  }

  const boxStyleMenu: React.CSSProperties = {
    backgroundColor: 'inherit',
    fontSize: '26px',
    textAlign: 'left',
  }

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
    <>
      <Layout style={boxStyleLayout}>
        <Sider style={boxStyleSider}>
          <Menu style={boxStyleMenu}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems} />
        </Sider>
        <Content>
          <Flex style={{height: "100vh"}}
                justify={'center'}
                align={'center'}
          >
            <Outlet/>
          </Flex>
        </Content>
      </Layout>
    </>
  )
}

export default HomePage