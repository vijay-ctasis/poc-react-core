import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, Router } from 'react-router-dom'
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  ToolOutlined,
  OneToOneOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import Reports from './pages/reports';
import { Button, Layout, Menu } from 'antd';
import Dashboard from './pages/dashboard';
import FundTools from './pages/fundTools';
import Resources from './pages/resources';
import PriceUpload from './pages/priceUpload';
import ToDoList from './pages/toDoList';
import style from './common/style';
import Login from './pages/login';

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Reports', 'sub1', <DesktopOutlined />, [
    getItem('Reports', 'sub2', <Link to="/reports" />),
    getItem('Price Upload', 'sub3', <Link to="/priceupload" />),
  ]),

];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* <div className="logo" ><h3>POC</h3></div> */}
          <div className="logo">
            <PauseOutlined style={{ color: "black", fontSize: style.fontSize, marginTop: "18px" }} />
            <PauseOutlined style={{ color: "black", fontSize: style.fontSize, marginLeft: '-19px' }} />
            {/* <img src="/download.png"  /> */}
            {/* <span className='logoTitle'>
              TEST
            </span> */}
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Dashboard</span>
              <Link to="/" />
            </Menu.Item>
            <Menu
              theme="dark"
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              items={items}
              key="2"
            />
            <Menu.Item key="3">
              <ToolOutlined />
              <span>Fund Tools</span>
              <Link to="/fund-tools" />
            </Menu.Item>
            <Menu.Item key="4">
              <OneToOneOutlined />
              <span>Resources</span>
              <Link to="/resources" />
            </Menu.Item>.

          </Menu>

        </Sider>
        <Layout className="site-layout">

          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              fontSize: '25px',
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            Sample
            <Link to="/login">
              <Button type="primary" style={{ float: "right", margin: "12px" }} icon={<UserOutlined />} size='large'>
                Login
              </Button>
            </Link>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 700 }}>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/fund-tools" element={<FundTools />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/priceupload" element={<PriceUpload />} />
              <Route path="/todolist" element={<ToDoList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
