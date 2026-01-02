import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../../config/navigation';
import Logo from '../../assets/logo.svg';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = MENU_ITEMS.find(item => location.pathname.startsWith(item.path))?.key || 'simulation';

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsedWidth={80}
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #f0f0f0',
        zIndex: 10,
      }}
    >
      <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={Logo} alt="LiteAPS" style={{ height: 32 }} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[activeKey]}
        items={MENU_ITEMS.map(item => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          disabled: item.disabled,
          onClick: () => !item.disabled && navigate(item.path),
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
