import React from 'react';
import { Typography, Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>儀表板</Title>
      <Paragraph>
        歡迎使用 LiteAPS 排程系統。此頁面僅供展示，請前往「排程模擬」進行操作。
      </Paragraph>
      
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="本月工單"
              value={1128}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="筆"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="機台稼動率"
              value={93}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="準時交貨率"
              value={98.5}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
