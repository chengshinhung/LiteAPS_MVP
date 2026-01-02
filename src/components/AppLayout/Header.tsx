import React from 'react';
import { Layout, Typography, theme } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
      <Title level={4} style={{ margin: 0 }}>LiteAPS 排程模組 PoC</Title>
    </AntHeader>
  );
};

export default Header;
